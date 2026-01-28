import { useState, useMemo } from 'react';
import { Wallet, TrendingUp, ShieldAlert, ChevronDown, BarChart3, Map, Calendar } from 'lucide-react';
import { format, isToday } from 'date-fns';
import AccountSelector from '@/components/dashboard/AccountSelector';
import MetricCard from '@/components/dashboard/MetricCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import SummaryPanel from '@/components/dashboard/SummaryPanel';
import DynastyPanel from '@/components/dashboard/DynastyPanel';
import AccountMetrics from '@/components/dashboard/AccountMetrics';
import DailyAnalytics from '@/components/dashboard/DailyAnalytics';
import { Button } from '@/components/ui/button';
import { mockAccounts, getAccountById, generateChartData } from '@/data/mockDashboardData';

// In production, replace mock datasets with live data from PropTradeTech / broker APIs.

const DashboardHome = () => {
  const [selectedAccount, setSelectedAccount] = useState('2'); // Default to 50K Advanced
  const [dateRange, setDateRange] = useState('30');
  const [chartType, setChartType] = useState<'equity' | 'pnl'>('equity');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // For Daily Performance Calendar

  // Get the selected account data
  const accountData = useMemo(() => {
    return getAccountById(selectedAccount) || mockAccounts[1];
  }, [selectedAccount]);

  // Determine if this is a Dynasty account
  const isDynastyAccount = accountData.planType === 'Dynasty';

  // Generate chart data based on selected account and timeframe
  const chartData = useMemo(() => {
    return generateChartData(accountData, dateRange);
  }, [accountData, dateRange]);

  // Format currency values
  const formatCurrency = (value: number, showSign = false) => {
    const formatted = `$${Math.abs(value).toLocaleString()}`;
    if (showSign && value !== 0) {
      return value > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };

  const scrollToStats = () => {
    document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-3 pt-12 lg:pt-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Overview of your Dynasty Futures performance</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/20 border border-border/30">
            <Button
              variant="ghost"
              size="sm"
              className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${dateRange === '7' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setDateRange('7')}
            >
              7 Days
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${dateRange === '30' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setDateRange('30')}
            >
              30 Days
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${dateRange === '90' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setDateRange('90')}
            >
              90 Days
            </Button>
          </div>
          <AccountSelector value={selectedAccount} onValueChange={setSelectedAccount} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <MetricCard
          title="Account Balance"
          value={formatCurrency(accountData.currentBalance)}
          icon={Wallet}
          trend={accountData.closedPnL >= 0 ? 'up' : 'down'}
          trendValue={formatCurrency(accountData.closedPnL, true)}
        />
        <MetricCard
          title="Closed P&L"
          value={formatCurrency(accountData.closedPnL, true)}
          icon={TrendingUp}
          trend={accountData.closedPnL >= 0 ? 'up' : 'down'}
          trendValue={`${((accountData.closedPnL / accountData.startingBalance) * 100).toFixed(1)}%`}
        />
        <MetricCard
          title="Drawdown Used"
          value={formatCurrency(accountData.drawdownUsed)}
          icon={ShieldAlert}
          trend="neutral"
          trendValue={`of ${formatCurrency(accountData.maxDrawdown)}`}
        />
      </div>

      {/* Jump to Stats Link */}
      <div className="flex justify-center">
        <button 
          onClick={scrollToStats}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
        >
          <span>Jump to Stats</span>
          <ChevronDown size={16} className="animate-bounce" />
        </button>
      </div>

      {/* Full-width Chart - fills remaining viewport */}
      <PerformanceChart 
        data={chartData}
        chartType={chartType}
        onChartTypeChange={setChartType}
        startingBalance={accountData.startingBalance}
        className="h-[calc(100vh-380px)] min-h-[400px]"
      />
      
      {/* Stats Section - Below the fold */}
      <div id="stats-section" className="pt-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Performance Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column - Roadmap */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Map size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                {isDynastyAccount ? 'Payout Tracker' : 'Account Roadmap'}
              </span>
            </div>
            {isDynastyAccount ? (
              <DynastyPanel 
                accountId={selectedAccount}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            ) : (
              <SummaryPanel 
                accountId={selectedAccount} 
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            )}
          </div>
          
          {/* Right Column - Account Metrics */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BarChart3 size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Trading Analytics
              </span>
            </div>
            <AccountMetrics accountId={selectedAccount} />
          </div>
        </div>
      </div>

      {/* Daily Analytics Section */}
      <div className="pt-8">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Daily Analytics</h2>
            <p className="text-xs text-muted-foreground">
              {isToday(selectedDate) ? "Today's trading performance" : format(selectedDate, 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
        <DailyAnalytics accountId={selectedAccount} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default DashboardHome;
