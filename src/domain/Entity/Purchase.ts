import { Consultant, Status } from ".";
import { IPurchase } from "../Interfaces";

export class Purchase implements IPurchase {
  constructor(data: IPurchase) {
    Object.assign(this, data);
  }

  code_purchase!: string;

  value!: number;

  date_purchase!: Date;

  cashback_percentage!: number;

  cashback_value!: number;

  consultant!: Consultant;

  status!: Status;
}
