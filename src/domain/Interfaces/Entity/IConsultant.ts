import { IPurchase } from "./IPurchase";

export interface IConsultant {
  cpf: string;
  name: string;
  email: string;
  password: string;
  purchases?: IPurchase[];
}
