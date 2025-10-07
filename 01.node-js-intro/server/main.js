const express = require('express')
const products = require("./data")
const { nanoid } = require('nanoid')
const cors = require('cors')
const app = express()

const port = 8000

// middleware to parse json data
app.use(express.json())
app.use(cors())
// app.get('/', (req, res) => {    
//   res.send('Hello World!')
// //   console.log('Hello from server console!');

// })

// app.get('/message', (req, res) => {    
//   res.send(`<h2>Hi from server!</h2>`)
// })

app.get('/message', (req, res) => {
  res.send({
    message: "Hi from server!",
    status: "success"
  })
})

// global variables: __dirname, __filename, process, require, module, exports

console.log(__dirname);
// console.log(__filename);

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/views/index.html")
// })

// app.get("/about", (req, res) => {
//     res.sendFile(__dirname + "/views/about.html")
// })

// app.use((req, res) => {
//     res.sendFile(__dirname + "/views/notFound.html")
// })

// middleware

// app.use("", (req, res, next) => {
//     next();
// })

// products = []

// get all products
app.get("/api/products", (req, res) => {
  // res.send(products)
  res.status(200).json({
    message: "Products data fetched successfully",
    data: products
  })
})

// get single product by id
app.get("/api/products/:id", (req, res) => {
  // console.log(req.params);
  // const id = req.params.id
  const { id } = req.params
  // console.log(id, "id");

  const product = products.find((p) => p.id == id)
  console.log(product, "product");

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      data: null
    })
  }

  res.status(200).json({
    message: "Product data fetched successfully",
    data: product
  })
})

// delete a product by id
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const idx = products.findIndex((p) => p.id == id);
  console.log(idx, "index");

  if (idx === -1) {
    return res.status(404).json({
      message: "Product not found",
      data: null
    })
  }

  const deletedProduct = products[idx];

  products.splice(idx, 1)

  res.status(200).json({
    message: "Product deleted successfully",
    data: deletedProduct
  })

})

// add new product
app.post("/api/products", (req, res) => {
  const { title, price, description, category, image } = req.body;

  if (!title || !price || !description || !category || !image) {

    return res.status(400).json({
      message: "All fields are required",
      data: null
    })
  }

  const newProduct = {
    id: nanoid(8),
    title,
    price,
    description,
    category,
    image
  }

  products.push(newProduct)

  res.status(201).json({
    message: "Product created successfully",
    data: newProduct
  })
})

// update a product by id
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, description, category, image } = req.body;

  const idx = products.findIndex((p) => p.id == id);
  if (idx === -1) {
    return res.status(404).json({
      message: "Product not found",
      data: null
    })
  }

  if (!title || !price || !description || !category || !image) {
    return res.status(400).json({
      message: "All fields are required",
      data: null
    })
  }

  const updatedProduct = {
    id,
    title,
    price,
    description,
    category,
    image
  }

  products[18] = updatedProduct;

  res.status(200).json({
    message: "Product updated successfully",
    data: updatedProduct
  })

})


// update a product by id (partial update)
app.patch("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, description, category, image } = req.body;
  const idx = products.findIndex((p) => p.id == id);

  // console.log("title", title);
  // console.log("price", price);
  // console.log("description", description);
  // console.log("category", category);
  // console.log("image", image);
  
  if (idx === -1) {
    return res.status(404).json({
      message: "Product not found",
      data: null
    })
  }

  const existingProduct = products[idx];
  console.log(existingProduct, "existingProduct");
  
  const updatedProduct = {
    id,
    title: title || existingProduct.title,
    price: price || existingProduct.price,
    description: description || existingProduct.description,
    category: category || existingProduct.category,
    image: image || existingProduct.image
  }

  products[idx] = updatedProduct;

  res.status(200).json({
    message: "Product updated successfully",
    data: updatedProduct
  })


})

// http request method: GET, POST, PUT, DELETE, PATCH

app.listen(port, () => {
  console.log(`Example app listening on port ${port}, url: http://localhost:${port}`)
})


