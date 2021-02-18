import { IStatus } from "../Entity";

export interface IStatusRepository {
  findById(id: string): Promise<IStatus | undefined>;
}
