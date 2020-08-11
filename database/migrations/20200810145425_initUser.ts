import * as Knex from "knex";
import { UserRoles } from "../../src/app.roles";


export async function up(knex: Knex): Promise<void> {
  try {
    // await knex.schema.dropTableIfExists('knex_migrations');
    const isExisting = await knex.schema.hasTable('user');
    if (!isExisting)
      await knex.schema.createTable("user", table => {
        table
          .increments('id')
          .unsigned()
          .primary();

        table
          .string('username')
          .unique()
          .notNullable();

        table.string('first_name');
        table.string('last_name');
        table
          .string('email')
          .unique()
          .notNullable();
        table.string('address');
        table.date('birth_date');

        table
          .enum('roles', Object.keys(UserRoles).map(k => UserRoles[k]))
          .defaultTo(UserRoles.USER)

        table
          .string('password')
          .notNullable();

        table
          .string('salt')
          .notNullable();
      })
  } catch (error) {
    console.log(error);
  }
}


export async function down(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.dropTable('user')
  ])
}

