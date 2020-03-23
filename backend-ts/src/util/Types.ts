
export type Limit = number;
export type Offset = number;
export type Count = number;

export interface BaseOptions {
  transaction?: any;
  offset?: Offset;
  limit?: Limit;
}
