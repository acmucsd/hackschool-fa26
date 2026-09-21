const Game = require("../models/gameModel");

const getGames = async (req, res) => {
    const games = await Game.find().sort({ createdAt: -1 });
    if (games.length === 0)
        return res.status(404).json({ error: "Games not found." });
    res.json(games);
};

const getGameToday = async (req, res) => {
    const game = await Game.findOne().sort({ createdAt: -1 });
    if (!game)
        return res.status(404).json({ error: "Game not found." });
    res.json(game);
};

const getSpecificGame = async (req, res) => {
    const game = await Game.findOne({ date: req.params.date });
    if (!game)
        return res.status(404).json({ error: "Game not found." });
    res.json(game);
};

const createGame = async (req, res) => {
    const { word, gameMetric } = req.body;

    if (!word || !gameMetric)
        return res.status(400).json({ error: "Invalid Request." });

    const game = new Game({
        word: word,
        game_metric: gameMetric,
    });

    try {
        await game.save();
        res.status(201).json(game);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { getGames, getGameToday, getSpecificGame, createGame };