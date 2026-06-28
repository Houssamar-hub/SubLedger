const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/SubLedger");
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("GET subscriptions", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhM2VlZmYwNDVmZTk1MTQ1MTVjNzc3ZiIsImlhdCI6MTc4MjUwOTU1MiwiZXhwIjoxNzgzMTE0MzUyfQ.UHrXKLgnjMez6bjBw0sj-XW5Ank3FfpRoosSJ16CfK8";
  test("GET Subscriptions ", async () => {
    const response = await request(app)
      .get("/api/subscriptions")
      .set("Authorization", `Bearer ${token}`);

    // Code HTTP
    expect(response.statusCode).toBe(200);

    // Structure de la rÃ©ponse
    expect(Array.isArray(response.body)).toBe(true);
  });
});
