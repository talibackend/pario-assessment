const bcrypt = require("bcrypt");

module.exports = {
    validateEmail : (email)=>{
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    },
    hashPassword : async (password, round=10)=>{
        let hash = await bcrypt.hash(password, round);
        return hash;
    },
    dehashPassword : async (password, hash)=>{
        return await bcrypt.compare(password, hash);
    },
    generateRandom : (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }
}