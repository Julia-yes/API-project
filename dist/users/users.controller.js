"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const base_controller_1 = require("../common/base.controller");
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
        this.ok(res, "login");
    }
    test(req, res, next) {
        this.ok(res, "test");
    }
}
exports.UsersController = UsersController;
