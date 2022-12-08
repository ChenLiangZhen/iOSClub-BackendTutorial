const express = require("express");
const { 
    getUser,
    getUserByEmail,
    createUser,
    deleteUser,
    updateUser } = require("../actions/userDBActions")

const userRoute = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

userRoute.post("/signin-user", async (req, res) => {

    console.log("Signin User")

    const { _userEmail, _userPassword } = req.body

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_userEmail)) {
        return res.status(400).send("Signin error: Email Invalid.") 
    }

    const user = await getUserByEmail(_userEmail)
    console.log(user)

    if(user.userPassword === _userPassword) {

        return res.status(200).send({
            message: "Login success",
        })
    }

    return res.status(401).send("Credentials error")
})

userRoute.post("/create-user", async (req, res) => {

    console.log("Create User")

    const { _userName, _userEmail,_userPassword, _phone } = req.body

    console.log(_userEmail)

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_userEmail)) {
            return res.status(400).send("User creation error: Email Invalid.")
    }

    createUser(_userName, _userEmail, _userPassword, _phone)
        .then(resolve => {
            return res.status(200).send(JSON.stringify(resolve, "", 2))

        }, reject => {
            return res.status(422).send(reject)
        })
})

userRoute.post("/delete-user/:_userId", async (req, res) => {

    console.log("Delete User")

    const { _userId } = req.params

    deleteUser(_userId)
        .then(resolve => {

            res.status(200).send(resolve)

        }, reject => {

            if (reject === "User deletion error: Nothing to delete") {
                return res.status(422).send(reject)

            } else {
                return res.status(500).send(reject)
            }

        })
})

userRoute.get("/get-user/:_userId", (req, res) => {

    console.log("Get User")

    const { _userId } = req.params

    getUser(_userId)
        .then(resolve => {
            return res.status(200).send(JSON.stringify(resolve))

        }, reject => {
            return res.status(500).send(reject)
        })

})

userRoute.post("/update-user/:_userId", (req, res) => {

    console.log("Update User")

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