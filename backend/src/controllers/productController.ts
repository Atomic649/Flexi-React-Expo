import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";

// Create  instance of PrismaClient
const prisma = new PrismaClient()


// Interface for request body from client
interface Product {
    name: string
    description: string
    barcode: string
    image: string
    stock: number
    price: number
    categoryId: number   
    statusId: number
    memberId: string
}

// Validation schema for request body
const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    barcode: Joi.string().required(),
    image: Joi.string().required(),
    stock: Joi.number().required(),
    price: Joi.number().required(),
    categoryId: Joi.number().required(),
    statusId: Joi.number().required(),
    memberId: Joi.string().required()
})

// Create product
const createProduct = async (req: Request, res: Response) => {
    const product: Product = req.body
    const { error } = productSchema.validate(product)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: product.name,
                description: product.description,
                barcode: product.barcode,
                image: product.image,
                stock: product.stock,
                price: product.price,
                categoryId: product.categoryId,
                statusId: product.statusId,
                memberId: product.memberId
            }
        })
        res.status(201).json(newProduct)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "failed to create product" })
    }
}

// Get all products
const getProducts = async (_: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany()
        res.json(products)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "failed to get products" })
    }
}

// Get product by ID
const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(product)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "failed to get product" })
    }
}

// Update product
const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product: Product = req.body
    

    // validate the request body
    const schema = Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        barcode: Joi.string(),
        image: Joi.string(),
        stock: Joi.number(),
        price: Joi.number(),
        categoryId: Joi.number(),
        statusId: Joi.number(),
        memberId: Joi.string()

    })
    const { error } = schema.validate(product)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                name: product.name,
                description: product.description,
                barcode: product.barcode,
                image: product.image,
                stock: product.stock,
                price: product.price,
                categoryId: product.categoryId,
                statusId: product.statusId,
                memberId: product.memberId
            }
        })
        res.json(updatedProduct)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "failed to update product" })
    }
}

// Delete product
const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })
        res.json(deletedProduct)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "failed to delete product" })
    }
}

// get all Product Name list by memberid
const getProductByMemberId = async (req: Request, res: Response) => {
    const { memberId } = req.params
    try {
        const products = await prisma.product.findMany({
            where: {
                memberId: memberId
            },
            select: {
                name: true
            }
        })
        // List of product names
        const productNames = products.map(product => product.name)
        res.json({
            status : "ok",
            data : productNames
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "failed to get products" })
    }
}

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getProductByMemberId }