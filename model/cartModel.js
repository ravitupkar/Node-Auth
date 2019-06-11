var mongoose = require('mongoose');
 
var cartSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_id: String,
    product_quantity: String,
    product_user_id: String,
    created: { 
        type: Date,
        default: Date.now
    }
});
 
var Cart = mongoose.model('Cart', cartSchema);
 
module.exports = Cart;