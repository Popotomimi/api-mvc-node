"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const swagger_1 = require("./config/swagger");
(0, swagger_1.setupSwagger)(app_1.default);
app_1.default.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log("Swagger docs at http://localhost:3000/api-docs");
});
//# sourceMappingURL=server.js.map