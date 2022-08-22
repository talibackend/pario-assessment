const ReviewMedia = require("../models/ReviewMedia");
const auth = require("../helpers/auth");
const Review = require("../models/Review");

class ReviewsController{
    async list(req, res){
        console.log(req.query)
        return res.send("From controller...");
    }
    async create(req, res){
        let authenticate = await auth.auth(req.headers);
        if(!authenticate){
            return res.status(401).json({ok : false, message : "Unauthorized request"});
        }else{
            const requiredBody = ["address", "overview"];
            const body = req.body;
            const keys = Object.keys(body);
            for(let i = 0; i < requiredBody.length; i++){
                if(!keys.includes(requiredBody[i])){
                    return res.status(400).json({ok : false, message : `${requiredBody[i]} is required.`});
                }
            }
            body.posted_by = authenticate.id;
            let review = await Review.create(body);
            if(body.media){
                for(let i = 0; i < body.media.length; i++){
                    await ReviewMedia.create({
                        review_id : review.id,
                        media_type : body.media[i].type,
                        media_url : body.media[i].url
                    });
                }
            }
            return res.status(200).json({ok : true, message : "Review has been added."});
        }
    }
}

module.exports = ReviewsController;