import { IConsultant } from "./IConsultant";
import { IStatus } from "./IStatus";

export interface IPurchase {
  code_purchase: string;
  value: number;
  date_purchase: Date;
  cashback_percentage: number;
  cashback_value: number;
  consultant: IConsultant;
  status: IStatus;
}
