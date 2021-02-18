import { DependencyContainer } from "tsyringe";
import {
  ConsultantService,
  IConsultantService,
} from "@application/ConsultantService/";
import {
  IPurchaseService,
  PurchaseService,
} from "@application/PurchaseService";
import { AuthService, IAuthService } from "@application/AuthService";
import { TokenIOC } from "@shared";

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
