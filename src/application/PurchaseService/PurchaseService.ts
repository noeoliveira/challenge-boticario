import { injectable, inject } from "tsyringe";
import { Purchase } from "@domain/Entity";
import {
  IConsultantRepository,
  IPurchaseRepository,
  IStatusRepository,
} from "@domain/Interfaces/Repository";
import { AppError, DTOTransformers, TokenIOC } from "@shared";
import { PurchaseInput } from "./input/purchase.input";
import { IPurchaseService } from "./Interfaces/IPurchaseService";
import { PurchaseDTO } from "./output/purchase.output";

@injectable()
export class PurchaseService implements IPurchaseService {
  constructor(
    @inject(TokenIOC.PurcheseRepositoryToken)
    private purchaseRepository: IPurchaseRepository,
    @inject(TokenIOC.ConsultantRepositoryToken)
    private consultantRepository: IConsultantRepository,
    @inject(TokenIOC.StatusRepositoryToken)
    private statusRepository: IStatusRepository
  ) {}

  async save({ id_consultant, ...rest }: PurchaseInput): Promise<PurchaseDTO> {
    const [consultant, status] = await Promise.all([
      this.consultantRepository.findByCpf(id_consultant),
      this.statusRepository.findById(
        id_consultant === "15350946056" ? "2" : "1"
      ),
    ]);

    if (!consultant || !status) {
      throw new AppError("Consultant not exists");
    }

    let cashbackPercentage;

    if (rest.value < 1000) {
      cashbackPercentage = 10;
    } else if (rest.value >= 1000 && rest.value < 1500) {
      cashbackPercentage = 15;
    } else {
      cashbackPercentage = 20;
    }

    const purchase = new Purchase({
      ...rest,
      cashback_percentage: cashbackPercentage,
      cashback_value: Number(
        (rest.value * (cashbackPercentage / 100)).toFixed(2)
      ),
      consultant: consultant,
      status,
    });

    return DTOTransformers(
      await this.purchaseRepository.save(purchase),
      PurchaseDTO
    );
  }

  async findByCode(code: string): Promise<PurchaseDTO | undefined> {
    return DTOTransformers(
      await this.purchaseRepository.findByCode(code),
      PurchaseDTO
    );
  }
}
