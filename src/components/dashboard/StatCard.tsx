
import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

const StatCard = ({ title, value, icon, className, trend }: StatCardProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className={cn("flex justify-between items-center", isMobile ? "p-3" : "p-6")}>
        <div className="flex-1 min-w-0">
          <p className={cn("font-medium text-muted-foreground truncate", 
            isMobile ? "text-xs" : "text-sm"
          )}>
            {title}
          </p>
          <h3 className={cn("font-bold mt-1 truncate", 
            isMobile ? "text-lg" : "text-2xl"
          )}>
            {value}
          </h3>
          {trend && (
            <p className={cn(`text-xs font-medium mt-1 flex items-center ${
              trend.isPositive ? 'text-tontine-secondary' : 'text-red-500'
            }`, isMobile && "text-[10px]")}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className="ml-1 truncate">par rapport au mois précédent</span>
            </p>
          )}
        </div>
        <div className={cn("p-2 rounded-full bg-primary/10 text-primary shrink-0", 
          isMobile ? "ml-2" : "ml-4"
        )}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
