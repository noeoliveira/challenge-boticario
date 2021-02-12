import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IConsultant } from "../../../domain/Interfaces/Entity/IConsultant";

@Entity("consultant")
export class ConsultantEntity implements IConsultant {
  @PrimaryColumn({ unique: true })
  public cpf!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;
}
