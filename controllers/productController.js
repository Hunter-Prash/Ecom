import express from 'express';
import fs from 'fs';
import formidable from 'formidable';
import { productModel } from '../models/productModel.js';
import slugify from 'slugify';
import e from 'express';

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
        const result=await productModel.find({}).populate('category').select("-photo").sort({createdAt:-1})
        //const products=result.map(it=>it.name)
        
        res.status(200).json({message:'Products fetched',result})
    }catch(err){
        console.log(err)
        res.status(400).json({error:'Products not found'})
    }
}

//GET A SINGLE PRODUCT
export const getSingleProduct=async (req,res)=>{
    try{
        const product=await productModel.findById(req.params.pid).populate('category').select("-photo")
        if(!product){
            return res.status(400).json({error:'Product not found'})
        }
        res.status(200).json({message:'Product fetched',product})
    }catch(err){
        console.log(err)
        res.status(400).json({error:'Product not found'})
    }
}

//GET PHOTO
export const getPhoto=async(req,res)=>{
    try{
        const result=req.params.pid
        const productphoto=await productModel.findById(result).select('photo')// Find the product by ID and select only the photo field
        if(productphoto.photo.data){
            res.set('Content-Type',productphoto.photo.contentType)//Setting the Content-Type header to the photo's content type is important because it informs the client (e.g., a web browser or a mobile app) about the type of data being sent in the response. This allows the client to correctly interpret and display the data.

            res.status(200).send(productphoto.photo.data)
        }
    }catch(err){
        console.log(err)
        res.status(400).json({error:'Photo not found'})
    }
}

export const deleteProduct=async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.pid)
        res.status(200).json({message:'Product deleted'})
    }catch(err){
        console.log(err)
        res.status(400).json({error:'Product not deleted'})
    }
}

export const updateProduct=async(req,res)=>{
    try{
        const {name,description,price,category,quantity}=req.fields;
        const {photo}=req.files;

        //SERVER VALIDATION
        if(!name || !description || !price || !category || !quantity){
            return res.status(400).json({error:'All fields are required'})
        }
        if(!photo || photo.size>1000000){
            return res.status(400).json({error:'Image is required and should be less than 1mb'})
        }

        const updatedProduct=await productModel.findByIdAndUpdate(req.params.pid,{
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
        },{new:true})
        res.status(200).json({message:'Product updated',updatedProduct})
    }catch(err){
        console.log(err)
        res.status(400).json({error:'Product not updated'})
    }
}

//GET PRODUCT COUNT
export const getProductCount=async(req,res)=>{
    try{
        const total=await productModel.find({}).estimatedDocumentCount()
        res.status(200).json({message:'Product count fetched',total})
    }catch(err){
        console.log(err)
        res.status(400).json({error:'Product count not found'})
    }
}

//GET PRODUCTS PER PAGE
export const getProductsPerPage=async(req,res)=>{
    try{
        const perpage=5
        const page=req.params.page ? req.params.page : 1
        const skip=(page-1)*perpage
        const products=await productModel.find({}).select("-photo").limit(perpage).skip(skip).sort({createdAt:-1})
        res.status(200).json({products})

    }catch(err){
        console.log(err)
        res.status(400).json({error:'Products not found'})
    }
}