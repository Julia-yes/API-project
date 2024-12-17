"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
class App {
    constructor(logger, UsersController) {
        this.app = (0, express_1.default)();
        this.port = 8000;
        this.logger = logger;
        this.UsersController = UsersController;
    }
    useRoutes() {
        this.app.use("/users", this.UsersController.router);
    }
    init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на localhost:${this.port}`);
    }
}
exports.App = App;
