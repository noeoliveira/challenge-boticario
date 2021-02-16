import { IPurchaseRepository, IPurchase } from "@domain/Interfaces";
import { ConsultantEntity } from "@infra/database/entity/ConsultantEntity";
import { PurchaseEntity } from "@infra/database/entity/PurchaseEntity";
import { StatusEntity } from "@infra/database/entity/StatusEntity";
import { AppError } from "@shared";
import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";

@injectable()
export class PurchaseRepository implements IPurchaseRepository {
  private repository: Repository<PurchaseEntity>;
  constructor() {
    this.repository = getRepository(PurchaseEntity);
  }

  async save(data: IPurchase): Promise<IPurchase> {
    const purchase = await this.repository.findOne(data.code_purchase);
    if (purchase) {
      throw new AppError("Duplicate code");
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
