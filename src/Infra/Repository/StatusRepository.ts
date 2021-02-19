import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { IStatusRepository, IStatus } from "../../domain/Interfaces";
import { StatusEntity } from "../database/entity/StatusEntity";

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
