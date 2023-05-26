import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async(req,res) => {
    const { name, email,password, confPassword} = req.body;
    if(password !== confPassword)
        return res.status(400).json({msg: "Password doesn't match."})
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "User Registered"})
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await User.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg:"Wrong Password."})

        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId,name,email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '30s'
        });
        const refreshToken = jwt.sign({userId,name,email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await User.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        await res.cookie('refreshToken', refreshToken, {
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure:true
        });
        console.log({refreshToken});
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export const getUsers = async(req,res) =>{
    try{
        const response = await User.findAll({
            attributes: ['id','name','email','createdAt','updatedAt']
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserByID = async(req,res) =>{
    try{
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async(req,res) =>{
    try{
        await User.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated."});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req,res) =>{
    try{
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted."});
    } catch (error) {
        console.log(error.message);
    }
}