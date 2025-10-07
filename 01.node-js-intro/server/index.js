const express = require('express')
const products = require("./data")
const { nanoid } = require('nanoid')
const cors = require('cors')
const app = express()

const port = 8000

// middleware to parse json data
app.use(express.json())
app.use(cors())

// get all products
app.get("/api/products", (req, res) => {
    // const { search, sort = "title", order = "asc", page = 1, limit = 10 } = req.query
    const { search, sort, order, page, limit } = req.query


    // console.log(sort, order);

    let filteredProducts = [...products]

    if (search) {
        const searchValue = search.toLowerCase().trim()
        filteredProducts = products.filter((p) =>
            p.title.trim().toLowerCase().includes(searchValue) || p.description.trim().toLowerCase().includes(searchValue))
    }

    filteredProducts.sort((a, b) => {
        if (sort === "price" && order === "asc") {
            return a.price - b.price
        } else if (sort === "price" && order === "desc") {
            return b.price - a.price
        } else if (sort === "title" && order === "asc") {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        } else if (sort === "title" && order === "desc") {
            return b.title.toLowerCase().localeCompare(a.title.toLowerCase())
        }
    })
    let totalItems = filteredProducts.length
    
    const totalPages = Math.ceil(totalItems / limit)
    if (page && limit) {
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + parseInt(limit)
        filteredProducts = filteredProducts.slice(startIndex, endIndex)
    }


    res.status(200).json({
        message: "Products data fetched successfully",
        data: filteredProducts,
        totalItems: totalItems || filteredProducts.length,
        totalPages,
        currentPage: parseInt(page)
    })
})

// get single product by id
app.get("/api/products/:id", (req, res) => {

    const { id } = req.params

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


