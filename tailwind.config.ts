import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        neon: {
          green: "hsl(var(--neon-green))",
          glow: "hsl(var(--neon-green-glow))",
        },
        teal: "hsl(var(--teal))",
        "soft-blue": "hsl(var(--soft-blue))",
        charcoal: {
          DEFAULT: "hsl(var(--charcoal))",
          light: "hsl(var(--charcoal-light))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-enhanced": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-8px) rotate(2deg)" },
          "50%": { transform: "translateY(-15px) rotate(0deg)" },
          "75%": { transform: "translateY(-8px) rotate(-2deg)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.15" },
          "50%": { transform: "scale(1.4)", opacity: "0.35" },
        },
        "breathe-slow": {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.1" },
          "50%": { transform: "scale(1.3) rotate(10deg)", opacity: "0.25" },
        },
        "color-shift": {
          "0%, 100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(30deg)" },
        },
        "curve-draw": {
          from: { strokeDashoffset: "600" },
          to: { strokeDashoffset: "0" },
        },
        "curve-wave": {
          "0%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "50%": { opacity: "0.5", transform: "translateY(-2px)" },
        },
        "stat-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        "number-glow": {
          "0%": { textShadow: "0 0 0 transparent" },
          "50%": { textShadow: "0 0 20px hsl(142 76% 50% / 0.5)" },
          "100%": { textShadow: "0 0 0 transparent" },
        },
        "icon-breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
        },
        "icon-3d-float": {
          "0%, 100%": { 
            transform: "perspective(500px) translateZ(0) translateY(0) rotateX(0deg)",
          },
          "50%": { 
            transform: "perspective(500px) translateZ(8px) translateY(-2px) rotateX(4deg)",
          },
        },
        "icon-3d-pulse": {
          "0%, 100%": { 
            transform: "perspective(400px) scale(1) rotateY(0deg)",
          },
          "50%": { 
            transform: "perspective(400px) scale(1.08) rotateY(6deg)",
          },
        },
        "achievement-unlock": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "achievement-glow-pulse": {
          "0%": { boxShadow: "0 0 0 0 transparent" },
          "50%": { boxShadow: "0 0 12px 2px var(--glow-color, hsl(var(--primary) / 0.15))" },
          "100%": { boxShadow: "0 0 6px 1px var(--glow-color, hsl(var(--primary) / 0.1))" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(20px) rotate(180deg)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "float-enhanced": "float-enhanced 4s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "breathe-slow": "breathe-slow 6s ease-in-out infinite",
        "color-shift": "color-shift 4s ease-in-out infinite",
        "curve-draw": "curve-draw 2s ease-out forwards",
        "curve-wave": "curve-wave 8s ease-in-out infinite",
        "stat-pulse": "stat-pulse 3s ease-in-out infinite",
        "number-glow": "number-glow 1s ease-out",
        "icon-breathe": "icon-breathe 3s ease-in-out infinite",
        "icon-3d-float": "icon-3d-float 4s ease-in-out infinite",
        "icon-3d-pulse": "icon-3d-pulse 2s ease-in-out infinite",
        "achievement-unlock": "achievement-unlock 0.4s ease-out forwards",
        "achievement-glow": "achievement-glow-pulse 1s ease-out forwards",
        "confetti": "confetti-fall 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
