import { IsEmail, IsNumber, IsPositive, IsString } from "class-validator";
import { IConsultant } from "../../../domain/Interfaces/Entity";
import { IsCPF } from "../../../shared";

export class ConsultantInput implements IConsultant {
  @IsCPF()
  cpf!: string;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
