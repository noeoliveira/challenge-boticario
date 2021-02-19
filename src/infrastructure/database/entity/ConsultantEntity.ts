import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { IConsultant } from "../../../domain/Interfaces";
import { PurchaseEntity } from "./PurchaseEntity";

@Entity(ConsultantEntity.relationTable)
export class ConsultantEntity implements IConsultant {
  static readonly relationTable = "consultant";

  @PrimaryColumn({ unique: true })
  public cpf!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => PurchaseEntity, (purchases) => purchases.consultant)
  purchases?: PurchaseEntity[];

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;
}
