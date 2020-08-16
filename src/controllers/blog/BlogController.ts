import Router from "koa-router";
import { ParameterizedContext } from "koa";
import BlogRepository from "../../domain/repositories/blog/BlogRepository";

export default class BlogController {
  private readonly blogRepository: BlogRepository;

  constructor(blogRepository: BlogRepository) {
    this.blogRepository = blogRepository;
  }

  public getRoutes = (): Router.IMiddleware => {
    return (
      new Router()
        // General
        .get("/blog/posts", this.getAllPosts)
        .post("/blog/create_post", this.createPost)
        .put("/blog/update_post", this.updatePost)
        .routes()
    );
  };

  /**
   * @api {post} /api/blog/signup /api/blog/create_post
   * @apiGroup blog
   *
   * @apiParam {string} title
   * @apiParam {string} content
   * @apiParam {string} imagePost
   *
   
   * @apiErrorExample {json} Error-Response:
   * 1) Title has not been specified
   * 2) Content has not been specified
   */

  public createPost = async (ctx: ParameterizedContext): Promise<void> => {
    const { title, content, imagePost } = ctx.request.body;

    if (!title) ctx.throw(400, "Title has not been specified");

    if (!content) ctx.throw(400, "Content has not been specified");

    await this.blogRepository.createPost(content, imagePost, title);

    ctx.status = 200;
  };

  /**
   * @api {get} /api/blog/posts /api/blog/posts
   * @apiGroup blog
   *
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *  [
   *   {id:string,content:string,title:string,imageUrl:string}
   * ]
   *
   * @apiErrorExample {json} Error-Response:
   * 1) Posts not found
   */

  public getAllPosts = async (ctx: ParameterizedContext): Promise<void> => {
    const allPosts = await this.blogRepository.getAllPosts();

    //@ts-ignore
    if (allPosts) {
      ctx.response.body = allPosts;
      ctx.status = 200;
    } else {
      ctx.throw(400, "Posts not found");
    }
  };

  /**
   * @api {put} /api/blog/update_post /api/blog/update_post
   * @apiGroup blog
   *
   * @apiParam {string} title
   * @apiParam {string} content
   * @apiParam {string} imagePost
   * @apiParam {string} idPost
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   
   *
   * @apiErrorExample {json} Error-Response:
   * 1) Title has not been specified
   * 2) Content has not been specified
   * 3) IdPost has not been specified
   */

  public updatePost = async (ctx: ParameterizedContext): Promise<void> => {
    const { title, imagePost, content, idPost } = ctx.request.body;

    console.log(title);
    console.log(imagePost);
    console.log(content);

    if (!title) ctx.throw(400, "Title has not been specified");

    if (!content) ctx.throw(400, "Content has not been specified");

    if (!idPost) ctx.throw(400, "IdPost has not been specified");

    if (idPost) {
      await this.blogRepository.updatePost(title, content, imagePost, idPost);
    } else {
      ctx.throw(400, "IdPost has not been specified");
    }

    ctx.status = 200;
  };
}
