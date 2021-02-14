import { IStatusRepository, IStatus } from "@domain/Interfaces";
import { StatusEntity } from "@infra/database/entity/StatusEntity";
import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";

@injectable()
export class StatusRepository implements IStatusRepository {
  private repository: Repository<StatusEntity>;
  constructor() {
    this.repository = getRepository(StatusEntity);
  }
  findById(id: string): Promise<IStatus | undefined> {
    return this.repository.findOne(id);
  }
}
