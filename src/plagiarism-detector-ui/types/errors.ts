/**
 * Error Types and Utilities
 */

export class PlagiarismDetectorError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "PlagiarismDetectorError";
  }
}

export class APIError extends PlagiarismDetectorError {
  constructor(message: string, details?: Record<string, any>) {
    super("API_ERROR", message, details);
    this.name = "APIError";
  }
}

export class ValidationError extends PlagiarismDetectorError {
  constructor(message: string, details?: Record<string, any>) {
    super("VALIDATION_ERROR", message, details);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends PlagiarismDetectorError {
  constructor(message: string = "Authentication failed") {
    super("AUTH_ERROR", message);
    this.name = "AuthenticationError";
  }
}
