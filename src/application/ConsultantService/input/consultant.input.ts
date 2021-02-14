import { IsEmail, IsString } from "class-validator";
import { IConsultant } from "@domain/Interfaces";
import { IsCPF } from "@shared";

export class ConsultantInput implements Omit<IConsultant, "purchases"> {
  @IsCPF()
  cpf!: string;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
