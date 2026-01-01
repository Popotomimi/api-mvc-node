"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5433,
    username: "apiuser",
    password: "api123",
    database: "mydb",
    synchronize: true,
    logging: true,
    entities: [User_1.User],
});
//# sourceMappingURL=data-source.js.map