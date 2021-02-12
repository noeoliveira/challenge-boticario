import { injectable, inject } from "tsyringe";
import { Consultant } from "../../domain/Entity/Consultant";
import { IConsultant } from "../../domain/Interfaces/Entity";
import { IConsultantRepository } from "../../domain/Interfaces/Repository/IConsultantRepository";
import { IConsultantService } from "./Interfaces/IConsultantService";

@injectable()
export class ConsultantService implements IConsultantService {
  constructor(
    @inject("ConsultantRepository")
    private consultantRepository: IConsultantRepository
  ) {}

  save(data: IConsultant): Promise<IConsultant> {
    const consultant = new Consultant(data);
    return this.consultantRepository.save(consultant);
  }
  findByCpf(cpf: string): Promise<IConsultant | undefined> {
    return this.consultantRepository.findByCpf(cpf);
  }
}
