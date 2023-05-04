// // const express = require("express")
// // import { Express } from "express"
// import express from "express";
// import ProductManager from "./components/ProductManager.js";

// const app = express();
// app.use(express.urlencoded({extended: true}))

// const productos = new ProductManager();

// const readProducts = productos.readProduct();

// // console.log(await readProducts) //funciona!

// app.get ("/products", async (req,res) => {
//     let limit = parseInt(req.query.limit);

//     if(!limit){
//         return res.send(await readProducts)
//     } else {
//     let allProducts = await readProducts
//     let productsLimit = allProducts.slice(0, limit) 
//     res.send(productsLimit)
//     // En el navegador busco http://localhost:8080/products?limit=4  y funciona!
// }
// })

// app.get ("/products/:id", async (req,res) => {
//     let id = parseInt(req.params.id);
//     let allProducts = await readProducts;
//     let productById = allProducts.find(product => product.id === id)
//     res.send(productById)
// })


// const PORT = 8080;
// const server = app.listen (PORT, () => {
//     console.log (`express por local host ${server.address().port}`)
// })
// server.on("error", (error) => console.log(`error del servidor ${error}`))