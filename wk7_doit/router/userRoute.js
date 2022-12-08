const express = require("express");
const { MongoClient } = require("mongodb");

const userRoute = express.Router()

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri)

const userDB = client.db('users');
const userAccount = userDB.collection('user_account');

async function createUser(_userName, _userEmail, _phone) {
    return new Promise(async (resolve, reject) => {

        try {

            const user = {
                userId: new Date().getTime().toString().substring(5, 13),
                userName: _userName,
                userEmail: _userEmail,
                phone: _phone
            }

            await userAccount.insertOne(user);

            resolve("User created: " + JSON.stringify(user, "", 2))

        } catch (e) {

            reject("User creation error: " + e)

        }

    })
}

async function deleteUser(_userId) {
    return new Promise(async (resolve, reject) => {

        try {

            const result = await userAccount.deleteOne({ userId: _userId });

            if (result.deletedCount === 0) {

                reject("User deletion error: Nothing to delete")

            } else {
                resolve("User deleted: " + _userId)
            }

        } catch (e) {

            reject("User deletion error: " + e)

        }

    })
}

async function getUser(_userId) {
    return new Promise(async (resolve, reject) => {

        try {

            const result = await userAccount.findOne({ userId: _userId });

            if (result === null) {
                reject("User finding error: Not Found")
            }

            resolve(result)

        } catch (e) {

            reject("User finding error: " + e)

        }

    })
}

async function updateUser(_userName, _userEmail, _phone, _userId) {
    return new Promise(async (resolve, reject) => {

        const updateDoc = {
            $set: {
                userId: _userId,
                userName: _userName,
                userEmail: _userEmail,
                phone: _phone
            },
        };

        try {

            const result = await userAccount.updateOne(
                { userId: _userId }, updateDoc
            );

            resolve(result)

        } catch (e) {

            reject("User finding error: " + e)

        }
    })
}

userRoute.post("/create-user", async (req, res) => {

    const { _userName, _userEmail, _phone } = req.body

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_userEmail)) {
        return res.status(400).send("User creation error: Email Invalid.")
    }

    createUser(_userName, _userEmail, _phone)
        .then(resolve => {
            res.status(200).send(resolve)

        }, reject => {
            res.status(500).send(reject)
        })
})

userRoute.post("/delete-user/:_userId", async (req, res) => {

    const { _userId } = req.params

    deleteUser(_userId)
        .then(resolve => {

            res.status(200).send(resolve)

        }, reject => {

            if (reject === "User deletion error: Nothing to delete") {
                res.status(422).send(reject)

            } else {
                res.status(500).send(reject)
            }

        })
})

userRoute.get("/get-user/:_userId", (req, res) => {

    const { _userId } = req.params

    getUser(_userId)
        .then(resolve => {
            res.status(200).send(JSON.stringify(resolve))

        }, reject => {
            res.status(500).send(reject)
        })

})

userRoute.post("/update-user/:_userId", (req, res) => {

    const { _userId } = req.params
    const { _userName, _userEmail, _phone } = req.body

    updateUser(_userName, _userEmail, _phone, _userId)
        .then(resolve => {
            res.status(200).send(JSON.stringify(resolve))

        }, reject => {
            res.status(500).send(reject)
        })

})

module.exports = userRoute