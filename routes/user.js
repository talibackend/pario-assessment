const express = require("express");
const router = express.Router();
const UsersController = new (require("../controllers/UsersController"));

router.post('/signup', async (req, res)=>{return await UsersController.signup(req, res);});
router.post('/login', async (req, res)=>{return await UsersController.login(req, res);});

module.exports = router;