import { DependencyContainer } from "tsyringe";
import { IAuthService, AuthService } from "../../../application/AuthService";
import {
  IConsultantService,
  ConsultantService,
} from "../../../application/ConsultantService";
import {
  IPurchaseService,
  PurchaseService,
} from "../../../application/PurchaseService";
import { TokenIOC } from "../../../shared";

export const applicationRegistration = (container: DependencyContainer) => {
  container.register<IConsultantService>(
    TokenIOC.ConsultantServiceToken,
    ConsultantService
  );

  container.register<IPurchaseService>(
    TokenIOC.PurchaseServiceToken,
    PurchaseService
  );

  container.register<IAuthService>(TokenIOC.AuthServiceToken, AuthService);
};
