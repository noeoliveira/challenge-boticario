import { IPurchase } from "../Entity";

export interface IPurchaseRepository {
  save(purchase: IPurchase): Promise<IPurchase>;
  findByCode(code: string): Promise<IPurchase | undefined>;
}
