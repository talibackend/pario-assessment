const express = require("express");
const router = express.Router();
const ReviewsController = new (require("../controllers/ReviewsController"));

router.get('/', async (req, res)=>{return await ReviewsController.list(req, res)});

module.exports = router;