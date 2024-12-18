"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionFilter = void 0;
const http_error_class_1 = require("./http-error.class");
class ExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(err, req, res, next) {
        if (err instanceof http_error_class_1.HTTPError) {
            this.logger.error(`Ошибка в ${err.context}: ${err.statusCode}, ${err.message}`);
            res.status(err.statusCode).send({ err: err.message });
        }
        else {
            this.logger.error(`неизвестная ошибка, ${err.message}`);
            res.status(500).send(err.message);
        }
    }
}
exports.ExceptionFilter = ExceptionFilter;
