---
allowed-tools: Bash(gh issue view:*), Bash(gh search:*), Bash(gh issue list:*), Bash(gh pr comment:*), Bash(gh pr diff:*), Bash(gh pr view:*), Bash(gh pr list:*), Bash(gh api:*), Bash(git log:*), Bash(git blame:*), Bash(git diff:*), Bash(git rev-parse:*)
description: Review a PR against DF-Frontend project conventions, security, performance, and UI patterns
---

Review a pull request against DF-Frontend project-specific conventions and patterns. The PR number or URL is provided in `$ARGUMENTS`.

Follow these steps precisely:

1. **Eligibility Check** — Use a Haiku agent to check if the pull request (a) is closed, (b) is a draft, (c) does not need a code review (e.g., automated PR, trivial change), or (d) already has a code review comment from you (look for "Code review (DF-Frontend)" in existing comments). If any of these are true, stop and explain why.

2. **Gather Context** — Use a Haiku agent to:
   a. Find the root `CLAUDE.md` file and any `CLAUDE.md` files in directories modified by the PR.
   b. Read the relevant CLAUDE.md files and return a summary of project conventions.
   c. Get the list of modified files from the PR diff.

3. **PR Summary** — Use a Haiku agent to view the pull request details and return:
   a. A 2-3 sentence summary of the change.
   b. The list of modified files grouped by category (pages, components, services, hooks, types, config).

4. **Parallel Review** — Launch 5 parallel Sonnet agents to independently review the PR. Provide each agent with the PR diff, PR summary, and CLAUDE.md context. Each agent should return a list of issues with the category, description, file, and line number.

   **Agent 1 — Project Patterns:**
   Check the PR diff for adherence to DF-Frontend architectural patterns:
   - Query key factory pattern: new data-fetching hooks must define a `keys` object following the pattern in `src/hooks/useAccounts.ts` (all, lists, list with filters, details, detail by id).
   - Service layer: API calls must go through domain services in `src/services/` that import `apiClient` from `api.ts`. No direct `fetch()` or `axios` calls in components or hooks.
   - Lazy loading: new route-level pages must use `React.lazy()` — check `src/App.tsx` for the pattern.
   - Auth hook cascade: components needing auth should use `useAuth()`, `useRequireAuth()`, or `useRequireRole()` from `src/hooks/useAuth.ts`. Direct access to `AuthContext` is discouraged outside those hooks.
   - Protected routes: new dashboard routes must be wrapped in `ProtectedRoute`, admin routes must use `RoleGuard`.
   - Admin tabs: new admin tab components should live in `src/components/admin/tabs/` and use `AdminDataTable<T>` for table rendering.
   - Environment variables: new env vars must use `VITE_` prefix and be typed in `src/config/env.ts`.

   **Agent 2 — Security:**
   Audit the PR diff for security issues specific to this project:
   - Access tokens must NEVER be stored in localStorage or sessionStorage — only in memory via `useRef`. Only the refresh token goes in localStorage.
   - No hardcoded secrets, API keys, or tokens in client code.
   - User input rendered in JSX must not use `dangerouslySetInnerHTML` without sanitization.
   - New protected pages must use `ProtectedRoute` or `RoleGuard` — no unguarded routes to sensitive data.
   - API errors should be caught and normalized using `ApiError` from `src/services/api.ts`.
   - Check that `setTokenAccessor()` bridge is not bypassed — components should never read tokens directly.

   **Agent 3 — Performance:**
   Check the PR diff for performance issues:
   - New page-level components in `src/pages/` must be lazy-loaded in `src/App.tsx`.
   - TanStack Query hooks should use the project's default config (5min stale time, 1 retry). Custom overrides need justification.
   - No `useEffect` with missing or overly broad dependency arrays that could cause infinite re-renders.
   - Components should not subscribe to context values they don't use (e.g., importing full `AuthContext` when only `user` is needed).
   - Check that `useScrollReveal` usage respects `prefers-reduced-motion`.
   - Performance flags in `src/lib/perfFlags.ts`: new expensive visual effects should check the relevant flag (`noHeroVideo`, `noAtmosphere`, `noBlur`).
   - Avoid importing large libraries at the top level when they could be dynamically imported.

   **Agent 4 — UI Conventions:**
   Check the PR diff for UI convention compliance:
   - Components should use shadcn/ui (Radix primitives) — not raw HTML selects, dialogs, etc. New components added via `npx shadcn@latest add <component>`.
   - Toasts must use `sonner` (from `src/components/ui/sonner.tsx`), NOT the legacy `use-toast.ts` hook.
   - Forms must use `react-hook-form` with shadcn's `<Form>` wrapper from `src/components/ui/form.tsx`.
   - Tailwind custom tokens: use `gold`, `stone`, `charcoal` for brand colors, not arbitrary hex values.
   - Dark mode: use the `class` strategy via `next-themes`. Don't use `@media (prefers-color-scheme)` directly.
   - Glass morphism: use `.glass`, `.glass-card`, `.glass-card-strong` classes from `index.css`. Don't reinvent `backdrop-filter` styles inline.
   - Custom animations: reuse `glow-pulse`, `float`, `shimmer`, `achievement-unlock`, `confetti` from Tailwind config before creating new ones.
   - Path alias: imports should use `@/` prefix (maps to `src/`), not relative `../../../` paths.

   **Agent 5 — General Bugs:**
   Standard code review for bugs in the PR diff:
   - Logic errors, off-by-one errors, null/undefined access without checks.
   - Missing error handling at system boundaries (user input, API responses).
   - Broken or missing imports.
   - TypeScript type mismatches or unsafe `any` usage.
   - Race conditions in async operations.
   - Memory leaks (e.g., missing cleanup in useEffect).
   - Incorrect React key usage in lists.
   - Focus on high-impact bugs. Ignore nitpicks, style issues, and things a linter/typechecker would catch.

