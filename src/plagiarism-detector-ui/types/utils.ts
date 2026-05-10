/**
 * Utility Types
 */

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T, R> = (arg: T) => Promise<R>;
export type Callback<T> = (value: T) => void;

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
