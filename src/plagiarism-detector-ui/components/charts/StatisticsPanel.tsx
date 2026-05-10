/**
 * Statistics Panel Component
 * Displays key statistics and metrics
 */

import React from "react";

interface Statistic {
  label: string;
  value: string;
  unit?: string;
  trend?: "up" | "down" | "neutral";
}

interface StatisticsPanelProps {
  statistics: Statistic[];
  columns?: number;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  statistics,
  columns = 3,
}) => {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {statistics.map((stat, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 p-4 rounded-lg border border-blue-100 dark:border-slate-600"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            {stat.label}
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            {stat.unit && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {stat.unit}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
