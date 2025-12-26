import app from "./app";
import { setupSwagger } from "./config/swagger";

setupSwagger(app);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Swagger docs at http://localhost:3000/api-docs");
});
