import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields;

        const requiredFields = {
            name: "Name is required.",
            description: "Description is required.",
            price: "Price is required.",
            category: "Category is required.",
            quantity: "Quantity is required.",
            brand: "Brand is required."
        };

        for (const [field, message] of Object.entries(requiredFields)) {
            if (!req.fields[field]) {
                return res.json({ error: message });
            }
        }

        const product = new Product({ ...req.fields });
        await product.save();
        res.json(product);
    } catch(e) {
        console.error(e);
        res.status(400).json(e.message);
    }
});

const updateProductDetails = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields;

        const requiredFields = {
            name: "Name is required.",
            description: "Description is required.",
            price: "Price is required.",
            category: "Category is required.",
            quantity: "Quantity is required.",
            brand: "Brand is required."
        };

        for (const [field, message] of Object.entries(requiredFields)) {
            if (!req.fields[field]) {
                return res.json({ error: message });
            }
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { ... req.fields }, { new: true });
        await product.save();
        res.json(product);
    } catch(e){
        console.error(e);
        res.status(400).json(e.message);
    }
})

const removeProduct = asyncHandler(async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch(e){
        console.error(e);
        res.status(500).json({error: "Server error"});
    }
})

const fetchProducts = asyncHandler(async (req, res) => {
    try{
        const pageSize = 6;
        const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};
        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword }).limit(pageSize);

        res.json({
            products, 
            page: 1, 
            pages: Math.ceil(count / pageSize), 
            hasMore: false
        });

    } catch(e){
        console.error(e);
        res.status(500).json({error: "Server error"});
    }
})

const fetchProductById = asyncHandler(async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            return res.json(product);
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    } catch(e){
        console.error(e);
        res.status(404).json({error: "Product not found"});
    }
})

const fetchAllProducts = asyncHandler(async (req, res) => {
    try{
        const products = await Product.find({})
            .populate('category')
            .limit(50)
            .sort({ createdAt: 1 });
        
        res.json(products);

    } catch(e){
        console.error(e);
        res.status(500).json({error: "Server error"});
    }
})

const addProductReview = asyncHandler(async (req, res) => {
    try{
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if(product){
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());

            if(alreadyReviewed){
                res.status(400);
                throw new Error("You already reviewed this product");
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id,
            }

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    } catch(e){
        console.error(e);
        res.status(400).json(e.message);
    }
})

const fetchTopProducts = asyncHandler(async (req, res) => {
    try{
        const products = await Product.find({}).sort({ rating: -1 }).limit(4);
        res.json(products);
    } catch(e){
        console.error(e);
        res.status(400).json({error: "Server error"});
    }
})

const fetchNewProducts = asyncHandler(async (req, res) => {
    try{
        const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
        res.json(products);
    } catch(e){
        console.error(e);
        res.status(400).json({error: "Server error"});
    }
})

const filterProducts = asyncHandler(async (req, res) => {
    try{
        const {checked, radio} = req.body;

        let args = {};

        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]};

        const products = await Product.find(args);

        res.json(products);
    } catch(e) {
        console.error(e);
        res.status(500).json({error: "Server error"})
    }
})

export { 
    addProduct,
    updateProductDetails, 
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts
};