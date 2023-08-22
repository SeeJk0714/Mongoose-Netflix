const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tvshowSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    premiere_year: {
        type: Number,
        required: true,
    },
    end_year: {
        type: Number,
        required: true,
    },
    seasons: {
        type: Number,
        required: true,
    },
    genre: {
        type: Array,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    }
});

const TVshow = model("Tvshow", tvshowSchema);
module.exports = TVshow;