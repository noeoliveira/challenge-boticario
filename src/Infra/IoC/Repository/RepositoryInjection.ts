import { DependencyContainer } from "tsyringe";
import { IConsultantRepository } from "../../../domain/Interfaces/Repository/IConsultantRepository";
import { ConsultantRepository } from "../../Repository/ConsultantRepository";

export const repositoryRegistration = (container: DependencyContainer) => {
  container.register<IConsultantRepository>(
    "ConsultantRepository",
    ConsultantRepository
  );
};
