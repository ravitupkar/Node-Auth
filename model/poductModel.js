var mongoose = require('mongoose');
 
var productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_name: String,
    product_sku: String,
    product_old_price: String,
    product_dis_price: String,
    product_desc: String,
    product_picture: [],
    product_star: String,
    product_cat: String,
    available_quantity: String,
    product_weight: String,
    percentage_discount: String,
    stock_alert: String,
    stock_critical: String,
    online_date: String,
    author: String,
    enable_display: String,
    comment: String,
    approuved_by: String,
    filebutton: String,
    product_highlights: {
        fabric: {
            type: String
        },
        pattern: {
            type: String
        },
        type: {
            type: String
        },
        fit : String
    },
    created: { 
        type: Date,
        default: Date.now
    }
});
 
var Products = mongoose.model('Products', productSchema);
 
module.exports = Products;