const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require("../auth"); 
const { errorHandler } = require('../auth');

module.exports.registerUser = (req, res) => {
	if(!req.body.email.includes("@")){
		return res.status(400).send(false);

	} else if(req.body.password.length < 8) {
		return res.status(400).send(false);

	} else {

		let newUser = new User({
			username : req.body.username,
			email : req.body.email,
			password : bcrypt.hashSync(req.body.password, 10),
		})

		return newUser.save()
		.then((result) => res.status(201).send(result))
		.catch(error => errorHandler(error, req, res));      
	}
};

module.exports.loginUser = (req, res) => {

    if (!req.body.email.includes("@")) {
        return res.status(400).send({ message: "Invalid email format" });
    }

    return User.findOne({ email: req.body.email })
        .then(user => {

            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }


            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

            if (isPasswordCorrect) {
   
                return res.status(200).send({ 
                    access: auth.createAccessToken(user) 
                });
            } else {

                return res.status(401).send({ message: "Email and password do not match" });
            }
        })
        .catch(error => errorHandler(error, req, res));
};