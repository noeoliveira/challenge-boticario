import { DependencyContainer } from "tsyringe";
import {
  IConsultantRepository,
  IPurchaseRepository,
  IStatusRepository,
} from "@domain/Interfaces/Repository";
import { TokenIOC } from "@shared";
import {
  ConsultantRepository,
  PurchaseRepository,
  StatusRepository,
} from "@infra/Repository";

export const repositoryRegistration = (container: DependencyContainer) => {
  container.register<IConsultantRepository>(
    TokenIOC.ConsultantRepositoryToken,
    ConsultantRepository
  );

  container.register<IPurchaseRepository>(
    TokenIOC.PurcheseRepositoryToken,
    PurchaseRepository
  );

  container.register<IStatusRepository>(
    TokenIOC.StatusRepositoryToken,
    StatusRepository
  );
};
