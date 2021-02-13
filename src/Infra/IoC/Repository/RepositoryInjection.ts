import { DependencyContainer } from "tsyringe";
import {
  IConsultantRepository,
  IPurchaseRepository,
} from "../../../domain/Interfaces/Repository";
import { TokenIOC } from "../../../shared";
import { ConsultantRepository, PurchaseRepository } from "../../Repository/";

export const repositoryRegistration = (container: DependencyContainer) => {
  container.register<IConsultantRepository>(
    TokenIOC.ConsultantRepositoryToken,
    ConsultantRepository
  );

  container.register<IPurchaseRepository>(
    TokenIOC.PurcheseRepositoryToken,
    PurchaseRepository
  );
};
