const express = require("express");
const postUseCase = require("../usecases/posts.usecase");

const router = express.Router();

router.get("/", async (request, response) => {
    const filterTitle = request.query.title; 
    try {
        const allPosts = await postUseCase.getAll(filterTitle);
        response.json({
            message: "posts list",
            data: {
                posts: allPosts
            }
        });
    } catch (error) {
        response.status(500);
        response.json({
            message: "Something went wrong",
            error: error.message,
        });
    }
});

router.post("/", async (request, response) => {
    try {
        const data = request.body;
        const postCreated = await postUseCase.create(data);
        response.status(201);
        response.json({
            message: "post created",
            data: {
                post: postCreated
            },
        });
    } catch (error) {
        const status = error.name === "ValidationError" ? 400 : 500;
        response.status(error.status || status);
        response.json({
            message: "Something went wrong",
            error: error.message
        });
    }
})

router.delete("/:id", async (request, response) => {
    try {
        const postId = request.params.id;
        const post = await postUseCase.deleteById(postId);
        response.json({
            message: "Post deleted correctly",
            data: {
                post: post
            }
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            message: "Something went wrong",
            error: error.message,
        });
    } 
});

router.patch("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const data = request.body;

        const postUpdated = await postUseCase.uptdateById(id, data);
        
        response.json({
            message: "Post updated",
            data: {
                post: postUpdated
            },
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            message: "something went wrong",
            error: error.message
        });
    }
});

module.exports = router;