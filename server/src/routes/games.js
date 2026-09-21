const express = require("express");
const {
    getGames,
    getGameToday,
    getSpecificGame,
    createGame
} = require("../controllers/game.controller");

const router = express.Router();

router.get("/", getGames);
router.get("/daily", getGameToday);
router.get("/:date", getSpecificGame);

router.post("/", createGame);

module.exports = router;