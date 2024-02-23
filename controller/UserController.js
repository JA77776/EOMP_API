import express  from "express";
import bodyParser from "body-parser";
import { users } from "../models/index.js";
import { verifyToken } from "../middleware/AuthenticateUser.js";
import { errorHandling } from "../middleware/ErrorHandeling.js";


const userRouter = express.Router()

//fetch users
userRouter.get('/', (req,res) => {
    try {
        users.fetchUsers(req,res)
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve users",
        });
    }
});

//fetch user
userRouter.get('/:id', (req,res) => {
    try {
        users.fetchUser(req,res)
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve the user"
        })
    }
})

//add a user
//ensure the format is json when sending to server bodyParser for when using methods
userRouter.post('/register', bodyParser.json(), (req,res) => {
    try {
        users.createUser(req, res)
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to add a new user"
        })
    }
})
userRouter.delete('/:id/deleteUser', bodyParser.json(),(req,res)=>{
    try{
        users.deleteUser(req,res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: 'Failed to delete user'
        })
    }
})
userRouter.patch('/:id/alterUser', bodyParser.json(),(req,res)=>{
    try{
        users.alterUser(req,res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to change user details"
        })
    }
})
userRouter.post('/login', bodyParser.json(), (req,res)=>{
    try{
        users.login(req,res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to login"
        })
    }
})


export{
    userRouter,express
}