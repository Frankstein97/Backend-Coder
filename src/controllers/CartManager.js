import { promises as fs, write } from "fs";
import { nanoid } from "nanoid";
import ProductManager from "./ProductManager.js";

const productAll = new ProductManager();

class CartManager {
  constructor() {
    this.path = "./src/models/carts.json";
  }

  readCarts = async () => {
    let carts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(carts);
  };
  writeCarts = async (cart) => {
    await fs.writeFile(this.path, JSON.stringify(cart));
  };

  exists = async (id) => {
    let carts = await this.readCarts();
    // return (this.cartById = carts.find((cart) => cart.id === id));
    return  carts.find((cart) => cart.id === id);
  };

  addCarts = async () => {
    let cartsOld = await this.readCarts();
    let id = nanoid();
    let cartsConcat = [{ id: id, products: [] }, ...cartsOld];
    await this.writeCarts(cartsConcat);
    return "Se agrego el carrito correctamente";
  };
  getcartById = async (id) => {
    let cartById = await this.exists(id);
    if (!cartById) return "Carrito no encontrado amichi´";
    return cartById;
  };
  addProductInCart = async(cartId, productId) => {
    let cartById = await this.exists(cartId)
    if(!cartById) return "Carrito No Encontrado amiwichi"
    let getProductsById = await productAll.exists(productId)
    if(!cartById) return "Producto No Encontrado amiwichi"
    
    let cartAll = await this.readCarts()
    let cartFilter = cartAll.filter(prod => prod.id != productId)

    if(cartById.products.some(prod => prod.id === productId)){
        let moreProductInCart = cartById.products.find(prod => prod.id === productId)
        moreProductInCart.cantidad++
        console.log(moreProductInCart.cantidad)
        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "producto sumado al carrito "
    }   
    cartById.products.push({id:getProductsById.id, cantidad:1})  
    let cartsConcat = [cartById, ...cartFilter]
    await this.writeCarts(cartsConcat)
    return "producto agregado al carrito "
}
}
export default CartManager