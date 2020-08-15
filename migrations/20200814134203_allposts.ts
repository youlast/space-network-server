import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("allposts", (table) => {
    table.increments("id").primary();
    table.string("title", 200);
    table.string("content", 200);
    table.string("imagePost", 200);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("allposts");
}
