import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { IConsultantRepository, IConsultant } from "../../domain/Interfaces";
import { AppError } from "../../shared";
import { ConsultantEntity } from "../database/entity/ConsultantEntity";

@injectable()
export class ConsultantRepository implements IConsultantRepository {
  private repository: Repository<ConsultantEntity>;
  constructor() {
    this.repository = getRepository(ConsultantEntity);
  }

  async save(data: IConsultant): Promise<IConsultant> {
    const consultant = await this.repository.findOne({
      where: [{ cpf: data.cpf }, { email: data.email }],
    });
    if (consultant) {
      throw new AppError("Email or CPF already exists");
    }
    const consultantCreate = this.repository.create(data);
    return this.repository.save(consultantCreate);
  }

  findByCpf(cpf: string): Promise<IConsultant | undefined> {
    return this.repository.findOne(cpf);
  }
}
