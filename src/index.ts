import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";

async function main() {
  const logger = new LoggerService();
  const app = new App(logger, new UsersController(logger), new ExceptionFilter(logger));
  await app.init();
}

main();
