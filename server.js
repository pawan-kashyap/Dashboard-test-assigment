require('dotenv').config();
const app = require('./app');
const log4js = require("log4js");
const PORT = process.env.PORT | 8080;
const {connectDB} = require('./config/db');
const {seedData} = require('./config/seedData')

//Handling uncaught exception
process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to uncaught exception.');
    process.exit(1);
});

const logger = log4js.getLogger();
logger.level = "debug";
// Initialize Logger
log4js.configure({
  appenders: {
    console: { type: "console" },
    file: {
      type: "file",
      filename: "log/api.log",
      maxLogSize: 512000,
      backups: 10,
    },
  },
  categories: { default: { appenders: ["console", "file"], level: "info" } },
});

//Connecting to database
connectDB();
seedData();

const server = app.listen(PORT,()=>{
    logger.info("Server started on port: " + PORT);
});

//Unhandled promise rejection
process.on('unhandledRejection',(err)=>{
    logger.error(`Error: ${err}`);
    logger.error(`Error Message: ${err.message}`);
    logger.info("Shutting down the server due to unhandled promise rejection.");
    server.close(()=>{
        process.exit(1);
    })
})
