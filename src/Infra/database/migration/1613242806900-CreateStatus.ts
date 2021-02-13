import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStatus1613242806900 implements MigrationInterface {
    name = 'CreateStatus1613242806900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_purchase" ("code_purchase" varchar PRIMARY KEY NOT NULL, "value" integer NOT NULL, "date_purchase" datetime NOT NULL, "cashback_percentage" integer NOT NULL, "cashback_value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "consultantCpf" varchar, "statusId" integer, CONSTRAINT "FK_77e67e6ce879a313e2df2871f63" FOREIGN KEY ("consultantCpf") REFERENCES "consultant" ("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_purchase"("code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf") SELECT "code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf" FROM "purchase"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`ALTER TABLE "temporary_purchase" RENAME TO "purchase"`);
        await queryRunner.query(`CREATE TABLE "temporary_purchase" ("code_purchase" varchar PRIMARY KEY NOT NULL, "value" integer NOT NULL, "date_purchase" datetime NOT NULL, "cashback_percentage" integer NOT NULL, "cashback_value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "consultantCpf" varchar, "statusId" integer, CONSTRAINT "FK_77e67e6ce879a313e2df2871f63" FOREIGN KEY ("consultantCpf") REFERENCES "consultant" ("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8cda590ffa00d61f9c3d14e7b2e" FOREIGN KEY ("statusId") REFERENCES "status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_purchase"("code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf", "statusId") SELECT "code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf", "statusId" FROM "purchase"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`ALTER TABLE "temporary_purchase" RENAME TO "purchase"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" RENAME TO "temporary_purchase"`);
        await queryRunner.query(`CREATE TABLE "purchase" ("code_purchase" varchar PRIMARY KEY NOT NULL, "value" integer NOT NULL, "date_purchase" datetime NOT NULL, "cashback_percentage" integer NOT NULL, "cashback_value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "consultantCpf" varchar, "statusId" integer, CONSTRAINT "FK_77e67e6ce879a313e2df2871f63" FOREIGN KEY ("consultantCpf") REFERENCES "consultant" ("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "purchase"("code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf", "statusId") SELECT "code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf", "statusId" FROM "temporary_purchase"`);
        await queryRunner.query(`DROP TABLE "temporary_purchase"`);
        await queryRunner.query(`ALTER TABLE "purchase" RENAME TO "temporary_purchase"`);
        await queryRunner.query(`CREATE TABLE "purchase" ("code_purchase" varchar PRIMARY KEY NOT NULL, "value" integer NOT NULL, "date_purchase" datetime NOT NULL, "cashback_percentage" integer NOT NULL, "cashback_value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "consultantCpf" varchar, CONSTRAINT "FK_77e67e6ce879a313e2df2871f63" FOREIGN KEY ("consultantCpf") REFERENCES "consultant" ("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "purchase"("code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf") SELECT "code_purchase", "value", "date_purchase", "cashback_percentage", "cashback_value", "created_at", "updated_at", "consultantCpf" FROM "temporary_purchase"`);
        await queryRunner.query(`DROP TABLE "temporary_purchase"`);
        await queryRunner.query(`DROP TABLE "status"`);
    }

}
