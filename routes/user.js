const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");

router.get('/signup', (req, res)=>{
    UsersController.signup(req, res);
});

module.exports = router;