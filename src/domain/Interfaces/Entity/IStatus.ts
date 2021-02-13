import { IPurchase } from "./IPurchase";

export interface IStatus {
  id: number;
  description: string;
  purchases?: IPurchase[];
}
