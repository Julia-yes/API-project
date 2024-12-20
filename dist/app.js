"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./types/types");
let App = class App {
    constructor(logger, UsersController, ExceptionFilter) {
        this.logger = logger;
        this.UsersController = UsersController;
        this.ExceptionFilter = ExceptionFilter;
        this.app = (0, express_1.default)();
        this.port = 8000;
    }
    useRoutes() {
        this.app.use('/users', this.UsersController.router);
    }
    useExceptionFilter() {
        console.log('login errors');
        this.app.use(this.ExceptionFilter.catch.bind(this.ExceptionFilter));
    }
    init() {
        this.useRoutes();
        this.useExceptionFilter();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на localhost:${this.port}`);
    }
};
exports.App = App;
exports.App = App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IUsersController)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.IExceptionFilter)),
    __metadata("design:paramtypes", [Object, Object, Object])
], App);
//# sourceMappingURL=app.js.map