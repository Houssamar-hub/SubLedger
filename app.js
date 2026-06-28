const express = require("express");

const userRoutes = require("./routes/user.route");
const subRoutes = require("./routes/sub.route");
const adminRoutes = require("./routes/admin.route");

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/subscriptions", subRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

module.exports = app;
