// Mock data for Admin Dashboard

// Helper to generate dynamic dates relative to today
const now = new Date();
const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:00`;
};
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const daysAgo = (days: number, hours = 0, minutes = 0): string => {
  const date = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  date.setHours(hours, minutes, 0, 0);
  return formatDateTime(date);
};
const daysAgoDate = (days: number): string => {
  const date = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return formatDate(date);
};

export type AccountStatus = "Evaluation" | "Funded" | "Paused" | "Failed";
export type PlanType = "Standard" | "Advanced" | "Dynasty";
export type KYCStatus = "Not Started" | "In Progress" | "Verified" | "Failed";
export type TaxFormStatus = "Missing" | "Submitted" | "Approved";
export type PayoutStatus =
  | "Pending"
  | "Approved"
  | "Paid"
  | "Rejected"
  | "Held";
export type ViolationType =
  | "Daily Loss"
  | "Drawdown"
  | "Consistency Rule"
  | "Prohibited Trading"
  | "Weekend Holding";
export type FlagType =
  | "Copy Trade Suspicion"
  | "Correlation Spike"
  | "Size Anomaly"
  | "Overtrading"
  | "Rapid Behavior Change";
export type Severity = "Info" | "Warning" | "Critical";
export type AlertType =
  | "Payout Requested"
  | "Rule Violation"
  | "Near Limit Warning"
  | "KYC Incomplete"
  | "Payment Failed"
  | "Webhook Error";

export interface MockAccount {
  id: string;
  userId: string;
  userName: string;
  email: string;
  plan: PlanType;
  status: AccountStatus;
  equity: number;
  startingBalance: number;
  drawdownUsed: number;
  dailyLossUsed: number;
  tradesToday: number;
  totalTrades: number;
  lastTradeTime: string;
  flagsCount: number;
  createdAt: string;
  closedPnL: number;
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  country: string;
  createdAt: string;
  kycStatus: KYCStatus;
  taxFormStatus: TaxFormStatus;
  accountsCount: number;
  lastActive: string;
  phone?: string;
  address?: string;
}

export interface MockPayout {
  id: string;
  userId: string;
  userName: string;
  accountId: string;
  plan: PlanType;
  amount: number;
  method: "ACH" | "Wire" | "Wise" | "Crypto";
  requestedDate: string;
  status: PayoutStatus;
  eligibilityStatus: "Eligible" | "Not Eligible" | "Needs Review";
  riskScore: number;
  lastTradeDate: string;
  flagsCount: number;
  processedDate?: string;
  referenceId?: string;
}

export interface MockViolation {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  accountId: string;
  type: ViolationType;
  severity: Severity;
  status: "Open" | "Reviewed" | "Resolved";
  assignedTo?: string;
  notesCount: number;
  description: string;
}

export interface MockPatternFlag {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  accountId: string;
  type: FlagType;
  severity: Severity;
  confidence: "Low" | "Medium" | "High";
  status: "Open" | "Reviewed" | "Resolved";
  description: string;
}

export interface MockAlert {
  id: string;
  timestamp: string;
  type: AlertType;
  severity: Severity;
  message: string;
  targetType: "User" | "Account" | "Payout" | "System";
  targetId: string;
}

export interface MockTrade {
  id: string;
  accountId: string;
  timestamp: string;
  symbol: string;
  side: "Long" | "Short";
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  duration: string;
}

export interface MockSubscription {
  id: string;
  userId: string;
  userName: string;
  email: string;
  plan: PlanType;
  status: "Active" | "Canceled" | "Past Due";
  startDate: string;
  renewalDate: string;
  lastPaymentStatus: "Paid" | "Failed" | "Pending";
  amount: number;
}

export interface MockTransaction {
  id: string;
  date: string;
  userId: string;
  userName: string;
  amount: number;
  type: "Subscription" | "Reset" | "Fee" | "Refund";
  status: "Paid" | "Failed" | "Refunded" | "Chargeback";
  referenceId: string;
}

export interface MockAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actionType: string;
  targetType: "User" | "Account" | "Payout" | "Ticket" | "System";
  targetId: string;
  summary: string;
  severity: Severity;
  source: "UI" | "API" | "Automation";
  beforeState?: Record<string, unknown>;
  afterState?: Record<string, unknown>;
}

export interface MockNote {
  id: string;
  author: string;
  timestamp: string;
  content: string;
}

// Generate mock accounts with dynamic dates
export const mockAccounts: MockAccount[] = [
  {
    id: "ACC-001",
    userId: "USR-001",
    userName: "John Smith",
    email: "john.smith@email.com",
    plan: "Dynasty",
    status: "Funded",
    equity: 152340,
    startingBalance: 150000,
    drawdownUsed: 42,
    dailyLossUsed: 28,
    tradesToday: 5,
    totalTrades: 234,
    lastTradeTime: daysAgo(0, 14, 32),
    flagsCount: 0,
    createdAt: daysAgoDate(90),
    closedPnL: 12340,
  },
  {
    id: "ACC-002",
    userId: "USR-002",
    userName: "Sarah Johnson",
    email: "sarah.j@email.com",
    plan: "Advanced",
    status: "Evaluation",
    equity: 51200,
    startingBalance: 50000,
    drawdownUsed: 85,
    dailyLossUsed: 12,
    tradesToday: 3,
    totalTrades: 45,
    lastTradeTime: daysAgo(0, 13, 45),
    flagsCount: 2,
    createdAt: daysAgoDate(14),
    closedPnL: 1200,
  },
  {
    id: "ACC-003",
    userId: "USR-003",
    userName: "Michael Chen",
    email: "mchen@email.com",
    plan: "Standard",
    status: "Funded",
    equity: 24800,
    startingBalance: 25000,
    drawdownUsed: 65,
    dailyLossUsed: 88,
    tradesToday: 8,
    totalTrades: 189,
    lastTradeTime: daysAgo(0, 15, 2),
    flagsCount: 1,
    createdAt: daysAgoDate(60),
    closedPnL: -200,
  },
  {
    id: "ACC-004",
    userId: "USR-004",
    userName: "Emily Davis",
    email: "emily.d@email.com",
    plan: "Dynasty",
    status: "Paused",
    equity: 148500,
    startingBalance: 150000,
    drawdownUsed: 78,
    dailyLossUsed: 45,
    tradesToday: 0,
    totalTrades: 312,
    lastTradeTime: daysAgo(5, 9, 15),
    flagsCount: 3,
    createdAt: daysAgoDate(150),
    closedPnL: -1500,
  },
  {
    id: "ACC-005",
    userId: "USR-005",
    userName: "James Wilson",
    email: "jwilson@email.com",
    plan: "Advanced",
    status: "Failed",
    equity: 45200,
    startingBalance: 50000,
    drawdownUsed: 100,
    dailyLossUsed: 100,
    tradesToday: 0,
    totalTrades: 67,
    lastTradeTime: daysAgo(7, 16, 30),
    flagsCount: 5,
    createdAt: daysAgoDate(45),
    closedPnL: -4800,
  },
  {
    id: "ACC-006",
    userId: "USR-006",
    userName: "Lisa Anderson",
    email: "lisa.a@email.com",
    plan: "Standard",
    status: "Evaluation",
    equity: 26500,
    startingBalance: 25000,
    drawdownUsed: 15,
    dailyLossUsed: 8,
    tradesToday: 2,
    totalTrades: 28,
    lastTradeTime: daysAgo(0, 11, 20),
    flagsCount: 0,
    createdAt: daysAgoDate(5),
    closedPnL: 1500,
  },
  {
    id: "ACC-007",
    userId: "USR-007",
    userName: "Robert Brown",
    email: "rbrown@email.com",
    plan: "Dynasty",
    status: "Funded",
    equity: 165000,
    startingBalance: 150000,
    drawdownUsed: 22,
    dailyLossUsed: 15,
    tradesToday: 4,
    totalTrades: 456,
    lastTradeTime: daysAgo(0, 14, 50),
    flagsCount: 0,
    createdAt: daysAgoDate(180),
    closedPnL: 15000,
  },
  {
    id: "ACC-008",
    userId: "USR-008",
    userName: "Amanda Martinez",
    email: "amanda.m@email.com",
    plan: "Advanced",
    status: "Funded",
    equity: 58900,
    startingBalance: 50000,
    drawdownUsed: 35,
    dailyLossUsed: 22,
    tradesToday: 6,
    totalTrades: 178,
    lastTradeTime: daysAgo(1, 15, 10),
    flagsCount: 1,
    createdAt: daysAgoDate(100),
    closedPnL: 8900,
  },
  {
    id: "ACC-009",
    userId: "USR-009",
    userName: "David Lee",
    email: "dlee@email.com",
    plan: "Standard",
    status: "Evaluation",
    equity: 24200,
    startingBalance: 25000,
    drawdownUsed: 92,
    dailyLossUsed: 78,
    tradesToday: 12,
    totalTrades: 89,
    lastTradeTime: daysAgo(0, 14, 55),
    flagsCount: 4,
    createdAt: daysAgoDate(25),
    closedPnL: -800,
  },
  {
    id: "ACC-010",
    userId: "USR-010",
    userName: "Jennifer Taylor",
    email: "jtaylor@email.com",
    plan: "Dynasty",
    status: "Funded",
    equity: 172500,
    startingBalance: 150000,
    drawdownUsed: 18,
    dailyLossUsed: 10,
    tradesToday: 3,
    totalTrades: 567,
    lastTradeTime: daysAgo(0, 12, 30),
    flagsCount: 0,
    createdAt: daysAgoDate(240),
    closedPnL: 22500,
  },
  {
    id: "ACC-011",
    userId: "USR-011",
    userName: "Chris Thompson",
    email: "cthompson@email.com",
    plan: "Advanced",
    status: "Paused",
    equity: 47800,
    startingBalance: 50000,
    drawdownUsed: 82,
    dailyLossUsed: 95,
    tradesToday: 0,
    totalTrades: 145,
    lastTradeTime: daysAgo(3, 10, 45),
    flagsCount: 2,
    createdAt: daysAgoDate(75),
    closedPnL: -2200,
  },
  {
    id: "ACC-012",
    userId: "USR-012",
    userName: "Michelle Garcia",
    email: "mgarcia@email.com",
    plan: "Standard",
    status: "Funded",
    equity: 28900,
    startingBalance: 25000,
    drawdownUsed: 28,
    dailyLossUsed: 18,
    tradesToday: 4,
    totalTrades: 234,
    lastTradeTime: daysAgo(0, 13, 15),
    flagsCount: 0,
    createdAt: daysAgoDate(150),
    closedPnL: 3900,
  },
  {
    id: "ACC-013",
    userId: "USR-013",
    userName: "Kevin White",
    email: "kwhite@email.com",
    plan: "Dynasty",
    status: "Evaluation",
    equity: 153200,
    startingBalance: 150000,
    drawdownUsed: 12,
    dailyLossUsed: 5,
    tradesToday: 2,
    totalTrades: 34,
    lastTradeTime: daysAgo(0, 10, 20),
    flagsCount: 0,
    createdAt: daysAgoDate(10),
    closedPnL: 3200,
  },
  {
    id: "ACC-014",
    userId: "USR-014",
    userName: "Rachel Moore",
    email: "rmoore@email.com",
    plan: "Advanced",
    status: "Failed",
    equity: 44500,
    startingBalance: 50000,
    drawdownUsed: 100,
    dailyLossUsed: 55,
    tradesToday: 0,
    totalTrades: 112,
    lastTradeTime: daysAgo(10, 14, 30),
    flagsCount: 3,
    createdAt: daysAgoDate(60),
    closedPnL: -5500,
  },
  {
    id: "ACC-015",
    userId: "USR-015",
    userName: "Daniel Jackson",
    email: "djackson@email.com",
    plan: "Standard",
    status: "Funded",
    equity: 27200,
    startingBalance: 25000,
    drawdownUsed: 45,
    dailyLossUsed: 32,
    tradesToday: 5,
    totalTrades: 298,
    lastTradeTime: daysAgo(2, 14, 40),
    flagsCount: 1,
    createdAt: daysAgoDate(200),
    closedPnL: 2200,
  },
];

// Generate mock users with dynamic dates
export const mockUsers: MockUser[] = [
  {
    id: "USR-001",
    name: "John Smith",
    email: "john.smith@email.com",
    country: "United States",
    createdAt: daysAgoDate(90),
    kycStatus: "Verified",
    taxFormStatus: "Approved",
    accountsCount: 2,
    lastActive: daysAgo(0, 14, 32),
    phone: "+1 555-0101",
    address: "123 Main St, New York, NY",
  },
  {
    id: "USR-002",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    country: "Canada",
    createdAt: daysAgoDate(14),
    kycStatus: "In Progress",
    taxFormStatus: "Missing",
    accountsCount: 1,
    lastActive: daysAgo(0, 13, 45),
    phone: "+1 555-0102",
  },
  {
    id: "USR-003",
    name: "Michael Chen",
    email: "mchen@email.com",
    country: "United States",
    createdAt: daysAgoDate(60),
    kycStatus: "Verified",
    taxFormStatus: "Submitted",
    accountsCount: 1,
    lastActive: daysAgo(0, 15, 2),
    phone: "+1 555-0103",
  },
  {
    id: "USR-004",
    name: "Emily Davis",
    email: "emily.d@email.com",
    country: "United Kingdom",
    createdAt: daysAgoDate(150),
    kycStatus: "Verified",
    taxFormStatus: "Approved",
    accountsCount: 3,
    lastActive: daysAgo(5, 9, 15),
    phone: "+44 20 1234 5678",
  },
  {
    id: "USR-005",
    name: "James Wilson",
    email: "jwilson@email.com",
    country: "Australia",
    createdAt: daysAgoDate(45),
    kycStatus: "Failed",
    taxFormStatus: "Missing",
    accountsCount: 1,
    lastActive: daysAgo(7, 16, 30),
  },
  {
    id: "USR-006",
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    country: "Germany",
    createdAt: daysAgoDate(5),
    kycStatus: "Not Started",
    taxFormStatus: "Missing",
    accountsCount: 1,
    lastActive: daysAgo(0, 11, 20),
  },
  {
    id: "USR-007",
    name: "Robert Brown",
    email: "rbrown@email.com",
    country: "United States",
    createdAt: daysAgoDate(180),
    kycStatus: "Verified",
    taxFormStatus: "Approved",
    accountsCount: 2,
    lastActive: daysAgo(0, 14, 50),
    phone: "+1 555-0107",
    address: "456 Oak Ave, Los Angeles, CA",
  },
  {
    id: "USR-008",
    name: "Amanda Martinez",
    email: "amanda.m@email.com",
    country: "Spain",
    createdAt: daysAgoDate(100),
    kycStatus: "Verified",
    taxFormStatus: "Approved",
    accountsCount: 1,
    lastActive: daysAgo(1, 15, 10),
  },
  {
    id: "USR-009",
    name: "David Lee",
    email: "dlee@email.com",
    country: "Singapore",
    createdAt: daysAgoDate(25),
    kycStatus: "In Progress",
    taxFormStatus: "Missing",
    accountsCount: 2,
    lastActive: daysAgo(0, 14, 55),
  },
  {
    id: "USR-010",
    name: "Jennifer Taylor",
    email: "jtaylor@email.com",
    country: "United States",
    createdAt: daysAgoDate(240),
    kycStatus: "Verified",
    taxFormStatus: "Approved",
    accountsCount: 4,
    lastActive: daysAgo(0, 12, 30),
    phone: "+1 555-0110",
    address: "789 Pine Rd, Chicago, IL",
  },
];

// Generate mock payouts with dynamic dates
export const mockPayouts: MockPayout[] = [
  {
    id: "PAY-001",
    userId: "USR-001",
    userName: "John Smith",
    accountId: "ACC-001",
    plan: "Dynasty",
    amount: 5000,
    method: "Wire",
    requestedDate: daysAgoDate(1),
    status: "Pending",
    eligibilityStatus: "Eligible",
    riskScore: 15,
    lastTradeDate: daysAgoDate(0),
    flagsCount: 0,
  },
  {
    id: "PAY-002",
    userId: "USR-007",
    userName: "Robert Brown",
    accountId: "ACC-007",
    plan: "Dynasty",
    amount: 8500,
    method: "ACH",
    requestedDate: daysAgoDate(2),
    status: "Pending",
    eligibilityStatus: "Eligible",
    riskScore: 8,
    lastTradeDate: daysAgoDate(0),
    flagsCount: 0,
  },
  {
    id: "PAY-003",
    userId: "USR-008",
    userName: "Amanda Martinez",
    accountId: "ACC-008",
    plan: "Advanced",
    amount: 3200,
    method: "Wise",
    requestedDate: daysAgoDate(3),
    status: "Pending",
    eligibilityStatus: "Needs Review",
    riskScore: 45,
    lastTradeDate: daysAgoDate(0),
    flagsCount: 1,
  },
  {
    id: "PAY-004",
    userId: "USR-010",
    userName: "Jennifer Taylor",
    accountId: "ACC-010",
    plan: "Dynasty",
    amount: 12000,
    method: "Wire",
    requestedDate: daysAgoDate(4),
    status: "Pending",
    eligibilityStatus: "Eligible",
    riskScore: 5,
    lastTradeDate: daysAgoDate(0),
    flagsCount: 0,
  },
  {
    id: "PAY-005",
    userId: "USR-012",
    userName: "Michelle Garcia",
    accountId: "ACC-012",
    plan: "Standard",
    amount: 1500,
    method: "ACH",
    requestedDate: daysAgoDate(5),
    status: "Approved",
    eligibilityStatus: "Eligible",
    riskScore: 12,
    lastTradeDate: daysAgoDate(2),
    flagsCount: 0,
    processedDate: daysAgoDate(1),
  },
  {
    id: "PAY-006",
    userId: "USR-003",
    userName: "Michael Chen",
    accountId: "ACC-003",
    plan: "Standard",
    amount: 800,
    method: "Crypto",
    requestedDate: daysAgoDate(6),
    status: "Held",
    eligibilityStatus: "Not Eligible",
    riskScore: 78,
    lastTradeDate: daysAgoDate(0),
    flagsCount: 2,
  },
  {
    id: "PAY-007",
    userId: "USR-015",
    userName: "Daniel Jackson",
    accountId: "ACC-015",
    plan: "Standard",
    amount: 1800,
    method: "ACH",
    requestedDate: daysAgoDate(7),
    status: "Paid",
    eligibilityStatus: "Eligible",
    riskScore: 10,
    lastTradeDate: daysAgoDate(7),
    flagsCount: 0,
    processedDate: daysAgoDate(5),
    referenceId: "TXN-78234",
  },
  {
    id: "PAY-008",
    userId: "USR-004",
    userName: "Emily Davis",
    accountId: "ACC-004",
    plan: "Dynasty",
    amount: 6000,
    method: "Wire",
    requestedDate: daysAgoDate(10),
    status: "Rejected",
    eligibilityStatus: "Not Eligible",
    riskScore: 85,
    lastTradeDate: daysAgoDate(5),
    flagsCount: 3,
    processedDate: daysAgoDate(8),
  },
];

// Generate mock violations with dynamic dates
export const mockViolations: MockViolation[] = [
  {
    id: "VIO-001",
    timestamp: daysAgo(0, 14, 30),
    userId: "USR-009",
    userName: "David Lee",
    accountId: "ACC-009",
    type: "Daily Loss",
    severity: "Critical",
    status: "Open",
    notesCount: 0,
    description: "Daily loss limit exceeded by 3%",
  },
  {
    id: "VIO-002",
    timestamp: daysAgo(0, 10, 15),
    userId: "USR-002",
    userName: "Sarah Johnson",
    accountId: "ACC-002",
    type: "Drawdown",
    severity: "Warning",
    status: "Open",
    notesCount: 1,
    description: "Approaching Max Loss Limit (85% used)",
  },
  {
    id: "VIO-003",
    timestamp: daysAgo(1, 16, 45),
    userId: "USR-011",
    userName: "Chris Thompson",
    accountId: "ACC-011",
    type: "Consistency Rule",
    severity: "Warning",
    status: "Reviewed",
    assignedTo: "Admin User",
    notesCount: 2,
    description: "Single day profit exceeds 40% of total",
  },
  {
    id: "VIO-004",
    timestamp: daysAgo(1, 9, 20),
    userId: "USR-005",
    userName: "James Wilson",
    accountId: "ACC-005",
    type: "Drawdown",
    severity: "Critical",
    status: "Resolved",
    assignedTo: "Admin User",
    notesCount: 3,
    description: "Max Loss Limit breached - account failed",
  },
  {
    id: "VIO-005",
    timestamp: daysAgo(2, 11, 30),
    userId: "USR-004",
    userName: "Emily Davis",
    accountId: "ACC-004",
    type: "Prohibited Trading",
    severity: "Critical",
    status: "Open",
    notesCount: 1,
    description: "Trading during restricted news event",
  },
];

// Generate mock pattern flags with dynamic dates
export const mockPatternFlags: MockPatternFlag[] = [
  {
    id: "FLG-001",
    timestamp: daysAgo(0, 13, 0),
    userId: "USR-009",
    userName: "David Lee",
    accountId: "ACC-009",
    type: "Overtrading",
    severity: "Warning",
    confidence: "High",
    status: "Open",
    description: "12 trades in single session, avg 2",
  },
  {
    id: "FLG-002",
    timestamp: daysAgo(1, 15, 30),
    userId: "USR-002",
    userName: "Sarah Johnson",
    accountId: "ACC-002",
    type: "Copy Trade Suspicion",
    severity: "Critical",
    confidence: "Medium",
    status: "Open",
    description: "Trade pattern matches 3 other accounts",
  },
  {
    id: "FLG-003",
    timestamp: daysAgo(1, 11, 0),
    userId: "USR-003",
    userName: "Michael Chen",
    accountId: "ACC-003",
    type: "Size Anomaly",
    severity: "Warning",
    confidence: "High",
    status: "Reviewed",
    description: "Position size 5x normal average",
  },
  {
    id: "FLG-004",
    timestamp: daysAgo(2, 16, 20),
    userId: "USR-004",
    userName: "Emily Davis",
    accountId: "ACC-004",
    type: "Rapid Behavior Change",
    severity: "Warning",
    confidence: "Medium",
    status: "Open",
    description: "Strategy shift detected in last 5 days",
  },
  {
    id: "FLG-005",
    timestamp: daysAgo(3, 10, 45),
    userId: "USR-014",
    userName: "Rachel Moore",
    accountId: "ACC-014",
    type: "Correlation Spike",
    severity: "Critical",
    confidence: "High",
    status: "Reviewed",
    description: "95% correlation with flagged account",
  },
];

// Generate mock alerts with dynamic dates
export const mockAlerts: MockAlert[] = [
  {
    id: "ALT-001",
    timestamp: daysAgo(0, 15, 10),
    type: "Payout Requested",
    severity: "Info",
    message: "John Smith requested $5,000 payout",
    targetType: "Payout",
    targetId: "PAY-001",
  },
  {
    id: "ALT-002",
    timestamp: daysAgo(0, 14, 30),
    type: "Rule Violation",
    severity: "Critical",
    message: "David Lee exceeded daily loss limit",
    targetType: "Account",
    targetId: "ACC-009",
  },
  {
    id: "ALT-003",
    timestamp: daysAgo(0, 13, 45),
    type: "Near Limit Warning",
    severity: "Warning",
    message: "Sarah Johnson at 85% drawdown",
    targetType: "Account",
    targetId: "ACC-002",
  },
  {
    id: "ALT-004",
    timestamp: daysAgo(0, 12, 0),
    type: "KYC Incomplete",
    severity: "Warning",
    message: "Lisa Anderson KYC not started",
    targetType: "User",
    targetId: "USR-006",
  },
  {
    id: "ALT-005",
    timestamp: daysAgo(0, 11, 30),
    type: "Payment Failed",
    severity: "Critical",
    message: "Subscription payment failed for James Wilson",
    targetType: "User",
    targetId: "USR-005",
  },
  {
    id: "ALT-006",
    timestamp: daysAgo(0, 10, 15),
    type: "Payout Requested",
    severity: "Info",
    message: "Robert Brown requested $8,500 payout",
    targetType: "Payout",
    targetId: "PAY-002",
  },
  {
    id: "ALT-007",
    timestamp: daysAgo(0, 9, 0),
    type: "Webhook Error",
    severity: "Warning",
    message: "PTT webhook delivery failed (retry 2/3)",
    targetType: "System",
    targetId: "SYS-001",
  },
  {
    id: "ALT-008",
    timestamp: daysAgo(1, 18, 30),
    type: "Rule Violation",
    severity: "Warning",
    message: "Chris Thompson consistency rule warning",
    targetType: "Account",
    targetId: "ACC-011",
  },
];

// Generate mock trades with dynamic dates
export const mockTrades: MockTrade[] = [
  {
    id: "TRD-001",
    accountId: "ACC-001",
    timestamp: daysAgo(0, 14, 32),
    symbol: "NQ",
    side: "Long",
    quantity: 2,
    entryPrice: 17250.5,
    exitPrice: 17275.25,
    pnl: 495,
    duration: "15m",
  },
  {
    id: "TRD-002",
    accountId: "ACC-001",
    timestamp: daysAgo(0, 13, 15),
    symbol: "ES",
    side: "Short",
    quantity: 3,
    entryPrice: 4895.0,
    exitPrice: 4888.5,
    pnl: 975,
    duration: "22m",
  },
  {
    id: "TRD-003",
    accountId: "ACC-001",
    timestamp: daysAgo(0, 11, 45),
    symbol: "NQ",
    side: "Long",
    quantity: 1,
    entryPrice: 17230.0,
    exitPrice: 17225.0,
    pnl: -100,
    duration: "8m",
  },
  {
    id: "TRD-004",
    accountId: "ACC-001",
    timestamp: daysAgo(0, 10, 30),
    symbol: "MNQ",
    side: "Long",
    quantity: 5,
    entryPrice: 17215.25,
    exitPrice: 17235.5,
    pnl: 202.5,
    duration: "35m",
  },
  {
    id: "TRD-005",
    accountId: "ACC-001",
    timestamp: daysAgo(0, 9, 15),
    symbol: "ES",
    side: "Long",
    quantity: 2,
    entryPrice: 4880.25,
    exitPrice: 4892.0,
    pnl: 587.5,
    duration: "45m",
  },
];

// Generate mock subscriptions with dynamic dates
export const mockSubscriptions: MockSubscription[] = [
  {
    id: "SUB-001",
    userId: "USR-001",
    userName: "John Smith",
    email: "john.smith@email.com",
    plan: "Dynasty",
    status: "Active",
    startDate: daysAgoDate(90),
    renewalDate: daysAgoDate(-30),
    lastPaymentStatus: "Paid",
    amount: 599,
  },
  {
    id: "SUB-002",
    userId: "USR-002",
    userName: "Sarah Johnson",
    email: "sarah.j@email.com",
    plan: "Advanced",
    status: "Active",
    startDate: daysAgoDate(14),
    renewalDate: daysAgoDate(-16),
    lastPaymentStatus: "Paid",
    amount: 299,
  },
  {
    id: "SUB-003",
    userId: "USR-005",
    userName: "James Wilson",
    email: "jwilson@email.com",
    plan: "Advanced",
    status: "Past Due",
    startDate: daysAgoDate(45),
    renewalDate: daysAgoDate(-15),
    lastPaymentStatus: "Failed",
    amount: 299,
  },
  {
    id: "SUB-004",
    userId: "USR-007",
    userName: "Robert Brown",
    email: "rbrown@email.com",
    plan: "Dynasty",
    status: "Active",
    startDate: daysAgoDate(180),
    renewalDate: daysAgoDate(-30),
    lastPaymentStatus: "Paid",
    amount: 599,
  },
  {
    id: "SUB-005",
    userId: "USR-010",
    userName: "Jennifer Taylor",
    email: "jtaylor@email.com",
    plan: "Dynasty",
    status: "Active",
    startDate: daysAgoDate(240),
    renewalDate: daysAgoDate(-30),
    lastPaymentStatus: "Paid",
    amount: 599,
  },
  {
    id: "SUB-006",
    userId: "USR-014",
    userName: "Rachel Moore",
    email: "rmoore@email.com",
    plan: "Advanced",
    status: "Canceled",
    startDate: daysAgoDate(60),
    renewalDate: daysAgoDate(0),
    lastPaymentStatus: "Paid",
    amount: 299,
  },
];

// Generate mock transactions with dynamic dates
export const mockTransactions: MockTransaction[] = [
  {
    id: "TXN-001",
    date: daysAgoDate(0),
    userId: "USR-001",
    userName: "John Smith",
    amount: 599,
    type: "Subscription",
    status: "Paid",
    referenceId: "ch_3OqT8H...",
  },
  {
    id: "TXN-002",
    date: daysAgoDate(1),
    userId: "USR-009",
    userName: "David Lee",
    amount: 99,
    type: "Reset",
    status: "Paid",
    referenceId: "ch_3OqS7G...",
  },
  {
    id: "TXN-003",
    date: daysAgoDate(2),
    userId: "USR-005",
    userName: "James Wilson",
    amount: 299,
    type: "Subscription",
    status: "Failed",
    referenceId: "ch_3OqR6F...",
  },
  {
    id: "TXN-004",
    date: daysAgoDate(3),
    userId: "USR-003",
    userName: "Michael Chen",
    amount: 149,
    type: "Fee",
    status: "Paid",
    referenceId: "ch_3OqQ5E...",
  },
  {
    id: "TXN-005",
    date: daysAgoDate(4),
    userId: "USR-014",
    userName: "Rachel Moore",
    amount: 299,
    type: "Refund",
    status: "Refunded",
    referenceId: "re_3OqP4D...",
  },
  {
    id: "TXN-006",
    date: daysAgoDate(5),
    userId: "USR-011",
    userName: "Chris Thompson",
    amount: 299,
    type: "Subscription",
    status: "Chargeback",
    referenceId: "dp_3OqO3C...",
  },
];

// Generate mock audit logs with dynamic dates
export const mockAuditLogs: MockAuditLog[] = [
  {
    id: "AUD-001",
    timestamp: daysAgo(0, 15, 30),
    actor: "admin@dynasty.com",
    actionType: "Payout Approved",
    targetType: "Payout",
    targetId: "PAY-005",
    summary: "Approved payout of $1,500 for Michelle Garcia",
    severity: "Info",
    source: "UI",
  },
  {
    id: "AUD-002",
    timestamp: daysAgo(0, 14, 45),
    actor: "admin@dynasty.com",
    actionType: "Account Paused",
    targetType: "Account",
    targetId: "ACC-004",
    summary: "Paused account due to trading violations",
    severity: "Warning",
    source: "UI",
  },
  {
    id: "AUD-003",
    timestamp: daysAgo(0, 13, 0),
    actor: "system",
    actionType: "Account Failed",
    targetType: "Account",
    targetId: "ACC-005",
    summary: "Auto-failed due to Max Loss Limit breach",
    severity: "Critical",
    source: "Automation",
  },
  {
    id: "AUD-004",
    timestamp: daysAgo(1, 16, 30),
    actor: "ops@dynasty.com",
    actionType: "Payout Held",
    targetType: "Payout",
    targetId: "PAY-006",
    summary: "Held payout pending risk review",
    severity: "Warning",
    source: "UI",
  },
  {
    id: "AUD-005",
    timestamp: daysAgo(1, 11, 15),
    actor: "admin@dynasty.com",
    actionType: "User Verified",
    targetType: "User",
    targetId: "USR-008",
    summary: "KYC verification completed for Amanda Martinez",
    severity: "Info",
    source: "UI",
  },
  {
    id: "AUD-006",
    timestamp: daysAgo(2, 9, 0),
    actor: "system",
    actionType: "Subscription Created",
    targetType: "User",
    targetId: "USR-013",
    summary: "New Dynasty plan subscription",
    severity: "Info",
    source: "API",
  },
];

// Generate mock notes with dynamic dates
export const mockNotes: MockNote[] = [
  {
    id: "NOTE-001",
    author: "admin@dynasty.com",
    timestamp: daysAgo(0, 14, 0),
    content:
      "Reviewed trading pattern, appears legitimate. Monitoring closely.",
  },
  {
    id: "NOTE-002",
    author: "ops@dynasty.com",
    timestamp: daysAgo(1, 16, 30),
    content: "User contacted support about the hold. Explained review process.",
  },
  {
    id: "NOTE-003",
    author: "admin@dynasty.com",
    timestamp: daysAgo(2, 11, 0),
    content: "Escalated to compliance team for further review.",
  },
];

// Helper functions
export const getAccountById = (id: string) =>
  mockAccounts.find((a) => a.id === id);
export const getUserById = (id: string) => mockUsers.find((u) => u.id === id);
export const getPayoutById = (id: string) =>
  mockPayouts.find((p) => p.id === id);
export const getTradesByAccountId = (accountId: string) =>
  mockTrades.filter((t) => t.accountId === accountId);

export const getHighRiskAccounts = () =>
  mockAccounts.filter((a) => a.drawdownUsed > 80 || a.dailyLossUsed > 80);
export const getPendingPayouts = () =>
  mockPayouts.filter((p) => p.status === "Pending");
export const getOpenViolations = () =>
  mockViolations.filter((v) => v.status === "Open");
export const getOpenFlags = () =>
  mockPatternFlags.filter((f) => f.status === "Open");

// KPI calculations
export const getKPIs = () => ({
  activeAccounts: mockAccounts.filter((a) => a.status !== "Failed").length,
  evaluationsRunning: mockAccounts.filter((a) => a.status === "Evaluation")
    .length,
  fundedAccounts: mockAccounts.filter((a) => a.status === "Funded").length,
  newSignupsToday: 3,
  pendingPayoutCount: getPendingPayouts().length,
  pendingPayoutTotal: getPendingPayouts().reduce((sum, p) => sum + p.amount, 0),
  highRiskAccounts: getHighRiskAccounts().length,
});

// Exposure data for chart
export const getExposureData = () => [
  { instrument: "NQ", long: 45, short: 23 },
  { instrument: "ES", long: 32, short: 41 },
  { instrument: "MNQ", long: 28, short: 15 },
  { instrument: "MES", long: 18, short: 22 },
];

// ============= NEW DATA FOR ADDITIONAL TABS =============

// Support Cases
export type CaseStatus =
  | "Open"
  | "Waiting on User"
  | "Under Review"
  | "Resolved";
export type CaseType =
  | "Payout"
  | "Rule Dispute"
  | "KYC"
  | "Billing"
  | "Technical";
export type CasePriority = "Low" | "Medium" | "High" | "Critical";

export interface MockSupportCase {
  id: string;
  userId: string;
  userName: string;
  accountId?: string;
  type: CaseType;
  priority: CasePriority;
  status: CaseStatus;
  subject: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  timeline: {
    type: "user" | "admin";
    author: string;
    timestamp: string;
    message: string;
  }[];
}

export const mockSupportCases: MockSupportCase[] = [
  {
    id: "CASE-001",
    userId: "USR-001",
    userName: "John Smith",
    accountId: "ACC-001",
    type: "Payout",
    priority: "High",
    status: "Open",
    subject: "Payout delayed for 5 days",
    createdAt: daysAgo(0, 10, 30),
    updatedAt: daysAgo(0, 14, 0),
    assignedTo: "ops@dynasty.com",
    timeline: [
      {
        type: "user",
        author: "John Smith",
        timestamp: daysAgo(0, 10, 30),
        message: "My payout request from Jan 10 has not been processed yet.",
      },
      {
        type: "admin",
        author: "ops@dynasty.com",
        timestamp: daysAgo(0, 14, 0),
        message: "Looking into this now. Will update shortly.",
      },
    ],
  },
  {
    id: "CASE-002",
    userId: "USR-003",
    userName: "Michael Chen",
    accountId: "ACC-003",
    type: "Rule Dispute",
    priority: "Critical",
    status: "Under Review",
    subject: "Daily loss violation was incorrect",
    createdAt: daysAgo(1, 16, 45),
    updatedAt: daysAgo(0, 9, 0),
    assignedTo: "compliance@dynasty.com",
    timeline: [
      {
        type: "user",
        author: "Michael Chen",
        timestamp: daysAgo(1, 16, 45),
        message:
          "I believe the daily loss calculation is wrong. My trades show profit.",
      },
    ],
  },
  {
    id: "CASE-003",
    userId: "USR-006",
    userName: "Lisa Anderson",
    type: "KYC",
    priority: "Medium",
    status: "Waiting on User",
    subject: "Need help with KYC documents",
    createdAt: daysAgo(2, 11, 0),
    updatedAt: daysAgo(1, 8, 30),
    timeline: [
      {
        type: "user",
        author: "Lisa Anderson",
        timestamp: daysAgo(2, 11, 0),
        message: "What documents do I need to submit for verification?",
      },
      {
        type: "admin",
        author: "support@dynasty.com",
        timestamp: daysAgo(1, 8, 30),
        message: "Please submit a government ID and proof of address.",
      },
    ],
  },
  {
    id: "CASE-004",
    userId: "USR-005",
    userName: "James Wilson",
    type: "Billing",
    priority: "High",
    status: "Open",
    subject: "Subscription payment failed",
    createdAt: daysAgo(0, 11, 30),
    updatedAt: daysAgo(0, 11, 30),
    timeline: [
      {
        type: "user",
        author: "James Wilson",
        timestamp: daysAgo(0, 11, 30),
        message: "My card was declined but I have funds available.",
      },
    ],
  },
  {
    id: "CASE-005",
    userId: "USR-009",
    userName: "David Lee",
    accountId: "ACC-009",
    type: "Technical",
    priority: "Low",
    status: "Resolved",
    subject: "Platform loading slowly",
    createdAt: daysAgo(3, 14, 0),
    updatedAt: daysAgo(2, 10, 0),
    assignedTo: "tech@dynasty.com",
    timeline: [
      {
        type: "user",
        author: "David Lee",
        timestamp: daysAgo(3, 14, 0),
        message: "Dashboard takes 10+ seconds to load.",
      },
      {
        type: "admin",
        author: "tech@dynasty.com",
        timestamp: daysAgo(2, 10, 0),
        message: "Issue resolved. Was a temporary CDN issue.",
      },
    ],
  },
];

// Announcements
export type AnnouncementType = "Banner" | "Modal" | "Notification";
export type AnnouncementStatus = "Scheduled" | "Live" | "Expired" | "Disabled";

export interface MockAnnouncement {
  id: string;
  type: AnnouncementType;
  title: string;
  message: string;
  severity: Severity;
  target: string;
  status: AnnouncementStatus;
  startTime: string;
  endTime?: string;
  createdAt: string;
  createdBy: string;
}

export const mockAnnouncements: MockAnnouncement[] = [
  {
    id: "ANN-001",
    type: "Banner",
    title: "Holiday Trading Hours",
    message: "Markets will close early on Dec 24th and remain closed Dec 25th.",
    severity: "Info",
    target: "All Users",
    status: "Live",
    startTime: daysAgoDate(5),
    endTime: daysAgoDate(-5),
    createdAt: daysAgoDate(6),
    createdBy: "admin@dynasty.com",
  },
  {
    id: "ANN-002",
    type: "Modal",
    title: "New Payout Rules",
    message: "Starting Jan 15, daily payouts require 5 trading days minimum.",
    severity: "Warning",
    target: "Funded Only",
    status: "Live",
    startTime: daysAgoDate(0),
    createdAt: daysAgoDate(3),
    createdBy: "admin@dynasty.com",
  },
  {
    id: "ANN-003",
    type: "Notification",
    title: "Platform Maintenance",
    message: "Scheduled maintenance on Jan 20th from 2-4 AM EST.",
    severity: "Info",
    target: "All Users",
    status: "Scheduled",
    startTime: daysAgoDate(-4),
    createdAt: daysAgoDate(0),
    createdBy: "ops@dynasty.com",
  },
  {
    id: "ANN-004",
    type: "Banner",
    title: "New Year Promo Ending",
    message: "50% off evaluations ends tonight!",
    severity: "Critical",
    target: "All Users",
    status: "Expired",
    startTime: daysAgoDate(14),
    endTime: daysAgoDate(8),
    createdAt: daysAgoDate(14),
    createdBy: "marketing@dynasty.com",
  },
];

// Plans & Products
export interface MockPlan {
  id: string;
  name: PlanType;
  accountSize: string;
  price: number;
  activationFee: number;
  evalReset: number;
  fundedReset: number;
  profitTarget: number | null; // null for Dynasty (instant funded)
  maxDrawdown: number;
  dailyLossLimit: number;
  payoutType: "Daily" | "5-Day";
  status: "Active" | "Paused";
}

export const mockPlans: MockPlan[] = [
  // Standard Plans
  {
    id: "PLAN-001",
    name: "Standard",
    accountSize: "$25,000",
    price: 39,
    activationFee: 80,
    evalReset: 35,
    fundedReset: 150,
    profitTarget: 1500,
    maxDrawdown: 1500,
    dailyLossLimit: 750,
    payoutType: "5-Day",
    status: "Active",
  },
  {
    id: "PLAN-002",
    name: "Standard",
    accountSize: "$50,000",
    price: 59,
    activationFee: 80,
    evalReset: 45,
    fundedReset: 200,
    profitTarget: 3000,
    maxDrawdown: 2500,
    dailyLossLimit: 1500,
    payoutType: "5-Day",
    status: "Active",
  },
  {
    id: "PLAN-003",
    name: "Standard",
    accountSize: "$100,000",
    price: 99,
    activationFee: 80,
    evalReset: 65,
    fundedReset: 250,
    profitTarget: 6000,
    maxDrawdown: 3000,
    dailyLossLimit: 2000,
    payoutType: "5-Day",
    status: "Active",
  },
  {
    id: "PLAN-004",
    name: "Standard",
    accountSize: "$150,000",
    price: 129,
    activationFee: 80,
    evalReset: 75,
    fundedReset: 300,
    profitTarget: 8000,
    maxDrawdown: 4500,
    dailyLossLimit: 3000,
    payoutType: "5-Day",
    status: "Active",
  },
  // Advanced Plans
  {
    id: "PLAN-005",
    name: "Advanced",
    accountSize: "$25,000",
    price: 65,
    activationFee: 0,
    evalReset: 35,
    fundedReset: 175,
    profitTarget: 1500,
    maxDrawdown: 1500,
    dailyLossLimit: 750,
    payoutType: "5-Day",
    status: "Active",
  },
  {
    id: "PLAN-006",
    name: "Advanced",
    accountSize: "$50,000",
    price: 95,
    activationFee: 0,
    evalReset: 45,
    fundedReset: 225,
    profitTarget: 3000,
    maxDrawdown: 2500,
    dailyLossLimit: 1500,
    payoutType: "5-Day",
    status: "Active",
  },
  {
    id: "PLAN-007",
    name: "Advanced",
    accountSize: "$100,000",
    price: 160,
    activationFee: 0,
    evalReset: 65,
    fundedReset: 275,
    profitTarget: 6000,
    maxDrawdown: 3000,
    dailyLossLimit: 2000,
    payoutType: "5-Day",
    status: "Active",
  },
  {
    id: "PLAN-008",
    name: "Advanced",
    accountSize: "$150,000",
    price: 199,
    activationFee: 0,
    evalReset: 75,
    fundedReset: 325,
    profitTarget: 8000,
    maxDrawdown: 4500,
    dailyLossLimit: 3000,
    payoutType: "5-Day",
    status: "Active",
  },
  // Dynasty Plans (Instant Funded - no eval, no profit target)
  {
    id: "PLAN-009",
    name: "Dynasty",
    accountSize: "$25,000",
    price: 99,
    activationFee: 0,
    evalReset: 0,
    fundedReset: 200,
    profitTarget: null,
    maxDrawdown: 1500,
    dailyLossLimit: 750,
    payoutType: "Daily",
    status: "Active",
  },
  {
    id: "PLAN-010",
    name: "Dynasty",
    accountSize: "$50,000",
    price: 129,
    activationFee: 0,
    evalReset: 0,
    fundedReset: 275,
    profitTarget: null,
    maxDrawdown: 2500,
    dailyLossLimit: 1500,
    payoutType: "Daily",
    status: "Active",
  },
  {
    id: "PLAN-011",
    name: "Dynasty",
    accountSize: "$100,000",
    price: 199,
    activationFee: 0,
    evalReset: 0,
    fundedReset: 325,
    profitTarget: null,
    maxDrawdown: 3000,
    dailyLossLimit: 2000,
    payoutType: "Daily",
    status: "Active",
  },
  {
    id: "PLAN-012",
    name: "Dynasty",
    accountSize: "$150,000",
    price: 239,
    activationFee: 0,
    evalReset: 0,
    fundedReset: 375,
    profitTarget: null,
    maxDrawdown: 4500,
    dailyLossLimit: 3000,
    payoutType: "Daily",
    status: "Active",
  },
];

// Promo Codes
export interface MockPromoCode {
  id: string;
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  duration: "one-time" | "recurring";
  usageLimit?: number;
  usageCount: number;
  eligiblePlans: PlanType[];
  startDate: string;
  endDate?: string;
  status: "Active" | "Disabled" | "Expired";
}

export const mockPromoCodes: MockPromoCode[] = [
  {
    id: "PROMO-001",
    code: "NEWYEAR50",
    discountType: "percent",
    discountValue: 50,
    duration: "one-time",
    usageLimit: 100,
    usageCount: 87,
    eligiblePlans: ["Standard", "Advanced", "Dynasty"],
    startDate: daysAgoDate(14),
    endDate: daysAgoDate(8),
    status: "Expired",
  },
  {
    id: "PROMO-002",
    code: "DYNASTY20",
    discountType: "percent",
    discountValue: 20,
    duration: "one-time",
    usageLimit: 50,
    usageCount: 23,
    eligiblePlans: ["Dynasty"],
    startDate: daysAgoDate(5),
    status: "Active",
  },
  {
    id: "PROMO-003",
    code: "AFFILIATE100",
    discountType: "fixed",
    discountValue: 100,
    duration: "one-time",
    usageCount: 156,
    eligiblePlans: ["Standard", "Advanced", "Dynasty"],
    startDate: daysAgoDate(180),
    status: "Active",
  },
  {
    id: "PROMO-004",
    code: "VIP10",
    discountType: "percent",
    discountValue: 10,
    duration: "recurring",
    usageLimit: 20,
    usageCount: 8,
    eligiblePlans: ["Dynasty"],
    startDate: daysAgoDate(0),
    status: "Active",
  },
];

// Integrations
export interface MockIntegration {
  id: string;
  name: string;
  status: "Connected" | "Disconnected" | "Degraded";
  lastSync: string;
  webhookHealth: "Healthy" | "Degraded" | "Down";
  apiKeyLast4: string;
}

export const mockIntegrations: MockIntegration[] = [
  {
    id: "INT-001",
    name: "PropTradeTech",
    status: "Connected",
    lastSync: daysAgo(0, 15, 0),
    webhookHealth: "Healthy",
    apiKeyLast4: "x7k9",
  },
  {
    id: "INT-002",
    name: "Stripe",
    status: "Connected",
    lastSync: daysAgo(0, 15, 5),
    webhookHealth: "Healthy",
    apiKeyLast4: "r4m2",
  },
  {
    id: "INT-003",
    name: "Tradovate",
    status: "Connected",
    lastSync: daysAgo(0, 14, 45),
    webhookHealth: "Degraded",
    apiKeyLast4: "p1n8",
  },
  {
    id: "INT-004",
    name: "Rithmic",
    status: "Disconnected",
    lastSync: daysAgo(1, 22, 0),
    webhookHealth: "Down",
    apiKeyLast4: "q5w3",
  },
];

// Webhooks
export interface MockWebhook {
  id: string;
  timestamp: string;
  provider: string;
  eventType: string;
  status: "Success" | "Failed" | "Retrying";
  targetType: "Account" | "User" | "Payout" | "System";
  targetId: string;
  payload: Record<string, unknown>;
}

export const mockWebhooks: MockWebhook[] = [
  {
    id: "WH-001",
    timestamp: daysAgo(0, 15, 10),
    provider: "PTT",
    eventType: "trade.executed",
    status: "Success",
    targetType: "Account",
    targetId: "ACC-001",
    payload: { tradeId: "TRD-005", symbol: "NQ", side: "long" },
  },
  {
    id: "WH-002",
    timestamp: daysAgo(0, 15, 5),
    provider: "Stripe",
    eventType: "payment.succeeded",
    status: "Success",
    targetType: "User",
    targetId: "USR-001",
    payload: { amount: 599, currency: "usd" },
  },
  {
    id: "WH-003",
    timestamp: daysAgo(0, 14, 55),
    provider: "PTT",
    eventType: "account.breach",
    status: "Success",
    targetType: "Account",
    targetId: "ACC-009",
    payload: { type: "daily_loss", value: 3.2 },
  },
  {
    id: "WH-004",
    timestamp: daysAgo(0, 14, 30),
    provider: "Tradovate",
    eventType: "position.update",
    status: "Retrying",
    targetType: "Account",
    targetId: "ACC-003",
    payload: { symbol: "ES", qty: 2 },
  },
  {
    id: "WH-005",
    timestamp: daysAgo(0, 14, 0),
    provider: "Stripe",
    eventType: "payment.failed",
    status: "Success",
    targetType: "User",
    targetId: "USR-005",
    payload: { amount: 299, error: "card_declined" },
  },
];

// Roles & Permissions
export interface MockRole {
  id: string;
  name: string;
  permissions: string[];
}

export const mockRoles: MockRole[] = [
  {
    id: "ROLE-001",
    name: "Admin",
    permissions: [
      "View Users",
      "Manage Accounts",
      "Approve Payouts",
      "Hold Payouts",
      "Edit Rules",
      "View Audit Logs",
      "Manage Billing",
      "Manage Integrations",
    ],
  },
  {
    id: "ROLE-002",
    name: "Ops",
    permissions: [
      "View Users",
      "Manage Accounts",
      "Approve Payouts",
      "Hold Payouts",
      "View Audit Logs",
    ],
  },
  {
    id: "ROLE-003",
    name: "Compliance",
    permissions: ["View Users", "Hold Payouts", "View Audit Logs"],
  },
  {
    id: "ROLE-004",
    name: "Support",
    permissions: ["View Users", "View Audit Logs"],
  },
  {
    id: "ROLE-005",
    name: "Read-only",
    permissions: ["View Users", "View Audit Logs"],
  },
];

// Admin Sessions
export interface MockAdminSession {
  id: string;
  adminUser: string;
  role: string;
  loginTime: string;
  ip: string;
  device: string;
  lastActive: string;
  status: "Active" | "Expired";
}

export const mockAdminSessions: MockAdminSession[] = [
  {
    id: "SESS-001",
    adminUser: "admin@dynasty.com",
    role: "Admin",
    loginTime: daysAgo(0, 8, 0),
    ip: "192.168.1.100",
    device: "Chrome / macOS",
    lastActive: daysAgo(0, 15, 10),
    status: "Active",
  },
  {
    id: "SESS-002",
    adminUser: "ops@dynasty.com",
    role: "Ops",
    loginTime: daysAgo(0, 9, 30),
    ip: "192.168.1.101",
    device: "Firefox / Windows",
    lastActive: daysAgo(0, 14, 45),
    status: "Active",
  },
  {
    id: "SESS-003",
    adminUser: "compliance@dynasty.com",
    role: "Compliance",
    loginTime: daysAgo(0, 10, 0),
    ip: "192.168.1.102",
    device: "Safari / macOS",
    lastActive: daysAgo(0, 13, 30),
    status: "Active",
  },
  {
    id: "SESS-004",
    adminUser: "support@dynasty.com",
    role: "Support",
    loginTime: daysAgo(1, 14, 0),
    ip: "192.168.1.103",
    device: "Chrome / Windows",
    lastActive: daysAgo(1, 18, 0),
    status: "Expired",
  },
];

// Linked Accounts (for Risk & Flags)
export interface MockLinkedAccount {
  id: string;
  linkType: "IP" | "Device" | "Payment";
  accounts: { accountId: string; userName: string; status: string }[];
  riskLevel: "Low" | "Medium" | "High";
  lastSeen: string;
}

export const mockLinkedAccounts: MockLinkedAccount[] = [
  {
    id: "LINK-001",
    linkType: "IP",
    accounts: [
      { accountId: "ACC-002", userName: "Sarah Johnson", status: "Evaluation" },
      { accountId: "ACC-009", userName: "David Lee", status: "Evaluation" },
    ],
    riskLevel: "High",
    lastSeen: daysAgoDate(0),
  },
  {
    id: "LINK-002",
    linkType: "Device",
    accounts: [
      { accountId: "ACC-004", userName: "Emily Davis", status: "Paused" },
      { accountId: "ACC-011", userName: "Chris Thompson", status: "Paused" },
    ],
    riskLevel: "Medium",
    lastSeen: daysAgoDate(1),
  },
  {
    id: "LINK-003",
    linkType: "Payment",
    accounts: [
      { accountId: "ACC-003", userName: "Michael Chen", status: "Funded" },
      { accountId: "ACC-006", userName: "Lisa Anderson", status: "Evaluation" },
    ],
    riskLevel: "Low",
    lastSeen: daysAgoDate(2),
  },
];

// Correlation Flags (for Risk & Flags)
export interface MockCorrelationFlag {
  id: string;
  severity: Severity;
  summary: string;
  accountIds: string[];
  correlation: number;
  status: "Pending Review" | "Reviewed" | "Action Taken";
  detectedAt: string;
}

export const mockCorrelationFlags: MockCorrelationFlag[] = [
  {
    id: "CORR-001",
    severity: "Critical",
    summary: "Copy trading detected between 3 accounts",
    accountIds: ["ACC-002", "ACC-009", "ACC-014"],
    correlation: 95,
    status: "Pending Review",
    detectedAt: daysAgo(0, 13, 0),
  },
  {
    id: "CORR-002",
    severity: "Warning",
    summary: "Similar entry/exit patterns on 2 accounts",
    accountIds: ["ACC-004", "ACC-011"],
    correlation: 78,
    status: "Reviewed",
    detectedAt: daysAgo(1, 16, 30),
  },
  {
    id: "CORR-003",
    severity: "Warning",
    summary: "Matching trade times within 5 seconds",
    accountIds: ["ACC-003", "ACC-008"],
    correlation: 65,
    status: "Action Taken",
    detectedAt: daysAgo(2, 11, 0),
  },
];
