import { ConsultantInput } from "./input/consultant.input";
import { IConsultantService } from "./Interfaces/IConsultantService";
import { ConsultantDTO } from "./output/consultant.output";
import { injectable, inject } from "tsyringe";
import { Consultant } from "../../domain/Entity";
import { IConsultantRepository } from "../../domain/Interfaces";
import { TokenIOC, Utils } from "../../shared";
import { plainToClass } from "class-transformer";

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

    return plainToClass(
      ConsultantDTO,
      await this.consultantRepository.save(consultant)
    );
  }

  async findByCpf(cpf: string): Promise<ConsultantDTO | undefined> {
    return plainToClass(
      ConsultantDTO,
      await this.consultantRepository.findByCpf(Utils.formartCPFToNumber(cpf))
    );
  }
}
