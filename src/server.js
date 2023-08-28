const express = require("express");

const PostRouter = require("../src/routes/posts.router");

const app = express();

app.use(express.json());

app.use("/posts", PostRouter);

app.get("/", (request, response) => {
    response.json({
        message: "Koders APIv1"
    });
});

module.exports = app;