5. **Confidence Scoring** — For each issue found in step 4, launch a parallel Haiku agent to score the issue on a scale of 0-100. Give the agent the PR diff, the issue description, and the relevant CLAUDE.md files. Use this rubric (provide verbatim to the agent):
   a. 0: Not confident at all. This is a false positive that doesn't stand up to light scrutiny, or is a pre-existing issue.
   b. 25: Somewhat confident. This might be a real issue, but may also be a false positive. The agent wasn't able to verify that it's a real issue.
   c. 50: Moderately confident. The agent was able to verify this is a real issue, but it might be a nitpick or not happen very often in practice.
   d. 75: Highly confident. The agent double checked the issue, and verified that it is very likely a real issue that will be hit in practice. The existing approach in the PR is insufficient.
   e. 100: Absolutely certain. The agent double checked the issue, and confirmed that it is definitely a real issue that will happen frequently in practice.

   Examples of false positives to watch for:
   - Pre-existing issues not introduced by this PR
   - Something that looks like a bug but is not
   - Pedantic nitpicks a senior engineer wouldn't flag
   - Issues a linter, typechecker, or compiler would catch (missing imports, type errors, formatting)
   - General code quality issues unless explicitly required in CLAUDE.md
   - Issues explicitly silenced in code (lint ignore comments)
   - Changes in functionality that are likely intentional
   - Real issues on lines the PR author did not modify

6. **Filter** — Remove any issues with a confidence score below 80. If no issues remain, skip to posting the "no issues" comment.

7. **Re-check Eligibility** — Use a Haiku agent to repeat step 1, confirming the PR is still eligible for review.

8. **Post Comment** — Use `gh pr comment` to post the review on the PR. Format:

---

If issues were found:

```
### Code review (DF-Frontend)

Found N issue(s):

**[Category]**

1. <brief description> (convention: "<relevant CLAUDE.md rule or pattern>")

<link to file and line with full SHA and line range>

2. ...

---

**[Category]**

3. ...

🤖 Generated with [Claude Code](https://claude.ai/code)

<sub>- If this review was useful, react with 👍. Otherwise, react with 👎.</sub>
```

If no issues:

```
### Code review (DF-Frontend)

No issues found. Checked for project pattern adherence, security, performance, UI conventions, and bugs.

🤖 Generated with [Claude Code](https://claude.ai/code)
```

---

Important notes:

- Categories for grouping issues: `Project Pattern`, `Security`, `Performance`, `UI Convention`, `Bug`
- When linking to code, use the full SHA format: `https://github.com/OWNER/REPO/blob/FULL_SHA/path/to/file.ts#L10-L15`
  - Get the full SHA with `git rev-parse HEAD` — do NOT use `$(...)` in the comment body since it renders as raw Markdown
  - Provide at least 1 line of context before and after the issue line
  - The repo name must match the repo being reviewed
- Use `gh` for all GitHub interactions, not web fetch
- Do not attempt to build, lint, or typecheck — those run separately in CI
- Make a todo list first before starting the review steps
