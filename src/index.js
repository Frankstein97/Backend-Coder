//aca  iria el servidor
import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";

const app = express();
const PORT = 8080;

//de configuracion
app.use(express.json())
app.use(express.urlencoded ({extended: true}))

app.use ("/products", ProductRouter)
app.use ("/carts", CartRouter)
//que puerto estara escuchando las req
app.listen (PORT, () => {
    console.log (`servidor en express en el puerto ${PORT}`)
})