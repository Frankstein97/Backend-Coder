import {promises as fs, write} from "fs"
// generador de ids
import { nanoid } from "nanoid";

class ProductManager { 
    constructor () {
        this.path = "./src/models/products.json"
    }

    readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
    // se lee en productsOld
}

    writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify (product))

    }
    exists = async (id) => {
        let products = await this.readProducts();
        return this.getProductsById =products.find (prod => prod.id === id)
    }




    //esta funcion agregara productos
    addProducts = async (product)  => {
        let productsOld = await this.readProducts()
        product.id = nanoid()
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Agregado correctamente"
        // console.log(productsParse)
    }

    // esta funcion obtiene productos del json 
    getProducts = async () => {
        return await this.readProducts()
        
    }
    getProductsById = async (id) => {
        let productById = await this.exists(id)
        if(!productById) return "No encontrado kpo"        
        return productById
    }

    updateProducts = async (id, product) => {
        let productById = await this.exists(id)
        //primero lo borramos y luego modificamos sin modifica el id
        if (!productById) return "producto no encontrado"
        await this.deleteProducts (id)
        let productsOld = await this.readProducts()
        let products = [{...product, id : id }, ...productsOld]
        await this.writeProducts(products)
        return "el producto fue modificado"
    }


    deleteProducts = async (id) => {
        let products = await this.readProducts();
        // uso some porque me devuelve boleano
        let exist = products.some(prod => prod.id === id)
        if (exist){
        let filterProducts = products.filter (prod => prod.id !== id)
        // Se escribe un nuevo arreglo con el producto quitado de la lista
        await this.writeProducts(filterProducts)
        return "producto eliminado"
    }
    return "el producto a eliminar no existe"
    }
}

 export default ProductManager
 
// product.writeProduts()