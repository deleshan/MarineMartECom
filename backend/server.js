const app = require("./app");
const connectDatabase = require("./config/database");


connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("shutting down the server due to un handled rejection error");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("shutting down the server due to un catch exception error");
  server.close(() => {
    process.exit(1);
  });
});
