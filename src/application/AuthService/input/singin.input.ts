import { IsString } from "class-validator";
import { IsCPF } from "@shared";

export class SingInInput {
  @IsCPF()
  cpf!: string;

  @IsString()
  password!: string;
}
