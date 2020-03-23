export interface IRequest {
  key: string;
  user_account_key: string;
  voluntary_user_account_key: string;
  description: string;
  status: RequestStatus;
  evaluation: number;
  priority: number;
  latitude: string;
  longitude: string;
  created_at: Date;
  updated_at: Date;
}

export enum RequestStatus {
  searching = 1,
  cancelled = 2,
  accepted = 3,
  finished = 4
}