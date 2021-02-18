import { PurchaseInput } from "../input/purchase.input";
import { CashBackDTO } from "../output/cashback.output";
import { PurchaseDTO } from "../output/purchase.output";

export interface IPurchaseService {
  save(purchase: PurchaseInput): Promise<PurchaseDTO>;
  findByCode(code: string): Promise<PurchaseDTO | undefined>;
  findAll(id_consultant?: string): Promise<PurchaseDTO[]>;
  update(code: string, purchase: Partial<PurchaseInput>): Promise<PurchaseDTO>;
  delete(code: string): Promise<PurchaseDTO[]>;
  cashback(cpf: string): Promise<CashBackDTO>;
}
