const Product = require('../models/Product');

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body)
        try {
            await newProduct.save();
            res.status(200).json("product created");
        } catch (error) {
            res.status(500).json("failed to create product");
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find.sort({createdAt: -1})
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json("failed to get the products");
        }
    },

    getProduct: async (req, res) => {
        const productId = req.params.id
        try {
            const product = await Product.findById(productId)
            const {__V, createdAt, productData} = product._doc; 
            res.status(200).json(productData);
        } catch (error) {
            res.status(500).json("failed to get the product");
        }
    },

    searchProducts: async (req, res) => {
        try {
            const results = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "shoes",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(results)
        } catch (error) {
            res.status(500).json("failed to get the products");
        }
    }

}