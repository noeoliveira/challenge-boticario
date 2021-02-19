import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { IPurchaseRepository, IPurchase } from "../../domain/Interfaces";
import { AppError } from "../../shared";
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

  findAll(id_consultant?: string): Promise<IPurchase[]> {
    let where;
    if (id_consultant) {
      where = { consultant: { cpf: id_consultant } };
    }
    return this.repository.find({
      where,
      relations: [ConsultantEntity.relationTable, StatusEntity.relationTable],
    });
  }

  update(code: string, purchase: Partial<IPurchase>): Promise<IPurchase> {
    return this.repository.save(purchase);
  }

  async delete(code: string): Promise<IPurchase[]> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .whereInIds(code)
      .select(["code_purchase"])
      .execute();
  }
}
