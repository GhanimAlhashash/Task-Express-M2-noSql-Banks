let accounts = require("./accounts");
const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./database");

const app = express();
const accountsRoutes = require("./api/accounts/accounts.routes");

app.use(express.json());
app.use("/accounts", accountsRoutes);

connectDb();
app.listen(8002, () => {
  console.log("The application is running on localhost:8002");
});
