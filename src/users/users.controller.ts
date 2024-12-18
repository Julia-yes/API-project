import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { HTTPError } from "../errors/http-error.class";

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      {
        path: "/login",
        func: this.login,
        method: "get",
      },
      {
        path: "/test",
        func: this.test,
        method: "post",
      },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, "login error", "login"));
  }

  test(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "test");
  }
}
