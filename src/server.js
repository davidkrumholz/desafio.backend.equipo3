const express = require("express");

const authRouter = require("./routes/auth.router");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (request, response) => {
    response.json({
        message: "Koders APIv1"
    });
});

module.exports = app;