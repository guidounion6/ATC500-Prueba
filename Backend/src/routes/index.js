const express = require("express")

const usersRouter = require("./users.router")
const playersRouter = require("./players.router")

function routerApi(app) {
    const router = express.Router();
    app.use("/api/v1", router);
    router.use("/users", usersRouter);
    router.use("/players", playersRouter)
}

module.exports = routerApi