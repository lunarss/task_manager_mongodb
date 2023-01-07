const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const taskRoute = require("./routes").task;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

// connect to mongoDB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo Atlas");
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
app.use(
  "/api/tasks",
  passport.authenticate("jwt", { session: false }),
  taskRoute
);

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
