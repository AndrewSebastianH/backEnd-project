import Sneaker from "../models/sneaker-model.js";

export const getSneakers = async(req,res) =>{
    try{
        const response = await Sneaker.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getSneakerByID = async(req,res) =>{
    try{
        const response = await Sneaker.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createSneaker = async(req,res) =>{
    try{
        await Sneaker.create(req.body);
        res.status(201).json({msg: "Sneaker Created."});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateSneaker = async(req,res) =>{
    try{
        await Sneaker.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Sneaker Updated."});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteSneaker = async(req,res) =>{
    try{
        await Sneaker.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Sneaker Deleted."});
    } catch (error) {
        console.log(error.message);
    }
}