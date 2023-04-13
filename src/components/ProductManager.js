import { promises as fs } from "fs";

export default class ProductManager {
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

// const productos = new ProductManager();
// productos.addProduct("title", "description", 1000, "img", "12abc", 10);
// productos.addProduct("title2", "description2", 1000, "img2", "13abc", 10);
// productos.addProduct("title3", "description3", 1000, "img3", "14abc", 10);

// productos.addProduct("Seta de ostra", "Hongo comestible con textura delicada y sabor suave.", 5.99, "https://ejemplo.com/seta-ostra.jpg", "OSTR123", 50);
// productos.addProduct("Champiñón portobello", "Hongo grande y carnoso con sabor terroso y ligeramente dulce.", 7.99, "https://ejemplo.com/portobello.jpg", "PORTO456", 30);
// productos.addProduct("Reishi", "Hongo medicinal con propiedades antioxidantes y antiinflamatorias.", 12.99, "https://ejemplo.com/reishi.jpg", "REISH789", 20);
// productos.addProduct("Shiitake", "Hongo aromático con sabor ahumado y notas terrosas.", 9.99, "https://ejemplo.com/shiitake.jpg", "SHII456", 40);
// productos.addProduct("Maitake", "Hongo con forma de abanico y sabor suave y dulce.", 11.99, "https://ejemplo.com/maitake.jpg", "MAIT123", 25);
// productos.addProduct("Boletus", "Hongo carnoso y sabroso con notas terrosas y amargas.", 14.99, "https://ejemplo.com/boletus.jpg", "BOLE789", 15);
// productos.addProduct("Pleurotus", "Hongo comestible de sabor suave y textura delicada.", 6.99, "https://ejemplo.com/pleurotus.jpg", "PLEU456", 35);
// productos.addProduct("Amanita muscaria", "Hongo tóxico con aspecto distintivo de sombrero rojo y puntos blancos.", 0.99, "https://ejemplo.com/amanita.jpg", "AMAN123", 5);
// productos.addProduct("Trufa blanca", "Hongo subterráneo muy apreciado por su aroma y sabor únicos.", 29.99, "https://ejemplo.com/trufa-blanca.jpg", "TRUF789", 10);
// productos.addProduct("Hongo del pie azul", "Hongo alucinógeno con aspecto de sombrero convexo y pie azulado.", 9.99, "https://ejemplo.com/hongo-azul.jpg", "AZUL456", 2);

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
