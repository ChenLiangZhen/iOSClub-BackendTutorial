const { MongoClient } = require("mongodb");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri)

const userDB = client.db('users');
const userAccount = userDB.collection('user_account');

function createUser(_userName, _userEmail, _userPassword, _phone) {
    return new Promise(async (resolve, reject) => {

        try {

            const user = {

                userId: new Date().getTime().toString().substring(5, 13),
                userName: _userName,
                userEmail: _userEmail,
                userPassword: _userPassword,
                phone: _phone
            }

            await userAccount.insertOne(user);

            return resolve({ 
                user: user,
            })

        } catch (e) {

            reject("User creation error: " + e)

        }

    })
}
 
function deleteUser(_userId) {
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

function getUser(_userId) {
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

function getUserByEmail(_userEmail) {
    return new Promise(async (resolve, reject) => {

        try {

            const result = await userAccount.findOne({ userEmail: _userEmail });

            if (result === null) {
                reject("User finding error: Not Found")
            }

            resolve(result)

        } catch (e) {

            reject("User finding error: " + e)

        }

    })
}

function updateUser(_userName, _userEmail, _phone, _userId) {
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

const userActions = {
    getUser,
    getUserByEmail, 
    createUser,
    deleteUser,
    updateUser,
}

module.exports = userActions