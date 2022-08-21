class ReviewsController{
    async list(req, res){
        console.log(req.query)
        return res.send("From controller...");
    }
}

module.exports = ReviewsController;