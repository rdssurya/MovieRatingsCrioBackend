const movieService = require("../services/movieServices");

const addMovie = async (req, res) => {
    try{
        const movieData = req.body;
        const movie = await movieService.addMovie(movieData);
        res.status(201).json({
            message: "Movie added successfully",
            movieId: movie._id
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

const getAllMovies = async (req, res) => {
    try {
        const result = await movieService.getAllMovies();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await movieService.getMovie(movieId);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await movieService.deleteMovie(movieId);
        if(movie){
            res.status(204).json({message:"Movie deleted successfully"});
        }
        else{
            throw new Error("Movie doesn't exist.");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateMovie = async (req, res) => {
    try {
        if(!req.body){
            throw new Error("Provide details to update.");
        }
        const fieldsToUpdate = req.body;
        const movieId = req.params.id;
        const movie = await movieService.updateMovie(movieId, fieldsToUpdate);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const addReviewToMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const review = req.body.review;
        const movie = await movieService.addReviewToMovie(movieId, review);
        res.status(201).json({
            message: "Review added successfully",
            movieId: movie._id
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getAllReviews = async (req, res) => {
    try {
        const movieId = req.params.id;
        const reviews = await movieService.getAllReviews(movieId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getAvgRating = async (req, res) => {
    try {
        const movieId = req.params.id;
        const avgRating = await movieService.getAvgRating(movieId);
        res.status(200).json({averageRating: avgRating});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteReview = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const reviewId = req.params.reviewId;
        const movie = await movieService.deleteReview(movieId, reviewId);
        if(movie){
            res.status(204).json({message:"Review deleted successfully"});
        }
        else{
            throw new Error("Movie or Review doesn't exist.");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateReview = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const reviewId = req.params.reviewId;
        const fieldsToUpdate = req.body.review;
        const movie = await movieService.updateReview(movieId, reviewId, fieldsToUpdate);
        if(movie){
            res.status(200).json(movie);
        }
        else{
            throw new Error("Movie or Review doesn't exist.");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {addMovie, getMovie, deleteMovie, getAllMovies, updateMovie, addReviewToMovie, getAvgRating, getAllReviews, deleteReview, updateReview}