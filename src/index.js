//aca  iria el servidor de la primer entrega
import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";

import ProductManager from "./controllers/ProductManager.js";
//express-handlebars
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import * as path from "path";
 
const app = express();
const PORT = 8080;
const product = new ProductManager();

//de configuracion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

//express-staticks
app.use("/", express.static(__dirname + "/public"));

app.get( "/realtimeproducts", async (req, res) => {
  let allProducts = await product.getProducts()
  res.render ("home", {
  title: "Motores de plantillas y zapatillas",
  products : allProducts
})})

app.get( "/", async (req, res) => {
  let allProducts = await product.getProducts()
  res.render ("home", {
  title: "Motores de plantillas y zapatillas",
  products : allProducts
})})

app.get( "/products", async (req, res) => {
  let allProducts = await product.getProducts()
  res.render ("home", {
  title: "Motores de plantillas y zapatillas",
  products : allProducts
})})

app.get( "/:id", async (req, res) => {
  let prod = await product.getProductsById(req.params.id)
  res.render ("prod", {
  title: "Motores de plantillas y zapatillas",
  products : prod
})
})


//preentrega1

app.use("/products", ProductRouter);
app.use("/carts", CartRouter);

//que puerto estara escuchando las req
app.listen(PORT, () => {
  console.log(`servidor en express en el puerto ${PORT}`);
});
