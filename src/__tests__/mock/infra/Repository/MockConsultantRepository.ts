import {
  IConsultantRepository,
  IConsultant,
} from "../../../../domain/Interfaces";
import { ConsultantEntity } from "../../../../infra/database/entity/ConsultantEntity";
import { AppError } from "../../../../shared";

export class MockConsultantRepository implements IConsultantRepository {
  private repository: ConsultantEntity[] = [];

  async save(data: IConsultant): Promise<IConsultant> {
    let consultant = this.repository.find((item) => item.cpf === data.cpf);
    if (consultant) {
      throw new AppError("Email or CPF already exists");
    }

    consultant = new ConsultantEntity();
    Object.assign(consultant, data);

    this.repository.push(consultant);

    return consultant;
  }

  async findByCpf(cpf: string): Promise<IConsultant | undefined> {
    return this.repository.find((item) => item.cpf === cpf);
  }
}
