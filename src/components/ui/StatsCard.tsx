
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
  className?: string;
  valueClassName?: string;
  isLoading?: boolean;
}

const StatsCard = ({
  title,
  value,
  icon,
  className = '',
  valueClassName = '',
  isLoading = false,
}: StatsCardProps) => {
  return (
    <div className={`glass-card rounded-xl p-5 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm text-gray-400 font-medium mb-1">{title}</h3>
          {isLoading ? (
            <div className="h-8 bg-gray-700 animate-pulse rounded"></div>
          ) : (
            <div className={`text-2xl font-display font-semibold ${valueClassName}`}>
              {value}
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
