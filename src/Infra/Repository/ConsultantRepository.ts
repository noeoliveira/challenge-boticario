import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { IConsultant } from "../../domain/Interfaces/Entity";
import { IConsultantRepository } from "../../domain/Interfaces/Repository/IConsultantRepository";
import { ConsultantEntity } from "../database/entity/ConsultantEntity";

@injectable()
export class ConsultantRepository implements IConsultantRepository {
  private repository: Repository<ConsultantEntity>;
  constructor() {
    this.repository = getRepository(ConsultantEntity);
  }

  async save(data: IConsultant): Promise<IConsultant> {
    const consultant = await this.repository.findOne(data.cpf);
    if (consultant) {
      throw new Error("teste");
    }
    const consultantCreate = this.repository.create(data);
    return this.repository.save(consultantCreate);
  }

  findByCpf(cpf: string): Promise<IConsultant | undefined> {
    return this.repository.findOne(cpf);
  }
}
