const ReviewMedia = require("../models/ReviewMedia");
const auth = require("../helpers/auth");
const Review = require("../models/Review");
const ReviewHelpful = require("../models/ReviewHelpful");

class ReviewsController{
    async list(req, res){
        const query = req.query.sort_by ? req.query.sort_by : 'most_rated';
        let reviews;
        switch (query) {
            case 'latest':
                reviews = await Review.findAll({order : [['createdAt', 'DESC']]});
                break;
            default:
                reviews = await Review.findAll({order : [['helpful_count', 'DESC'], ['createdAt', 'DESC']]});
                break;
        }
        return res.status(200).json({ok : true, message : "Reviews fetched", body : reviews});
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
    async markAsHelpful(req, res){
        const ipAddress = req.ip;
        const body = req.body;
        if(!body.review_id){
            return res.status(400).json({ok : false, message : "Review id is required"});
        }else{
            const review = await Review.findOne({where : {id : body.review_id}});
            if(!review){
                return res.status(404).json({ok : false, message : "Review not found."});
            }else{
                let searchHelpful = await ReviewHelpful.findOne({where : { review_id : body.review_id, ip_address : ipAddress }});
                if(!searchHelpful){
                    await ReviewHelpful.create({ip_address : ipAddress, review_id : body.review_id});
                    review.helpful_count = review.helpful_count + 1;
                    await review.save();
                }
                return res.status(200).json({ok : true, message : "Review has been marked has helpful."});
            }
        }
    }
}

module.exports = ReviewsController;