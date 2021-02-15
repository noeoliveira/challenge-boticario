import { IConsultantRepository, IConsultant } from "@domain/Interfaces";
import { ConsultantEntity } from "@infra/database/entity/ConsultantEntity";
import { injectable } from "tsyringe";
import { getConnection, getRepository, Repository } from "typeorm";

@injectable()
export class ConsultantRepository implements IConsultantRepository {
  constructor(
    private repository: Repository<ConsultantEntity> = getRepository(
      ConsultantEntity
    )
  ) {}

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
