import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("allposts", (table) => {
    table.increments("id").primary();
    table.string("title", 200);
    table.string("imagePost", 250);
    table.string("content", 10000);
    table.string("authorPost", 100);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("allposts");
}

