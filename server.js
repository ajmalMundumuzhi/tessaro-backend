require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 5000;
const logger = require("./shared/logger/logger");
const connectDB = require("./shared/config/connection");

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        })
    })
    .catch((err) => {
        logger.error(`Failed to connect to the database: ${err.message}`);
    })