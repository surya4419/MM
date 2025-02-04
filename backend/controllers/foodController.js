import foodModel from "../models/foodmodel.js";
import fs from 'fs'  //file system



//add food item

export const addFood = async (req,res)=>{

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price:req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try {
        await food.save();
        res.json({success:true,message:"Food item added"})
    } catch (error) {
        res.json({success:false,message:"Error"})
        
    }

}

//all food list
const listFood = async (req,res)=>{
   try {
         const foods = await foodModel.find({});
         res.json({success:true,data:foods})
   } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"})
   }
}

//remove food item
const removeFood = async (req,res) =>{
      try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food removed"})
      } catch (error) {
         console.log(error);
         res.json({success:false,message:"Error"})
      }
}

//search food list
const searchByCategory = async (req, res) => {
    try {
        // Get the category query from the request
        const category = (req.query.category || '').trim();

        // Ensure the category is a string
        if (typeof category !== 'string') {
            return res.status(400).json({ message: 'Invalid category' });
        }

        // Perform the search by category using regex for case-insensitive matching
        const results = await foodModel.find({
            category: { $regex: category, $options: 'i' }
        });

        // Return the search results
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


export  { listFood, removeFood,searchByCategory};