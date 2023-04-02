class ProductManager {
    constructor () {
        this.products = [];
    }
    static id = 0

    addProduct(title,description,price, thumbnail, code, stock){
        for (let i = 0; i < this.products.length ; i++) {
            if (this.products[i].code === code) {
                console.log(`El codigo ${code} esta repetido`)
                break;
            }
        }

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if (!Object.values(newProduct).includes(undefined)){
            ProductManager.id++ ;
            this.products.push ({
                ...newProduct,
                id:ProductManager.id
            })
        } else {
            console.log ("Faltan campos sin completar")
        }
    }

    getProduct(){
    return this.products
    }
        existe (id){
        return this.products.find((testProducts) => testProducts.id === id );
        }
    getProductById(id){
       !this.existe(id) ? console.log ("Not found") : console.log(this.existe(id))
        
    } 
}

const testProducts = new ProductManager()
        //llamada sin productos agregados
        console.log(testProducts.getProduct())

        //ejemplo prueba 
        testProducts.addProduct("titlePrueba","descriptionPrueba",10, "thumbnailPrueba", "codePrueba", 100)
        testProducts.addProduct("titlePrueba2","descriptionPrueba2",10, "thumbnailPrueba2", "codePrueba2", 100)
        console.log(testProducts.getProduct())

        //buscar producto por ID
        testProducts.getProductById(1)