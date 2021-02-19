import { IStatus } from "../Interfaces";

export class Status implements Omit<IStatus, "id"> {
  constructor(data: Partial<Omit<IStatus, "id">>) {
    Object.assign(this, data);
  }

  id!: number;

  description!: string;
}
