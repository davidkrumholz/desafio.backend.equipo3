const express = require("express");
const userRouter = require("../src/routes/users.router");

const authRouter = require("./routes/auth.router");

const PostRouter = require("../src/routes/posts.router");

const app = express();

app.use(express.json());

app.use("/posts", PostRouter);

app.use("/auth", authRouter);

app.use("/users", userRouter);

app.get("/", (request, response) => {
    response.json({
        message: "Koders APIv1"
    });
});

module.exports = app;