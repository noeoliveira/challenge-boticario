import { IPurchase, IStatus } from "@domain/Interfaces";
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { ConsultantEntity } from "./ConsultantEntity";
import { StatusEntity } from "./StatusEntity";

@Entity(PurchaseEntity.relationTable)
export class PurchaseEntity implements IPurchase {
  static readonly relationTable = "purchase";

  @PrimaryColumn({ unique: true })
  code_purchase!: string;

  @Column()
  value!: number;

  @Column()
  date_purchase!: Date;

  @Column()
  cashback_percentage!: number;

  @Column()
  cashback_value!: number;

  @ManyToOne(() => ConsultantEntity, (consultant) => consultant.purchases)
  consultant!: ConsultantEntity;

  @ManyToOne(() => StatusEntity, (status) => status.purchases)
  status!: IStatus;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;
}
