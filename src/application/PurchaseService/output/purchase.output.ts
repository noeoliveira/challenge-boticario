import { ConsultantDTO } from "@application/ConsultantService";
import { IStatus, IPurchase } from "@domain/Interfaces";
import { Type } from "class-transformer";
import {
  IsString,
  IsISO8601,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsOptional,
  IsDate,
} from "class-validator";

class StatusDTO implements IStatus {
  constructor(data: Partial<IStatus>) {
    Object.assign(this, data);
  }

  @IsNumber()
  @IsPositive()
  id!: number;

  @IsString()
  description!: string;
}

export class PurchaseDTO implements Omit<IPurchase, "consultant"> {
  constructor(data: Partial<Omit<IPurchase, "consultant">>) {
    Object.assign(this, data);
  }
  @IsString()
  code_purchase!: string;

  @IsNumber()
  value!: number;

  @Type(() => Date)
  @IsDate()
  date_purchase!: Date;

  @IsNumber()
  @IsPositive()
  cashback_percentage!: number;

  @IsNumber()
  cashback_value!: number;

  @Type(() => ConsultantDTO)
  @IsOptional()
  @ValidateNested({ each: true })
  consultant!: ConsultantDTO;

  @Type(() => StatusDTO)
  @ValidateNested()
  status!: StatusDTO;
}
