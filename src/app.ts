import { Server } from "http";
import express, { Express } from "express";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  UsersController: UsersController;
  ExceptionFilter: ExceptionFilter;

  constructor(
    logger: LoggerService,
    UsersController: UsersController,
    ExceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.UsersController = UsersController;
    this.ExceptionFilter = ExceptionFilter;
  }

  useRoutes() {
    this.app.use("/users", this.UsersController.router);
  }

  useExceptionFilter() {
    console.log("login errors");
    this.app.use(this.ExceptionFilter.catch.bind(this.ExceptionFilter));
  }

  public init() {
    this.useRoutes();
    this.useExceptionFilter();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на localhost:${this.port}`);
  }
}
