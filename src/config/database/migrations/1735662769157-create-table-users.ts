import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1735662769157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'email',
            type: 'text',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'text',
          },
          {
            name: 'avatar',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
