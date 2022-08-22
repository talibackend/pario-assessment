const express = require("express");
const router = express.Router();
const ReviewsController = new (require("../controllers/ReviewsController"));

router.get('/', async (req, res)=>{return await ReviewsController.list(req, res)});
router.post('/', async (req, res)=>{return await ReviewsController.create(req, res)});
router.post('/mark-as-helpful', async (req, res)=>{return await ReviewsController.markAsHelpful(req, res)});


module.exports = router;