import Knex from "knex";
import BlogRepository from "../../../domain/repositories/blog/BlogRepository";
import BlogModel from "../../models/blog/BlogModel";

export default class BlogKnexRepository implements BlogRepository {
  private knex: Knex;

  public constructor(knex: Knex<BlogModel, Array<BlogModel>>) {
    this.knex = knex;
  }

  public getAllPosts = (): Promise<void> => {
    //@ts-ignore
    return this.knex("allposts").orderBy("id");
  };

  public createPost = async (
    content: string,
    imagePost: string,
    title: string,
    authorPost: string
  ): Promise<void> => {
    await this.knex("allposts").insert({
      title,
      imagePost,
      content,
      authorPost,
      datePost: new Date(),
    });
  };

  public updatePost = async (
    title: string,
    content: string,
    imagePost: string,
    idPost: string
  ): Promise<void> => {
    await this.knex("allposts").where({ id: idPost }).update({
      title,
      imagePost,
      content,
    });
  };

  public deletePost = async (idPost: string): Promise<void> => {
    await this.knex("allposts").where({ id: idPost }).delete();
  };
}
