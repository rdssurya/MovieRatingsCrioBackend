const {Movie, Review} = require("../models/Movie");

const addMovie = async(movieData) => {
    try {
        const { title } = movieData;
        const isAlreadyExists = await Movie.findOne({title});
        if(isAlreadyExists){
            throw new Error("Movie already exists.");
        }
        const movie = new Movie(movieData);
        await movie.save();
        return movie;
    } catch (error) {
        throw error;
    }
};

const getMovie = async (movieId) => {
    try {
        const movie = await Movie.findById({ _id: movieId });
        return movie;
    } catch (error) {
        throw new Error("Movie doesn't exist.");
    }
};

const getAllMovies = async () => {
    try {
        const movies = await Movie.find();
        return movies;
    } catch (error) {
        throw error;
    }
}

const deleteMovie = async (movieId) => {
    try {
        const movie = await Movie.findById({ _id: movieId });
        if(movie){
            await Movie.deleteOne({_id: movieId});
            return movie;
        }
        else{
            return null;
        }
    } catch (error) {
        throw new Error("Movie doesn't exist.");
    }
};

const updateMovie = async (movieId, fieldsToUpdate) => {
    try {
        const movie = await Movie.findById({_id: movieId});
        for(let key of Object.keys(fieldsToUpdate)){
            movie[key] = fieldsToUpdate[key];
        }
        await movie.save();
        return movie;
    } catch (error) {
        throw new Error("Movie doesn't exist.");
    }
};

const addReviewToMovie = async (movieId, reviewData) => {
    try {
        const movie = await Movie.findById({_id: movieId});
        const review = await Review.create(reviewData);
        if(movie["reviews"]){
            const reviews = movie["reviews"];
            reviews.push(review);
            movie["reviews"] = reviews;
        }
        else{
            movie["reviews"] = [review];
        }
        await movie.save();
        return movie;
    } catch (error) {
        throw error;
    }
};

const getAllReviews = async (movieId) => {
    try {
        const movie = await Movie.findById({_id: movieId});
        return movie.reviews || [];
    } catch (error) {
        throw error;
    }
};

const getAvgRating = async (movieId) => {
    try {
        const movie = await Movie.findById({_id: movieId});
        if(!movie.reviews.length){return 0;}
        let length = 0;
        let rating = 0;
        movie.reviews.forEach((review) => {
            if(review.rating){
                rating += review.rating;
                length++;
            }}
        );
        return length == 0 ? 0 : rating / length;
    } catch (error) {
        throw error;
    }
};

const deleteReview = async (movieId, reviewId) => {
    try {
        const movie = await Movie.findById({ _id: movieId });
        if(movie){
            const reviews = movie.reviews;
            for(const index in reviews){
                if(reviews[index]._id == reviewId){
                    reviews.splice(index,1);
                    break;
                }
            }
            movie.reviews = reviews;
            await movie.save();
            return movie;
        }
        else{
            return null;
        }
    } catch (error) {
        throw error;
    }
};

const updateReview = async (movieId, reviewId, fieldsToUpdate) => {
    try {
        const movie = await Movie.findById({ _id: movieId });
        if(movie){
            let review;
            let index = -1;
            for(let ind in movie.reviews){
                if(movie.reviews[ind]._id == reviewId){
                    review = movie.reviews[ind];
                    index = ind;
                    break;
                }
            }
            if(index == -1){return null;}
            for(let key of Object.keys(fieldsToUpdate)){
                review[key] = fieldsToUpdate[key];
            }
            movie.reviews[index] = review;
            await movie.save();
            return movie;
        }
        else{
            return null;
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {addMovie, getMovie, deleteMovie, getAllMovies, updateMovie, addReviewToMovie, getAllReviews, getAvgRating, deleteReview, updateReview};