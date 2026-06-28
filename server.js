require("dotenv").config();

const app = require("./app");

const connectDB = require("./config/db");

connectDB();

const PORT = 8000;
app.listen(PORT, "0.0.0.0", () =>
  console.log("Server running on port " + PORT),
);
