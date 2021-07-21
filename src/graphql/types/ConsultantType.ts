import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  ConsultantDTO,
  ConsultantInput,
} from "../../application/ConsultantService";

@ObjectType()
export class ConsultantType extends ConsultantDTO {
  @Field((type) => ID)
  cpf!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}

@InputType()
export class InputConsultant extends ConsultantInput {
  @Field()
  cpf!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
