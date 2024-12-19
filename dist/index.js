"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.appContainer = void 0;
const inversify_1 = require("inversify");
const app_1 = require("./app");
const exception_filter_1 = require("./errors/exception.filter");
const logger_service_1 = require("./logger/logger.service");
const users_controller_1 = require("./users/users.controller");
const types_1 = require("./types/types");
const appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService);
    bind(types_1.TYPES.IExceptionFilter).to(exception_filter_1.ExceptionFilter);
    bind(types_1.TYPES.IUsersController).to(users_controller_1.UsersController);
    bind(types_1.TYPES.Application).to(app_1.App);
});
function main() {
    const appContainer = new inversify_1.Container();
    appContainer.load(appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { appContainer, app };
}
_a = main(), exports.appContainer = _a.appContainer, exports.app = _a.app;
