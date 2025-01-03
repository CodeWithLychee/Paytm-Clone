import { app } from "./app.js";
import { ConnectDb } from "./db/db.js";

ConnectDb()
  .then(() => {
    app.listen(process.env.PORT || 4000 || 8000, function () {
      console.log(`Server is listening on the PORT : ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.error(
      "Server may be currently down or something went wrong while connecting to the server"
    );
  });
