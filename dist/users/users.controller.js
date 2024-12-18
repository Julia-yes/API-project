"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const base_controller_1 = require("../common/base.controller");
const http_error_class_1 = require("../errors/http-error.class");
class UsersController extends base_controller_1.BaseController {
    constructor(logger) {
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
    login(req, res, next) {
        next(new http_error_class_1.HTTPError(401, "login error", "login"));
    }
    test(req, res, next) {
        this.ok(res, "test");
    }
}
exports.UsersController = UsersController;
