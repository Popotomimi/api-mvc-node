"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./database/data-source");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
data_source_1.AppDataSource.initialize()
    .then(() => console.log("DB connected"))
    .catch((err) => console.error(err));
app.use("/users", userRoutes_1.default);
app.use("/chat", chatRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map