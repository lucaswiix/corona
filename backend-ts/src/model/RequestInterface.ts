export interface IRequest {
  id: string;
  user_id: string;
  voluntary_id: string;
  status: RequestStatus;
  latitude: string;
  longitude: string;
  priority: number;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export enum RequestStatus {
  searching = 1,
  cancelled = 2,
  accepted = 3,
  finished = 4
}