import { Exclude, Type } from "class-transformer";
import {
  IsString,
  IsEmail,
  IsISO8601,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { IConsultant } from "@domain/Interfaces";
import { IsCPF } from "@shared";
import { PurchaseDTO } from "@application/PurchaseService";

export class ConsultantDTO implements IConsultant {
  constructor(data: Partial<Omit<IConsultant, "password">>) {
    Object.assign(this, data);
  }

  @Exclude()
  password!: string;

  @Type(() => PurchaseDTO)
  @IsOptional()
  @ValidateNested({ each: true })
  purchases?: PurchaseDTO[];

  @IsCPF()
  cpf!: string;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsISO8601()
  created_at!: Date;

  @IsISO8601()
  updated_at!: Date;
}
