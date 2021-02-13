import { AutoValidator, IsCPF } from "../../shared";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";
import { IConsultant } from "../Interfaces/Entity/IConsultant";
import { hashSync, compareSync } from "bcryptjs";
import { Purchase } from "./Purchase";

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
