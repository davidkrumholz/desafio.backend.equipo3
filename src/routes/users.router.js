const express = require("express");
const userUseCase = require("../usecases/users.usecase");

const router = express.Router();

router.post("/", async (request, response) => {
    try {
        const userCreated = await userUseCase.create(request.body);
        response.status(201);
        response.json({
            message: "User created",
            data: {
                user: userCreated
            },
        });
    } catch (error) {
        const status = error.name === "ValidationError" ? 400 : 500;
        response.status(error.status || status);
        response.json({
            message: "something went wrong",
            error: error.message,
        });
    }
});

router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const user = await userUseCase.getById(id);
        response.status(201);
        response.json({
            message: "user",
            data:  {
                user: user
            },
        });
    } catch(error) {
        const status = error.name === "ValidationError" ? 400 : 500;
        response.status(error.status || status);
        response.json({
            message: "something went wrong",
            error: error.message
        });
    }
});

module.exports = router;