const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req,res) => {
    const { id } = req.params;
    const { review, rating } = req.body;
    const foundCamp = await Campground.findById(id);
    const newReview = new Review({review, rating});
    newReview.author = `${req.user._id}`;
    await newReview.save();
    foundCamp.reviews.push(newReview);
    await foundCamp.save();
    req.flash('success', 'Successfully made a new review!');
    res.redirect(`/campgrounds/${foundCamp._id}`);
}

module.exports.deleteReview = async (req,res) => {
    const { id, reviewId } = req.params;
    // console.log(`id: ${id}, reviewId: ${reviewId}`);
    await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}