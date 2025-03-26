import express from 'express';
import mongoose from 'mongoose';
import { categoryModel } from '../models/categoryModel.js';
import slugify from 'slugify';


//CREATE CATEGORY
export const categoryController=async(req,res)=>{
    try{
        const {name}=req.body

        if(!name){//checking if name is present
            return res.status(400).json({error:'Name is required'})
        }

        const existingCategory=await categoryModel.findOne({name:name}) //checking if category already exists
        if(existingCategory){
            return res.status(400).json({error:'Category already exists'})
        }

        const category=new categoryModel({
            name:name,
            slug:slugify(name)
        })
        await category.save()
        res.status(201).json({message:'Category created'})
    }catch(err){
        console.log(err)
        res.status(400).json({error:'Category not created'})
    }

}

//UPDATE CATEGORY
export const updateController=async(req,res)=>{
    try{
        const {name}=req.body
        const updatedCategory=await categoryModel.findByIdAndUpdate(req.params.id,{name:name,slug:slugify(name)},{new:true})//we use new:true to get the updated data in mongodb else it will return the old data. if we dont use new:true then mongodb stores the updated data in updatedCategory but it returns the old data
        res.status(200).json({message:'Category updated',updatedCategory})
    }catch(err){
        console.log(err)
        res.status(400).json({error:'Category not updated'})
    }
}

//GET ALL CATEGORIES
export const getCategories=async(req,res)=>{
    try{
        const result=await categoryModel.find({})
        //const categories = result.map(it => it.name);
        res.status(200).json({message: 'Categories fetched',result});
    }catch(err){
        console.log(err)
        res.status(400).json({error:'error fetching categories'})   
    }
}

//SINGLE CATEGORY
export const getSingleCategory=async(req,res)=>{
    try{
        const result=await categoryModel.findById(req.params.id)
        res.status(200).json({message:'Category fetched',result})
    }catch(err){
        console.log(err)
        res.status(400).json({error:'error fetching category'})   
    }
}

//DELETE CATEGORY
export const deleteController=async(req,res)=>{
    try{
        await categoryModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Category deleted'})
    }catch(err){
        console.error(err)
        res.status(400).json({error:'Category not deleted'})
    }
}