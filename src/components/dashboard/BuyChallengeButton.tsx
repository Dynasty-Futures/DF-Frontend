import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BuyChallengeButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  label?: string;
}

const BuyChallengeButton = ({
  variant = 'default',
  size = 'sm',
  className,
  label = 'New Challenge',
}: BuyChallengeButtonProps) => {
  return (
    <Button variant={variant} size={size} className={className} asChild>
      <Link to="/pricing">
        <Plus size={14} className="mr-2" />
        {label}
      </Link>
    </Button>
  );
};

export default BuyChallengeButton;
