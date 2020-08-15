import Knex from "knex";
import BlogRepository from "../../../domain/repositories/blog/BlogRepository";
import BlogModel from "../../models/blog/BlogModel";

export default class BlogKnexRepository implements BlogRepository {
  private knex: Knex;

  public constructor(knex: Knex<BlogModel, Array<BlogModel>>) {
    this.knex = knex;
  }

  public getAllPosts = (): Promise<void> => {
    return this.knex("allposts");
  };

  public createPost = async (
    content: string,
    imagePost: string,
    title: string
  ): Promise<void> => {
    await this.knex("allposts").insert({
      title,
      imagePost,
      content,
    });
  };
}
