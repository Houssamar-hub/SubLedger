const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/SubLedger");
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("POST /users/register", () => {
  const fakeUserData = {
    name: `name-${Date.now()}`,
    email: `name-${Date.now()}@gmail.com`,
    password: "password14",
    role: "admin",
  };

  test("Inscription réussie", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send(fakeUserData);

    // Code HTTP
    expect(response.statusCode).toBe(201);

    // // Structure de la réponse
    expect(response.body).toHaveProperty("token");
  });

  test("Email déjà existant", async () => {
    // Essayer de créer un deuxième avec le même email
    const response = await request(app)
      .post("/api/users/register")
      .send(fakeUserData);

    // Code HTTP
    expect(response.status).toBe(400);

    // Structure de la réponse
    expect(response.body).toHaveProperty("message", "Email already exists");
  });
});

describe("POST /user/login", () => {
  const userData = {
    email: "ussama@example.com",
    password: "password14",
  };

  test("Connexion réussie", async () => {
    const response = await request(app).post("/api/users/login").send(userData);

    // Code HTTP
    expect(response.statusCode).toBe(200);

    // Structure de la réponse
    expect(response.body).toHaveProperty("token");
  });

  test("Mot de passe incorrect", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: userData.email,
      password: "wrongpassword",
    });

    // Code HTTP
    expect(response.status).toBe(400);

    // Structure de la réponse
    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });
});
