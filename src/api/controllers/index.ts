import { AuthController } from "./auth.controller";
import { CashBackController } from "./cashback.controller";
import { ConsultantController } from "./consultant.controller";
import { PurchaseController } from "./purchase.controller";

export const controllers = [
  ConsultantController,
  PurchaseController,
  AuthController,
  CashBackController,
];
