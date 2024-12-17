"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.usersRouter = express_1.default.Router();
exports.usersRouter.use((res, req, next) => {
    console.log("Обработчик");
    next();
});
exports.usersRouter.get("./help", (req, res) => {
    console.log("help");
    res.send("Help");
});
exports.usersRouter.post("./test", (req, res) => {
    console.log("test");
    res.send("Test");
});
