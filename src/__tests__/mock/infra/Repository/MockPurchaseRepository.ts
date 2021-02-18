import { IPurchaseRepository, IPurchase } from "@domain/Interfaces";
import { PurchaseEntity } from "@infra/database/entity/PurchaseEntity";
import { AppError } from "@shared";

export class MockPurchaseRepository implements IPurchaseRepository {
  private repository: PurchaseEntity[] = [];

  async save(data: IPurchase): Promise<IPurchase> {
    let purchase = this.repository.find(
      (item) => item.code_purchase === data.code_purchase
    );
    if (purchase) {
      throw new AppError("Duplicate code");
    }

    purchase = new PurchaseEntity();
    Object.assign(purchase, data);

    this.repository.push(purchase);

    return purchase;
  }

  async findByCode(code: string): Promise<IPurchase | undefined> {
    return this.repository.find((item) => item.code_purchase === code);
  }

  async findAll(id_consultant?: string): Promise<IPurchase[]> {
    if (id_consultant) {
      return this.repository.filter(
        (item) => item.consultant.cpf === id_consultant
      );
    }
    return this.repository;
  }

  async update(code: string, purchase: Partial<IPurchase>): Promise<IPurchase> {
    let position;

    const getPurchase = this.repository.find((item, i) => {
      position = i;
      return item.code_purchase === code;
    });
    if (!getPurchase) {
      throw new Error("Item not find");
    }
    const newPurchase = new PurchaseEntity();

    Object.assign(newPurchase, { ...getPurchase, ...purchase });
    if (position) {
      this.repository[position] = newPurchase;
    }

    return newPurchase;
  }

  async delete(code: string): Promise<IPurchase[]> {
    const result: IPurchase[] = [];
    this.repository = this.repository.filter((item) => {
      if (item.code_purchase !== code) {
        return true;
      }
      result.push(item);
      return false;
    });

    return result;
  }
}
