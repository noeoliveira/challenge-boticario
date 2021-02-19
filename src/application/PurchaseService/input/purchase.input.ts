import { IsNumber, IsString, IsPositive, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { IPurchase } from "../../../domain/Interfaces";

export class PurchaseInput
  implements
    Omit<
      IPurchase,
      "consultant" | "cashback_percentage" | "cashback_value" | "status"
    > {
  @IsString()
  id_consultant!: string;

  @IsString()
  code_purchase!: string;

  @IsNumber()
  @IsPositive()
  value!: number;

  @Type(() => Date)
  @IsDate()
  date_purchase!: Date;
}
