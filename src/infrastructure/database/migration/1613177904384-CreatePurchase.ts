import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePurchase1613177904384 implements MigrationInterface {
    name = 'CreatePurchase1613177904384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase" ("code_purchase" varchar PRIMARY KEY NOT NULL, "value" integer NOT NULL, "date_purchase" datetime NOT NULL, "cashback_percentage" integer NOT NULL, "cashback_value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "consultantCpf" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_purchase" ("code_purchase" varchar PRIMARY KEY NOT NULL, "value" integer NOT NULL, "date_purchase" datetime NOT NULL, "cashback_percentage" integer NOT NULL, "cashback_value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "consultantCpf" varchar, CONSTRAINT "FK_77e67e6ce879a313e2df2871f63" FOREIGN KEY ("consultantCpf") REFERENCES "consultant" ("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_purchase"("code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf") SELECT "code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf" FROM "purchase"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`ALTER TABLE "temporary_purchase" RENAME TO "purchase"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" RENAME TO "temporary_purchase"`);
        await queryRunner.query(`CREATE TABLE "purchase" ("code_purchase" varchar PRIMARY KEY NOT NULL, "value" integer NOT NULL, "date_purchase" datetime NOT NULL, "cashback_percentage" integer NOT NULL, "cashback_value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "consultantCpf" varchar)`);
        await queryRunner.query(`INSERT INTO "purchase"("code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf") SELECT "code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf" FROM "temporary_purchase"`);
        await queryRunner.query(`DROP TABLE "temporary_purchase"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
    }

}
