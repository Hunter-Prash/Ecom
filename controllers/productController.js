import express from 'express';
import fs from 'fs';
import formidable from 'formidable';
import { productModel } from '../models/productModel.js';
import slugify from 'slugify';
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