import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("allposts", (table) => {
    table.increments("id").primary();
    table.string("authorPost", 100);
    table.string("datePost", 100);
    table.string("title", 200);
    table.string("imagePost", 1000);
    table.string("content", 10000);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("allposts");
}
