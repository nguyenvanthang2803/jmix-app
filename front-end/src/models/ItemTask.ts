export interface ItemTaskType {
  id: string;
  name: string;
  completedAt: string;
  createdAt: string;
  status: string;
  note: string;
  review: string;
  type: string;
}
export enum StatusEnum {
  STARTING = 'STARTING',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
