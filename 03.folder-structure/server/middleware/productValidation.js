const productValidation = (req, res, next) => {
    const { title, price, description, category } = req.body;

    console.log("test");
    
    console.log(req.body);
    
    if (!title || !price || !description || !category) {
        return res.status(400).json({
            message: 'All fields are required',
            status: 'error'
        })
    }

    next()
}

module.exports = productValidation