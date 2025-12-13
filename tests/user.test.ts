import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/database/data-source";
import { User } from "../src/models/User";

describe("User CRUD", () => {
  let userId: number;

  beforeAll(async () => {
    // Initialize database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    // Clear table before tests
    await AppDataSource.getRepository(User).clear();
  });

  afterAll(async () => {
    // Close database connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  it("should create a new user", async () => {
    const res = await request(app).post("/users").send({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
      phone: "999999999",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    userId = res.body.id;
  });

  it("should list users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); // ensures at least one user exists
  });

  it("should update a user", async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({ name: "Updated User" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User updated successfully");
  });

  it("should delete a user", async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });
});
