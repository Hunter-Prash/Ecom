import express from 'express';
import fs from 'fs';
import formidable from 'formidable';
import { productModel } from '../models/productModel.js';
import slugify from 'slugify';

//CREATE PRODUCT
export const createProduct=async (req,res)=>{
    try{
        //THIS IS DONE VIA FORMIDABLE PACKAGE 
        //req.fields will contain all the text data and req.files will contain all the files or images
        const {name,description,price,category,quantity,shipping}=req.fields;
        const {photo}=req.files;

        //SERVER VALIDATION
        if(!name || !description || !price || !category || !quantity){
            return res.status(400).json({error:'All fields are required'})
        }
        if(!photo || photo.size>1000000){
            return res.status(400).json({error:'Image is required and should be less than 1mb'})
        }

        //CHECK IF PRODUCT ALREADY EXISTS
        const existingProduct=await productModel.findOne({name:name});
        if(existingProduct){
            return res.status(400).json({error:'Product already exists'})
        }
        const newProduct= new productModel({
            name,
            slug:slugify(name),
            description,
            price,
            category,
            quantity,
            photo:{
                data:fs.readFileSync(photo.path),
                contentType:photo.type
            },
            
        })
        await newProduct.save();
        res.status(201).json({message:'Product created successfully',newProduct})

    }catch(err){
        console.log(err)
        res.status(400).json({error:'Product not created'})
    }
}

//GET PRODUCTS
export const getProducts=async(req,res)=>{
    try{
        const result=await productModel.find({}).populate('category').select("-photo").limit(10).sort({createdAt:-1})
        const products=result.map(it=>it.name)
        
        res.status(200).json({message:'Products fetched',products})
    }catch(err){
        console.log(err)
        res.status(400).json({error:'Products not found'})
    }
}

//GET A SINGLE PRODUCT
export const getSingleProduct=async (req,res)=>{
    try{
        const product=await productModel.findOne({slug:req.params.slug}).populate('category').select("-photo")
        if(!product){
            return res.status(400).json({error:'Product not found'})
        }
        res.status(200).json({message:'Product fetched',product})
    }catch(err){
        console.log(err)
        res.status(400).json({error:'Product not found'})
    }
}