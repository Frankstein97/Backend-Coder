//aca  iria el servidor de la primer entrega
import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import ProductManager from "./controllers/ProductManager.js";
//express-handlebars
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import * as path from "path";
//socket.io desafio
import { Server, Socket } from 'socket.io';
import viewRouter from './router/view.router.js'
 
const app = express();
const PORT = 8080;
const product = new ProductManager();
const productManager = new ProductManager('./src/files/products.json');

//de configuracion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

//express-staticks
app.use("/", express.static(__dirname + "/public"));
//preentrega1
app.use('/', viewRouter);
app.use("/products", ProductRouter);
app.use("/carts", CartRouter);


// app.get( "/realtimeproducts", async (req, res) => {
//   let allProducts = await product.getProducts()
//   res.render ("home", {
//   title: "Motores de plantillas y zapatillas",
//   products : allProducts
// })})

// app.get( "/", async (req, res) => {
//   let allProducts = await product.getProducts()
//   res.render ("home", {
//   title: "Motores de plantillas y zapatillas",
//   products : allProducts
// })})

// app.get( "/products", async (req, res) => {
//   let allProducts = await product.getProducts()
//   res.render ("home", {
//   title: "Motores de plantillas y zapatillas",
//   products : allProducts
// })})

// app.get( "/:id", async (req, res) => {
//   let prod = await product.getProductsById(req.params.id)
//   res.render ("prod", {
//   title: "Motores de plantillas y zapatillas",
//   products : prod
// })
// })

//que puerto estara escuchando las req

const server = app.listen(PORT, () => {
  console.log(`Server en express en el port ${PORT}`);
});

const io = new Server(server);

// app.set('socketio', io);

io.on("connection", async (socket) => {
    console.log('New user conected');
    
    // Ver productos.
    const products = await product.getProducts();
    socket.emit('products', products);

    // Agrgar productos.
    socket.on('post', async (product) => {
        const result = await productManager.addProducts(product);
        socket.emit('products', result);
    });

    socket.on("delete", async (products) => {
        const result = await product.deleteProducts(Number(products));
        socket.emit("products", result);
    });
});