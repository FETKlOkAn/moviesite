import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db("reviews").collection("reviews");
        } catch (e) {
            console.error(`Unable to establish collection handles in user DAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: parseInt(movieId),
                user: user,
                review: review,
            };

            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e };
        }
    }

    static async getReview(reviewId) {
        try {
            console.log(`Fetching review with id: ${reviewId}`);
            return await reviews.findOne({ _id: new ObjectId(reviewId) });
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user: user, review: review } }
            );
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e };
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
            });
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e };
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find({ movieId: movieId });
            const reviewsList = await cursor.toArray();
            
            return reviewsList;
        } catch (e) {
            console.error(`Unable to get reviews: ${e}`);
            return { error: e };
        }
    }
}
