const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: [true, 'product name must be provide']
    },
    price: {
        type: Number,
        required: [true, 'product price must be provide']
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        },
        required: [true, 'product company must be provide']
    }
})

const Product = mongoose.model('products', productSchema)

module.exports = Product