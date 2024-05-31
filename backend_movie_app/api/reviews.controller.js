import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
    static async apiGetReviews(req, res, next) {
        try {
            const movieId = parseInt(req.params.id);
            const reviews = await ReviewsDAO.getReviewsByMovieId(movieId);
            if (!reviews) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(reviews);
        } catch (e) {
            console.error(`Unable to get reviews: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const review = await ReviewsDAO.getReview(reviewId);
            if (!review) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(review);
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiPostReview(req, res, next) {
        try {
            const { movieId, user, review } = req.body;
            const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);
            res.json(reviewResponse);
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const { user, review } = req.body;
            const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review);
            res.json(reviewResponse);
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
            res.json(reviewResponse);
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            res.status(500).json({ error: e });
        }
    }
}
