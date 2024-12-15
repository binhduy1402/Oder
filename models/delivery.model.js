const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    user: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    state: { type: String, required: true },
    status: { type: String, required: true },
    total: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
