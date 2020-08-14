import Router from "koa-router";

export default interface BaseController {
  getRoutes: Router.IMiddleware;
}
