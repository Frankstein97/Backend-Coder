import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.patch = "./productos.txt";
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, img, code, stock) => {
    // se incrementa el id en cada iteracion
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      img,
      code,
      stock,
      id: ProductManager.id,
    };
    // se crea el this.products para que se vayan agragando los newProducty no se reescriba
    this.products.push(newProduct);

    console.log(newProduct);
    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

// Para no repertir la funcion de lectura
readProduct = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8")
    return JSON.parse(respuesta)
}

getProducts = async () => {
    let get = await this.readProduct()
return console.log(get)
}

getProductsById = async(id) => {
    let getById = await this.readProduct()
   if (!getById.find(product => product.id === id)){
    console.log("Producto no encontrado")
   }else {
    console.log(getById.find(product => product.id === id))
   }
}

deleteProductById = async(id) => {
    let deletes = await this.readProduct();
    let productFilter = deletes.filter(product => product.id != id)
    await fs.writeFile(this.patch, JSON.stringify(productFilter));
}

updateProducts = async ({id, ...producto})  => {
    await this.deleteProductById(id);
    let productOld = await this.readProduct()
    let update = [{...producto, id}, ...productOld]
console.log(update)
await fs.writeFile(this.patch, JSON.stringify(update));

}
}

const productos = new ProductManager();
// productos.addProduct("title", "description", 1000, "img", "12abc", 10);
// productos.addProduct("title2", "description2", 1000, "img2", "13abc", 10);
// productos.addProduct("title3", "description3", 1000, "img3", "14abc", 10);

// productos.getProducts()

// productos.getProductsById(3)

// productos.updateProducts({
//     title: 'title',
//     description: 'description',
//     price: 100000000000,
//     img: 'img',
//     code: '12abc',
//     stock: 10,
//     id: 1
//   })

// productos.deleteProductById(2)
