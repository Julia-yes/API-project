import { NextFunction, Response, Request } from "express";
import { LoggerService } from "../logger/logger.service";
import { HTTPError } from "./http-error.class";
import { IExceptionFilter } from "./exception.interface";

export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HTTPError) {
      this.logger.error(`Ошибка в ${err.context}: ${err.statusCode}, ${err.message}`);
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`неизвестная ошибка, ${err.message}`);
      res.status(500).send(err.message);
    }
  }
}
