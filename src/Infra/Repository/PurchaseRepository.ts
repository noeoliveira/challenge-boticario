import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { IPurchase } from "../../domain/Interfaces/Entity";
import { IPurchaseRepository } from "../../domain/Interfaces/Repository";
import { ConsultantEntity } from "../database/entity/ConsultantEntity";
import { PurchaseEntity } from "../database/entity/PurchaseEntity";
import { StatusEntity } from "../database/entity/StatusEntity";

@injectable()
export class PurchaseRepository implements IPurchaseRepository {
  private repository: Repository<PurchaseEntity>;
  constructor() {
    this.repository = getRepository(PurchaseEntity);
  }

  async save(data: IPurchase): Promise<IPurchase> {
    const purchase = await this.repository.findOne(data.code_purchase);
    if (purchase) {
      throw new Error("teste");
    }
    const purchaseCreate = this.repository.create(data);
    return this.repository.save(purchaseCreate);
  }

  findByCode(code: string): Promise<IPurchase | undefined> {
    return this.repository.findOne(code, {
      relations: [ConsultantEntity.relationTable, StatusEntity.relationTable],
    });
  }
}
