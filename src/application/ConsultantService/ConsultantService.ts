import { Consultant } from "@domain/Entity";
import { IConsultantRepository } from "@domain/Interfaces";
import {
  AppError,
  DTOTransformers,
  env,
  Errors,
  TokenIOC,
  Utils,
} from "@shared";
import { ConsultantInput } from "./input/consultant.input";
import { IConsultantService } from "./Interfaces/IConsultantService";
import { ConsultantDTO } from "./output/consultant.output";
import { injectable, inject } from "tsyringe";
import jwt from "jsonwebtoken";

@injectable()
export class ConsultantService implements IConsultantService {
  constructor(
    @inject(TokenIOC.ConsultantRepositoryToken)
    private consultantRepository: IConsultantRepository
  ) {}

  async save({ cpf, ...rest }: ConsultantInput): Promise<ConsultantDTO> {
    const formatedCpf = Utils.formartCPFToNumber(cpf);
    const consultant = new Consultant({
      ...rest,
      cpf: formatedCpf,
    });

    return DTOTransformers(
      await this.consultantRepository.save(consultant),
      ConsultantDTO
    );
  }

  async findByCpf(cpf: string): Promise<ConsultantDTO | undefined> {
    return DTOTransformers(
      await this.consultantRepository.findByCpf(Utils.formartCPFToNumber(cpf)),
      ConsultantDTO
    );
  }
}
