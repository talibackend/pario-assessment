const User = require("../models/User");
const Token = require("../models/Token");
const helper = require("./general");

module.exports = {
    login : async (email, password)=>{
        let user = await User.findOne({email});
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
    }
}