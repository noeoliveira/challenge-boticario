import { Exclude } from "class-transformer";
import { IsString, IsEmail, IsDate } from "class-validator";
import { IConsultant } from "../../../domain/Interfaces/Entity";
import { IsCPF } from "../../../shared";

export class ConsultantDTO implements IConsultant {
  constructor(data: Partial<IConsultant> | undefined) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @IsCPF()
  cpf!: string;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @Exclude()
  password!: string;

  @IsDate()
  created_at!: Date;

  @IsDate()
  updated_at!: Date;
}
