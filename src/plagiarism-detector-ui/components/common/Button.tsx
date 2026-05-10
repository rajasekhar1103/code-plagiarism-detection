/**
 * Button Component
 * Reusable button with different variants
 */

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  disabled,
  ...props
}) => {
  const variantClass = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  const sizeClass = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${variantClass[variant]} ${sizeClass[size]} rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="animate-spin">⚙️</span>}
      {children}
    </button>
  );
};
