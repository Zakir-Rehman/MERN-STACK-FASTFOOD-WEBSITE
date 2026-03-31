import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item

const addFood = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Image file is required"
        });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log("foodController=>Error", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};
//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}
//Remove Food Items
const removeFood = async (req, res) => {
    try {
        // find food form database
        const food = await foodModel.findById(req.body.id)
        // delete food from uploads folder 
        fs.unlink(`uploads/${food.image}`, () => { })
        // delete food form database
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'Food Removed' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}
 const editFood = async (req, res) => {
  try {
    const { id, name, description, price, category } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { name, description, price, category }, // sirf ye fields update hongi
      { new: true }
    );

    res.json({ success: true, message: "Food updated", data: updatedFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { addFood, listFood, removeFood, editFood }