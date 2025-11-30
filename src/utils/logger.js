import winston from "winston";
import fs from "fs";
import path from "path";

// Ensure logs folder exists
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }), // capture stack traces
    winston.format.splat(),
    winston.format.prettyPrint()            // human-readable JSON
  ),
  transports: [
    new winston.transports.Console(),      // console output for dev
    new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
    new winston.transports.File({ filename: path.join(logDir, "combined.log") })
  ],
});

export default logger;
