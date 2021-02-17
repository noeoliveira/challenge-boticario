import { IPurchase } from "../Entity";

export interface IPurchaseRepository {
  save(purchase: IPurchase): Promise<IPurchase>;
  findByCode(code: string): Promise<IPurchase | undefined>;
  findAll(id_consultant?: string): Promise<IPurchase[]>;
  update(code: string, purchase: Partial<IPurchase>): Promise<IPurchase>;
  delete(code: string): Promise<IPurchase[]>;
}
