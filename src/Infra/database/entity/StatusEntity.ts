import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { IConsultant, IStatus } from "../../../domain/Interfaces";
import { PurchaseEntity } from "./PurchaseEntity";

@Entity(StatusEntity.relationTable)
export class StatusEntity implements IStatus {
  static readonly relationTable = "status";

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @OneToMany(() => PurchaseEntity, (purchases) => purchases.status)
  purchases?: PurchaseEntity[];

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;
}
