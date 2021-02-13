import { IsNumber, IsISO8601, IsString, IsPositive } from "class-validator";
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

  @IsISO8601()
  date_purchase!: Date;
}
