import { injectable, inject } from "tsyringe";
import { Consultant } from "@domain/Entity";
import { IConsultant, IConsultantRepository } from "@domain/Interfaces";
import { DTOTransformers, TokenIOC } from "@shared";
import { ConsultantInput } from "./input/consultant.input";
import { IConsultantService } from "./Interfaces/IConsultantService";
import { ConsultantDTO } from "./output/consultant.output";

@injectable()
export class ConsultantService implements IConsultantService {
  constructor(
    @inject(TokenIOC.ConsultantRepositoryToken)
    private consultantRepository: IConsultantRepository
  ) {}

  private async removedPassword(input: IConsultant) {
    if (!input) {
      return input;
    }
    const { password, ...rest } = input;

    return rest;
  }

  async save(data: ConsultantInput): Promise<ConsultantDTO> {
    const consultant = new Consultant(data);

    return DTOTransformers(
      await this.consultantRepository.save(consultant),
      ConsultantDTO
    );
  }

  async findByCpf(cpf: string): Promise<ConsultantDTO | undefined> {
    return DTOTransformers(
      await this.consultantRepository.findByCpf(cpf),
      ConsultantDTO
    );
  }
}
