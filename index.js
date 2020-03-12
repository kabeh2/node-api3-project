// code away!
const debug = require("debug")("app:dev");
const logger = require("./middleware/logger");
const helmet = require("helmet");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// middlewares
if (app.get("env") === "development") {
  debug("Morgan Logging enabled...");
  app.use(logger);
}

// Routes
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => debug(`Listening on port ${port}...`));
