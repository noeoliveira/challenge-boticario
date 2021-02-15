import { Consultant } from "@domain/Entity";
import { IConsultant, IConsultantRepository } from "@domain/Interfaces";
import { DTOTransformers, TokenIOC, Utils } from "@shared";
import { ConsultantInput } from "./input/consultant.input";
import { IConsultantService } from "./Interfaces/IConsultantService";
import { ConsultantDTO } from "./output/consultant.output";
import { injectable, inject } from "tsyringe";

@injectable()
export class ConsultantService implements IConsultantService {
  constructor(
    @inject(TokenIOC.ConsultantRepositoryToken)
    private consultantRepository: IConsultantRepository
  ) {}

  async save({ cpf, ...rest }: ConsultantInput): Promise<ConsultantDTO> {
    const consultant = new Consultant({
      cpf: Utils.formartCPFToNumber(cpf),
      ...rest,
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
