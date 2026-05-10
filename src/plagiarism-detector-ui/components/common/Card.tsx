/**
 * Card Component
 * Reusable card container with common styling
 */

import React from "react";

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  border?: boolean;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  padding = "md",
  border = true,
  shadow = true,
}) => {
  const paddingClass = {
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg ${
        border ? "border border-gray-200 dark:border-slate-700" : ""
      } ${shadow ? "shadow-md" : ""} ${paddingClass[padding]}`}
    >
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};
