import Router from "koa-router";
import { ParameterizedContext } from "koa";

export default class BlogController {
  private readonly blogRepository: any;

  constructor(blogRepository: any) {
    this.blogRepository = blogRepository;
  }

  public getRoutes = (): Router.IMiddleware => {
    return (
      new Router()
        // General
        .get("/blog/posts", this.getAllPosts)
        .post("/blog/create_post", this.createPost)
        .routes()
    );
  };

  public createPost = async (ctx: ParameterizedContext): Promise<void> => {
    const { title, content, imagePost } = ctx.request.body;

    if (!title) ctx.throw(400, "Title has not been specified");

    if (!content) ctx.throw(400, "Content has not been specified");

    await this.blogRepository.createPost(content, imagePost, title);

    ctx.status = 200;
  };

  public getAllPosts = async (ctx: ParameterizedContext): Promise<void> => {
    const allPosts = await this.blogRepository.getAllPosts();

    if (allPosts) {
      ctx.response.body = allPosts;
      ctx.status = 200;
    } else {
      ctx.status = 400;
    }
  };
}
