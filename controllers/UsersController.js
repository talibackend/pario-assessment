class UsersController{
    async signup(req, res){
        const body = req.body;
        console.log(body);
        return res.json(body);
    }
    async login(req, res){

    }
}
module.exports = UsersController;