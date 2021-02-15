import { IPurchaseRepository, IPurchase } from "@domain/Interfaces";
import { PurchaseEntity } from "@infra/database/entity/PurchaseEntity";

export class MockPurchaseRepository implements IPurchaseRepository {
  private repository: PurchaseEntity[] = [];

  async save(data: IPurchase): Promise<IPurchase> {
    let purchase = this.repository.find(
      (item) => item.code_purchase === data.code_purchase
    );
    if (purchase) {
      throw new Error("teste");
    }

    purchase = new PurchaseEntity();
    Object.assign(purchase, data);

    this.repository.push(purchase);

    return purchase;
  }

  async findByCode(code: string): Promise<IPurchase | undefined> {
    return this.repository.find((item) => item.code_purchase === code);
  }
}
