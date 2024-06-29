const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "Not Found",
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "",
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY || "",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "",
  PORT: process.env.PORT || "",
  SALT_WORK_FACTOR: process.env.SALT_WORK_FACTOR || "",
};
