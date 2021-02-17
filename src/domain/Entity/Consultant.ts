import { IConsultant } from "@domain/Interfaces";
import { hashSync, compareSync } from "bcryptjs";
import { Purchase } from ".";

export class Consultant implements IConsultant {
  constructor({ password, ...rest }: IConsultant) {
    Object.assign(this, rest);
    this.password = this.encryptPassword(password);
  }

  cpf!: string;

  name!: string;

  email!: string;

  password!: string;

  purchases?: Purchase[];

  private encryptPassword(value: string) {
    return hashSync(value);
  }

  public static comparePassword(value: string, hash: string) {
    return compareSync(value, hash);
  }
}
