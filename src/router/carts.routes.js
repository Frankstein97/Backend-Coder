import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router ()
const carts = new CartManager

CartRouter.post("/", async (req, res ) => {
    res.send(await carts.addCarts())
}) 

CartRouter.get("/", async (req, res ) => {
    res.send(await carts.readCarts())
})
CartRouter.get("/products", async (req, res ) => {
    res.send(await carts.readCarts())
})
CartRouter.get("/realtimeproducts", async (req, res ) => {
    res.send(await carts.readCarts())
})
CartRouter.get("/:id", async (req, res ) => {
    res.send(await carts.getcartById(req.params.id))
})

// esta ruta rara es para traer el carrito y los productos adentro
CartRouter.post("/:cid/products/:pid", async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    res.send (await carts.addProductInCart(cartId, productId))
})

export default CartRouter