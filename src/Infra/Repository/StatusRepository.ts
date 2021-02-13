import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { IStatus } from "../../domain/Interfaces/Entity";
import { IStatusRepository } from "../../domain/Interfaces/Repository";
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
