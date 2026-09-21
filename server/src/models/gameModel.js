const mongoose = require("mongoose");
const GameMetric = require("./gameMetricSchema");

const gameSchema = mongoose.Schema(
    {
        word: {
            type: String, 
            required: true
        },
        game_metric: {
            type: GameMetric,
            required: true
        },
        date: {
            type: Date, 
            default: Date.now
        }
    }, 
    {_id: true}
);

const Game = mongoose.model("Game", gameSchema, "games");

module.exports = Game; 