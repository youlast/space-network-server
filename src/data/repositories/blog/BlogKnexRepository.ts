import Knex from "knex";

export default class BlogKnexRepository {
  private knex: Knex;

  public constructor(knex: Knex<any, Array<any>>) {
    this.knex = knex;
  }

  public getAllPosts = () => {
    return this.knex("allposts");
  };

  public createPost = async (
    content: string,
    imagePost: string,
    title: string
  ) => {
    await this.knex("allposts").insert({
      title,
      imagePost,
      content,
    });
  };
}
