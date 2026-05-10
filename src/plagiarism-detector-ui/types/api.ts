/**
 * API Response Types
 */

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
