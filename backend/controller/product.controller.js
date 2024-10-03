import mongoose from "mongoose"
import Product from "../model/product.model.js"


export const getProducts = async(req,res) => {
    const products = await Product.find()
    res.status(200).json({success: true, data: products})
}

export const postProduct = async (req,res) => {
    const product = req.body

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please provide all fields"})
    }

    const newProduct = new Product(product)
    try {
        await newProduct.save()
        return res.status(201).json({success: true, data: newProduct})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server Error"})
    }
}

export const editProduct = async(req,res) => {
    const {id} = req.params
    const body = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({success: false, message: "Invalid Id"})
    }

    try {
        const update = await Product.findByIdAndUpdate(id, body, {new:true})
        if(update == null || update == undefined ) throw new Error()
        return res.status(200).json({success: true, data: update})
    } catch (error) {
        return res.status(400).json({success: false, message: "Data not found"})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findByIdAndDelete(id)
        if(product == null || product == undefined ) throw new Error()
        return res.status(200).json({success: true, message: "Delete success"})
    } catch (error) {
        return res.status(404).json({success: false, message: "Data not found"})
    }

}