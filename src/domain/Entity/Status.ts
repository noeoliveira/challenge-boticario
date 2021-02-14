import { IStatus } from "@domain/Interfaces";
import { AutoValidator } from "@shared";
import { IsNumber, IsPositive, IsString } from "class-validator";

@AutoValidator
export class Status implements Omit<IStatus, "id"> {
  constructor(data: Partial<Omit<IStatus, "id">>) {
    Object.assign(this, data);
  }

  @IsNumber()
  @IsPositive()
  id!: number;

  @IsString()
  description!: string;
}
