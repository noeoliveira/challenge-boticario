import { DependencyContainer } from "tsyringe";
import {
  ConsultantService,
  IConsultantService,
} from "../../../application/ConsultantService/";

export const applicationRegistration = (container: DependencyContainer) => {
  container.register<IConsultantService>(
    "ConsultantService",
    ConsultantService
  );
};
