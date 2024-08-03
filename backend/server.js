import dotenv from "dotenv";
import { app } from "./app.js";
import { ConnectDb } from "./db/db.js";

dotenv.config({ path: "./.env" });

ConnectDb()
  .then(() => {
    app.listen(process.env.PORT, function () {
      console.log(`Server is listening on the PORT : ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.error(
      "Server may be currently down or something went wrong while connecting to the server"
    );
  });
