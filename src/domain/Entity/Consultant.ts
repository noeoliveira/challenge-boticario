import { AutoValidator, IsCPF } from "@shared";
import { IsEmail, IsString } from "class-validator";
import { IConsultant } from "@domain/Interfaces";
import { hashSync, compareSync } from "bcryptjs";
import { Purchase } from ".";

@AutoValidator
export class Consultant implements IConsultant {
  constructor({ password, ...rest }: IConsultant) {
    Object.assign(this, rest);
    this.password = this.encryptPassword(password);
  }
  @IsCPF()
  cpf!: string;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  password!: string;

  purchases?: Purchase[];

  private encryptPassword(value: string) {
    return hashSync(value);
  }

  public comparePassword(value: string) {
    return compareSync(this.password, value);
  }
}
