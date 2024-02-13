import express from "express"


// Importo clase ProductManager
import ProductManager from "./Components/ProductManager.js"


const app = express()

const PORT = 8080


app.use(express.urlencoded({ extended: true }))

const products = new ProductManager
const readProducts = products.readProducts()

// Pagina products que devuelve todo los productos y tiene limite
app.get("/products", async (req, res) => {

    // Aplico limite
    let limit = parseInt(req.query.limit)
    // Sino hay limite devuelve todo
    if (!limit) return res.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit)

})


// Pagina pid que devuelve el producto cuyo id es indicado
app.get("/products/:pid", async (req, res) => {

    let id = parseInt(req.params.pid)
    let allProducts = await readProducts
    let productId = allProducts.find((product) => (product.id === id))
    if (!productId) return res.send("Id not found")
    res.send(productId)

})



app.listen(PORT, () => console.log("Server corriendo en puerto: ", PORT))

app.on("error", (error) => console.log("Error en el puerto", PORT))

