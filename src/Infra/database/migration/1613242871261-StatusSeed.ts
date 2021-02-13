import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusSeed1613242871261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "status"("description") VALUES ("Em validação"),("Aprovado")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "status" where "description" in ("Em validação","Aprovado")`
    );
  }
}
