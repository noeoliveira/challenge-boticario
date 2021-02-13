import { AutoValidator } from "../../shared";
import {
  IsNumber,
  IsISO8601,
  IsPositive,
  IsString,
  ValidateNested,
} from "class-validator";
import { IPurchase } from "../Interfaces/Entity/";
import { Consultant } from "./Consultant";
import { Status } from "./Status";

@AutoValidator
export class Purchase implements IPurchase {
  constructor(data: IPurchase) {
    Object.assign(this, data);
  }
  @IsString()
  code_purchase!: string;

  @IsNumber()
  @IsPositive()
  value!: number;

  @IsISO8601()
  date_purchase!: Date;

  @IsNumber()
  @IsPositive()
  cashback_percentage!: number;

  @IsNumber()
  cashback_value!: number;

  @ValidateNested()
  consultant!: Consultant;

  @ValidateNested()
  status!: Status;
}
