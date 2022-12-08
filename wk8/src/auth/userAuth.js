const jwt = require("jsonwebtoken")
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri)

const userDB = client.db('users');
const userAccount = userDB.collection('user_account');

module.exports = (req, res, next) => {

	console.log("JWT Auth processing...")
	const { authorization } = req.headers

	console.log(authorization)

	if(!authorization){
		console.log("Auth: Invalid JWT Token (NULL)")
		return res.status(401).send({ error: "You must be logged in."})
	}

	const token = authorization.replace("Bearer ", "")

	jwt.verify(token, "iosclub_backend_tutorial_secret_token", async(err, payload) => {
		
		if(err){
			console.log("Auth: Invalid JWT Token (INVALID)")
			return res.status(401).send({ error: "You must be logged in." })
		}

		const user = payload;
		console.log("JWT Succeeded! Payload: " + JSON.stringify(user, "", 2))

		next()
	})
}