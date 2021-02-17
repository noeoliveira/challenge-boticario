import { injectable, inject } from "tsyringe";
import { Purchase } from "@domain/Entity";
import {
  IConsultantRepository,
  IPurchaseRepository,
  IStatusRepository,
} from "@domain/Interfaces/Repository";
import { AppError, DTOTransformers, Errors, TokenIOC, Utils } from "@shared";
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

  private calculateValue(value: number, cashbackPercentage: number): number {
    return Number((value * (cashbackPercentage / 100)).toFixed(2));
  }

  private calculatePercentage(value: number) {
    let cashbackPercentage;
    if (value < 1000) {
      cashbackPercentage = 10;
    } else if (value >= 1000 && value < 1500) {
      cashbackPercentage = 15;
    } else {
      cashbackPercentage = 20;
    }
    return cashbackPercentage;
  }

  async save({ id_consultant, ...rest }: PurchaseInput): Promise<PurchaseDTO> {
    const cpf = Utils.formartCPFToNumber(id_consultant);
    const [consultant, status] = await Promise.all([
      this.consultantRepository.findByCpf(cpf),
      this.statusRepository.findById(cpf === "15350946056" ? "2" : "1"),
    ]);

    if (!consultant || !status) {
      throw new AppError("Consultant not exists", Errors.NOT_FOUND);
    }

    let cashbackPercentage = this.calculatePercentage(rest.value);

    const purchase = new Purchase({
      ...rest,
      cashback_percentage: cashbackPercentage,
      cashback_value: this.calculateValue(rest.value, cashbackPercentage),
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

  async findAll(id_consultant?: string): Promise<PurchaseDTO[]> {
    return DTOTransformers(
      await this.purchaseRepository.findAll(id_consultant),
      PurchaseDTO
    );
  }

  async update(
    code: string,
    { id_consultant, ...rest }: Partial<PurchaseInput>
  ): Promise<PurchaseDTO> {
    const cpf = id_consultant && Utils.formartCPFToNumber(id_consultant);
    let consultant;
    let status;

    if (cpf) {
      const [consultantResponse, statusResponse] = await Promise.all([
        this.consultantRepository.findByCpf(cpf),
        this.statusRepository.findById(cpf === "15350946056" ? "2" : "1"),
      ]);
      consultant = consultantResponse;
      status = statusResponse;

      if (!consultant) {
        throw new AppError("Consultant not exists", Errors.NOT_FOUND);
      }
    }

    let purchase = await this.purchaseRepository.findByCode(code);

    if (!purchase) {
      throw new AppError("Purchase not exists", Errors.NOT_FOUND);
    } else if (purchase.status.id === 2) {
      throw new AppError("Purchase cannot be updated", Errors.NOT_ACCEPTABLE);
    }

    let cashbackPercentage;

    if (rest.value) {
      cashbackPercentage = this.calculatePercentage(rest.value);
    }

    let cashback = {};

    if (cashbackPercentage && rest.value) {
      cashback = {
        cashback_percentage: cashbackPercentage,
        cashback_value: this.calculateValue(rest.value, cashbackPercentage),
      };
    }

    purchase = {
      ...purchase,
      ...rest,
      ...cashback,
      consultant: consultant ? consultant : purchase.consultant,
      status: status ? status : purchase.status,
    };

    return DTOTransformers(
      await this.purchaseRepository.update(code, purchase),
      PurchaseDTO
    );
  }

  async delete(code: string): Promise<PurchaseDTO[]> {
    let purchase = await this.purchaseRepository.findByCode(code);

    if (purchase && purchase.status.id === 2) {
      throw new AppError("Purchase cannot be deleted", Errors.NOT_ACCEPTABLE);
    }

    const purchaseDeleted = await this.purchaseRepository.delete(code);

    if (purchaseDeleted.length === 0) {
      throw new AppError("Purchase not deleted");
    }
    return DTOTransformers(purchaseDeleted, PurchaseDTO);
  }
}
