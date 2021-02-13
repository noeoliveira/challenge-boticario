import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyConsultant1613243970941 implements MigrationInterface {
    name = 'ModifyConsultant1613243970941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_consultant" ("cpf" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_consultant"("cpf", "name", "email", "password", "created_at", "updated_at") SELECT "cpf", "name", "email", "password", "created_at", "updated_at" FROM "consultant"`);
        await queryRunner.query(`DROP TABLE "consultant"`);
        await queryRunner.query(`ALTER TABLE "temporary_consultant" RENAME TO "consultant"`);
        await queryRunner.query(`CREATE TABLE "temporary_consultant" ("cpf" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_e2e29a38c71b536dec4a439bd6e" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_consultant"("cpf", "name", "email", "password", "created_at", "updated_at") SELECT "cpf", "name", "email", "password", "created_at", "updated_at" FROM "consultant"`);
        await queryRunner.query(`DROP TABLE "consultant"`);
        await queryRunner.query(`ALTER TABLE "temporary_consultant" RENAME TO "consultant"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultant" RENAME TO "temporary_consultant"`);
        await queryRunner.query(`CREATE TABLE "consultant" ("cpf" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "consultant"("cpf", "name", "email", "password", "created_at", "updated_at") SELECT "cpf", "name", "email", "password", "created_at", "updated_at" FROM "temporary_consultant"`);
        await queryRunner.query(`DROP TABLE "temporary_consultant"`);
        await queryRunner.query(`ALTER TABLE "consultant" RENAME TO "temporary_consultant"`);
        await queryRunner.query(`CREATE TABLE "consultant" ("cpf" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "consultant"("cpf", "name", "email", "password", "created_at", "updated_at") SELECT "cpf", "name", "email", "password", "created_at", "updated_at" FROM "temporary_consultant"`);
        await queryRunner.query(`DROP TABLE "temporary_consultant"`);
    }

}
