import dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import knex from "knex";
import passport from "koa-passport";
import serve from "koa-static";

import AuthController from "./controllers/auth/AuthController";
import UserKnexRepository from "./data/repositories/auth/UserKnexRepository";

// @ts-ignore is needed to import external file
import { databaseConfig } from "../knexfile";

import UserRepository from "./domain/repositories/auth/UserRepository";
import AuthValidator from "./controllers/auth/AuthValidator";
import BlogKnexRepository from "./data/repositories/blog/BlogKnexRepository";
import BlogController from "./controllers/blog/BlogController";
import BlogRepository from "./domain/repositories/blog/BlogRepository";

// Database
const knexConnection = knex(databaseConfig);

// Repositories
const userRepository: UserRepository = new UserKnexRepository(knexConnection);
const blogRepository: BlogRepository = new BlogKnexRepository(knexConnection);

const authValidator = new AuthValidator(
  userRepository,
  process.env.SECRET_KEY || ""
);

// Controllers
const authController = new AuthController(
  userRepository,
  process.env.CLIENT_HOST || "",
  authValidator
);

const blogController = new BlogController(blogRepository);

// Routes
const router = new Router()
  .prefix("/api")
  .use(authController.getRoutes())
  .use(blogController.getRoutes());

// ==== SERVER ==== //

const app = new Koa();

// Middlewares

app.use(json());
app.use(logger());
app.use(bodyParser());

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(router.routes());

// Development documentation
if (process.env.NODE_ENV === "development") {
  app.use(serve("./apidoc"));
  app.use((ctx) => {
    ctx.body = "API works";
  });
}

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server in running on ${process.env.SERVER_PORT}.`);
});
