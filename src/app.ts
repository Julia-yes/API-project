import { Server } from "http";
import express, { Express } from "express";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  UsersController: UsersController;

  constructor(logger: LoggerService, UsersController: UsersController) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.UsersController = UsersController;
  }

  useRoutes() {
    this.app.use("/users", this.UsersController.router);
  }

  public init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на localhost:${this.port}`);
  }
}
