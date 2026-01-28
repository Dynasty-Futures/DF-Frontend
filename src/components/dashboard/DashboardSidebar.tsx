import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Briefcase, 
  Receipt, 
  ArrowDownToLine, 
  Users,
  User, 
  Award, 
  Headphones 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/Dashboard_Logo.png';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipPortal,
} from '@/components/ui/tooltip';

const sidebarLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: Activity },
  { name: 'Accounts', path: '/dashboard/accounts', icon: Briefcase },
  { name: 'Billing', path: '/dashboard/billing', icon: Receipt },
  { name: 'Payouts', path: '/dashboard/payouts', icon: ArrowDownToLine },
  { name: 'Affiliate', path: '/dashboard/affiliate', icon: Users },
  { name: 'Profile', path: '/dashboard/profile', icon: User },
  { name: 'Achievements', path: '/dashboard/achievements', icon: Award },
  { name: 'Help Center', path: '/dashboard/help', icon: Headphones },
];

const DashboardSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="w-16 shrink-0 h-screen sticky top-0 bg-transparent backdrop-blur-xl border-r border-border/30 flex flex-col overflow-hidden">
        {/* Logo */}
        <div className="p-3 flex justify-center bg-transparent">
          <Link to="/" className="group">
            <img 
              src={logo} 
              alt="Dynasty Futures" 
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105 logo-blend"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            
            return (
              <Tooltip key={link.path}>
                <TooltipTrigger asChild>
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-xl transition-all duration-300",
                      active 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <Icon 
                      size={22} 
                      className={cn(
                        "transition-colors duration-300",
                        active ? "text-primary" : ""
                      )} 
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipPortal>
                  <TooltipContent side="right" className="font-medium z-50">
                    {link.name}
                  </TooltipContent>
                </TooltipPortal>
              </Tooltip>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-border/30">
        <p className="text-[10px] text-muted-foreground text-center">
          © 2025
        </p>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default DashboardSidebar;
