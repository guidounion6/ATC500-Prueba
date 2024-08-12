const express = require("express")
const router = express.Router() 

const playersController = require("../controllers/players.controller")

router.post("/register", playersController.createPlayer)
router.get("/allPlayers", playersController.getPlayers)


module.exports = router