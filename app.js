
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const uploadRoutes = require("./routes/upload.routes");
const errorMiddleware = require("./shared/middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", routes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use(errorMiddleware);

module.exports = app;
