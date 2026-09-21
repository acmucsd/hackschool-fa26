const mongoose = require("mongoose");

const gameDistributionSchema = mongoose.Schema({
    first: Number,
    second: Number,
    third: Number,
    fourth: Number,
    fifth: Number,
    sixth: Number
})

const gameMetricSchema = mongoose.Schema(
    {
        win_rate: Number, 
        avg_guess: Number, 
        game_distribution: gameDistributionSchema
    }
);

module.exports = gameMetricSchema; 