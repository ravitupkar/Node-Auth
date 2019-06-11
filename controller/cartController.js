const mongoose = require('mongoose');
const uri = "mongodb+srv://ravitupkar01:ravitupkar01@cluster0ravi-flkid.mongodb.net/shop?retryWrites=true";
mongoose.connect(uri,  { useNewUrlParser: true }, function (err) {
    if (err) throw err;
//    console.log('Successfully connected');
});

const Cart  = require('../model/cartModel'); // import user model 



module.exports.AddToCart = (req, res) =>{
    console.log(req.header('Referer'));
    const addToCart  = new Cart({
        _id: new mongoose.Types.ObjectId(),
        product_id : req.body.product_id,
        product_quantity : req.body.product_quantity,
        product_user_id : req.body.product_user_id
    });

    // console.log(userRegiter);
    addToCart.save((err , user) => {
        if(err){
            console.log(err.message);
            backURL=req.header('Referer') || '/';
            // do your thang
            res.redirect(backURL);
            
        }else{
            console.log(req.header('Referer'));
            backURL=req.header('Referer') || '/';
            // do your thang
            res.redirect(backURL);
        }

    });
}

    // do login editProduct
module.exports.getCart = (req, res, next) => {
    let { UserId, Username } = req.session;
    // console.log(req.body);
    Cart.find({product_user_id : UserId}, function (err, cart) {
        if(err){
            throw err;
        }else{
            console.log(cart);
        }
    });
}