const helper = require("../helpers/general");
const auth = require("../helpers/auth");
const User = require("../models/User");

class UsersController{
    async signup(req, res){
        const requiredBody = ["full_name", "email", "password"];
        const body = req.body;
        const keys = Object.keys(body);
        for(let i = 0; i < requiredBody.length; i++){
            if(!keys.includes(requiredBody[i])){
                return res.status(400).json({ok : false, message : `${requiredBody[i]} is required.`});
            }
        }
        if(!helper.validateEmail(body.email)){
            return res.status(400).json({ok : false, message : `Invalid email provided.`});
        }else{
            let searchUser = await User.findOne({where : { email : body.email }});
            if(searchUser){
                return res.status(400).json({ok : false, message : `Email has already been used`});
            }else{
                if(body.password.length < 6){
                    return res.status(400).json({ok : false, message : `Password can not be less that 6 characters.`});
                }else{
                    body.password = await helper.hashPassword(body.password);
                    let user = await User.create(body);
                    let token = await auth.login(body.email, body.password);
                    return res.status(200).json({ok : true, message : "Registration successful", body : {id : user.id, full_name : body.full_name, email : body.email, token}});
                }
            }
        }
    }
    async login(req, res){
        const requiredBody = ["email", "password"];
        const body = req.body;
        const keys = Object.keys(body);
        for(let i = 0; i < requiredBody.length; i++){
            if(!keys.includes(requiredBody[i])){
                return res.status(400).json({ok : false, message : `${requiredBody[i]} is required.`});
            }
        }
        if(!helper.validateEmail(body.email)){
            return res.status(400).json({ok : false, message : `Invalid email provided.`});
        }else{
            if(body.password.length < 6){
                return res.status(400).json({ok : false, message : `Password can not be less that 6 characters.`});
            }else{
                let user = await User.findOne({where : { email : body.email }});
                let token = await auth.login(body.email, body.password);
                if(!token){
                    return res.status(401).json({ok : false, message : "Invalid login credential."});
                }else{
                    return res.status(200).json({ok : true, message : "Registration successful", body : {id : user.id, full_name : user.full_name, email : user.email, token}});   
                }
            }
        }
    }
}
module.exports = UsersController;