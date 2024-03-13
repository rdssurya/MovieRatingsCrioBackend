const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number
        },
        review: {
            type: String
        }
    }
);

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true
        },
        genre: {
            type: String,
            required: true,
        },
        director: {
            type: String,
            required: true
        },
        releaseYear: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        reviews: {
            type: [reviewSchema]
        }
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model('Review', reviewSchema);
const Movie = mongoose.model("Movie", movieSchema);

module.exports = {Movie, Review};