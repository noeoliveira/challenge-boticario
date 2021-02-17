import { PurchaseInput } from "../input/purchase.input";
import { PurchaseDTO } from "../output/purchase.output";

export interface IPurchaseService {
  save(purchase: PurchaseInput): Promise<PurchaseDTO>;
  findByCode(code: string): Promise<PurchaseDTO | undefined>;
  findAll(id_consultant?: string): Promise<PurchaseDTO[]>;
  update(code: string, purchase: Partial<PurchaseInput>): Promise<PurchaseDTO>;
  delete(code: string): Promise<PurchaseDTO[]>;
}
