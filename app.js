const express = require("express");
const routes = require("./routes");
const logger = require("./shared/logger/logger");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const uploadRoutes = require("./routes/upload.routes");

const app = express();
const errorMiddleware = require("./shared/middleware/error.middleware");

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    creditials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", routes);
app.use("/api/upload", uploadRoutes);

const authRoutes = require("./modules/auth/auth.routes");
const adminRoutes = require("./modules/admin/admin.routes");

app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes)

app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

app.use(errorMiddleware);

module.exports = app;