const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");

router.post('signup', (req, res, next)=>{
    UsersController.signup(req, res);
    next();
});

module.exports = router;