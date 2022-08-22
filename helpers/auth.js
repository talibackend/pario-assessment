const User = require("../models/User");
const Token = require("../models/Token");
const helper = require("./general");

module.exports = {
    login : async (email, password)=>{
        let user = await User.findOne({where : { email : email }});
        if(!user){
            return false;
        }else{
            if(!helper.dehashPassword(password, user.password)){
                return false;
            }else{
                let token = Token.create({user_id : user.id, token : await helper.hashPassword(helper.generateRandom(20))});
                return token;
            }
        }
    },
    auth : async (headers)=>{
        let key = headers[process.env.API_KEY_NAME];
        if(!key){
            return false;
        }else{
            let token = await Token.findOne({where : { token : key }});
            if(!token){
                return false;
            }else{
                let user = await User.findOne({where : { id : token.user_id }});
                if(!user){
                    return false;
                }else{
                    return user;
                }
            }
        }
    }
}