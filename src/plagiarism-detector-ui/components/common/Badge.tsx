/**
 * Badge Component
 * Small label component for status indicators
 */

import React from "react";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "sm",
}) => {
  const variantClass: Record<BadgeVariant, string> = {
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    default:
      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };

  const sizeClass = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
  };

  return (
    <span
      className={`${variantClass[variant]} ${sizeClass[size]} rounded-full font-medium inline-block`}
    >
      {children}
    </span>
  );
};
