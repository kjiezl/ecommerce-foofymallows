import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    try{
        const { name } = req.body;

        if (!name){
            return res.json({error: "Name is required."});
        }
        const existingCategory = await Category.findOne({name});

        if(existingCategory){
            return res.json({error: "Category already exists."})
        }

        const category = await new Category({name}).save();
        res.json(category);
    } catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try{
        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await Category.findOne({_id: categoryId});

        if(!category){
            return res.status(404).json({error: "Category not found."});
        }

        category.name = name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);

    }catch(err){
        console.log(err);
        return res.status(500).json({err: "Server error."});
    }
})

const removeCategory = asyncHandler(async (req, res) => {
    try{
        const removed = await Category.findByIdAndDelete(req.params.categoryId);
        res.json(removed);
    } catch(err){
        console.log(err);
        return res.status(500).json({err: "Server error."});
    }
})

const listCategory = asyncHandler(async (req, res) => {
    try{
        const categories = await Category.find({});
        res.json(categories);
    } catch(err){
        console.log(err);
        return res.status(400).json(err.message);
    }
})

const readCategory = asyncHandler(async (req, res) => {
    try{
        const category = await Category.findOne({_id: req.params.id});
        res.json(category);
    } catch(err){
        console.log(err);
        return res.status(400).json(err.message);
    }
})

export { createCategory, 
        updateCategory, 
        removeCategory,
        listCategory,
        readCategory,
    };