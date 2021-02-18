import { IsNumber } from "class-validator";

export class CashBackDTO {
  constructor(data: Partial<{ credit: number }>) {
    Object.assign(this, data);
  }

  @IsNumber()
  credit!: number;
}
