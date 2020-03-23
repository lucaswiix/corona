
export type Limit = number;
export type Offset = number;
export type Count = number;



export const DEFAULT_TIMEOUT = 30 * 1000; export interface BaseOptions {
  transaction?: any;
  offset?: Offset;
  limit?: Limit;
}
