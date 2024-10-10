import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ganeshh4419:pumatodb@cluster0.p7hkuta.mongodb.net/PUMATO').then(()=>console.log("DB Connected"));
}

//mongodb+srv://ganeshh4419:surya@mealmate@cluster0.bckqw.mongodb.net/mealMate
//mongodb+srv://ganeshh4419:surya@mealmate@cluster0.bckqw.mongodb.net/
//"mongodb+srv://ganeshh4419:Surya123@cluster0.z9nze1m.mongodb.net/food-delivery"