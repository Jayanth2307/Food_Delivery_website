const foodModel = require('../model/foodModel');
const fsPromises = require('fs').promises
const path = require('path')

const addFood  = async(req,res)=>{
    let image_filename = `${req.file.filename}`;
    try {
        const food = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            price:req.body.price,
            category: req.body.category,
            image: image_filename
        })
        res.json({success:true, message:"Food added successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error adding food"})
    }
}

const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find()
        res.status(200).json({success: true, data: foods})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"Error fetching food"})
    }
}

const removeFood = async (req,res)=>{
    try {
        const {id} = req.query
        const food = await foodModel.findById(id)
        if(!food)
            return res.status(404).json({success:false, message:"Food not found"})
        await foodModel.deleteOne({_id:id})
        await fsPromises.unlink(path.join(__dirname,'..','uploads',`${food.image}`))
        res.status(200).json({success:true, message:"Food deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"Error deleting food"})
    }
}
module.exports = {addFood,listFood,removeFood};