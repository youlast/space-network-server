import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("users", (table) => {
    table.increments("id").primary();
    table.string("email", 200);
    table.string("username", 200);
    table.string("password_hash", 200);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
