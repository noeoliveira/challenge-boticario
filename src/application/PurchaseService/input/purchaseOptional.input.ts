import {
  IsNumber,
  IsString,
  IsPositive,
  IsDate,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { IPurchase } from "../../../domain/Interfaces";

export class PurchaseInput
  implements
    Omit<
      IPurchase,
      "consultant" | "cashback_percentage" | "cashback_value" | "status"
    > {
  @IsString()
  @IsOptional()
  id_consultant!: string;

  @IsString()
  @IsOptional()
  code_purchase!: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  value!: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date_purchase!: Date;
}
