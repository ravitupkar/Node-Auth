const mongoose = require('mongoose');
const uri = "mongodb+srv://ravitupkar01:ravitupkar01@cluster0ravi-flkid.mongodb.net/shop?retryWrites=true";
mongoose.connect(uri,  { useNewUrlParser: true }, function (err) {
    if (err) throw err;
//    console.log('Successfully connected');
});

const Product  = require('../model/poductModel'); // import user model 

// do login editProduct
module.exports.allProduct = (req, res, next) => {
    let { UserId, Username } = req.session;
    // console.log(req.body);
    Product.find({}, function (err, products) {
        if(err){
            throw err;
        }else{
            console.log(products);
            console.log(products[6].product_picture.length);
            res.render('user-index.ejs', {
                UserId: UserId,
                Username: Username,
                products : products

            });
        }
    });
}

module.exports.productList = (req, res, next) => {
    let { UserId, Username } = req.session;
    // console.log(req.body);
    Product.find({}, function (err, products) {
        if(err){
            throw err;
        }else{
            console.log(products);
            res.render('product-list.ejs', {
                UserId: UserId,
                Username: Username,
                products : products

            });
        }
    });
}

module.exports.productedit = (req, res, next) => {
    let { UserId, Username } = req.session;
    console.log(req.params);
    ProductID =  req.params.id;
    Product.findOne({_id : ProductID}, function (err, product) {
        if(err){
            throw err;
        }else{
            console.log(product);
            res.render('product-edit.ejs', {
                UserId: UserId,
                Username: Username,
                product : product

            });
        }
    });
}

module.exports.productDetails = (req, res, next) => {
    let { UserId, Username } = req.session;
    console.log(req.params.id);
    console.log(req.session);
    ProductID =  req.params.id;
    Product.findOne({_id : ProductID}, function (err, product) {
        if(err){
            throw err;
        }else{
            console.log(product);
            res.render('product-details.ejs', {
                UserId: UserId,
                Username: Username,
                product : product

            });
        }
    });
    // res.render('product-details.ejs', {
    //     UserId: UserId,
    //     Username: Username
    // }); 
}

module.exports.productUpdate = (req, res, next) => {
    let { UserId, Username } = req.session;
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    console.log(file.filename);

    console.log(req.body);
    ProductID =  req.body._id;
    Product.findByIdAndUpdate({_id : ProductID},
        {
            $set :
        
        {   product_sku: req.body.product_sku,
            product_name: req.body.product_name,
            product_cat: req.body.product_cat,
            product_old_price: req.body.product_old_price,
            product_dis_price: req.body.product_dis_price,
            product_desc: req.body.product_desc,
            available_quantity: req.body.available_quantity,
            product_weight: req.body.product_weight,
            percentage_discount: req.body.percentage_discount,
            stock_alert: req.body.stock_alert,
            stock_critical: req.body.stock_critical,
            online_date: req.body.online_date,
            author: req.body.author,
            enable_display: req.body.enable_display,
            comment: req.body.comment,
            product_picture: file.filename,
            approuved_by: req.body.approuved_by,
        }}, 
        function (err, product) {
        if(err){
            throw err;
        }else{
            res.redirect('/product-list');
        }
    });
}

module.exports.productview = (req, res, next) => {
    let { UserId, Username } = req.session;
    // console.log(req.body);
    ProductID =  req.params.id;
    Product.findOne({_id : ProductID}, function (err, product) {
        if(err){
            throw err;
        }else{
            console.log(product);
            res.render('product-edit.ejs', {
                UserId: UserId,
                Username: Username,
                product : product

            });
        }
    });
}

module.exports.productdelete = (req, res, next) => {
    let { UserId, Username } = req.session;
    // console.log(req.body);
    ProductID =  req.params.id;
    Product.findByIdAndRemove({_id : ProductID}, function (err, products) {
        if(err){
            throw err;
        }else{
            res.redirect('/product-list');
        }
    });
}

module.exports.addProduct = (req, res, next) => {
    let { UserId, Username } = req.session;
    // console.log(UserId);
    // console.log(Username);
    res.render('add-product.ejs', {
        UserId: UserId,
        Username: Username,
    });
}

module.exports.saveProduct = (req, res, next) => {
        console.log(req.body);
        const addProduct  = new Product({
            _id: new mongoose.Types.ObjectId(),
            product_sku: req.body.product_sku,
            product_name: req.body.product_name,
            product_cat: req.body.product_cat,
            product_old_price: req.body.product_old_price,
            product_dis_price: req.body.product_dis_price,
            product_desc: req.body.product_desc,
            available_quantity: req.body.available_quantity,
            product_weight: req.body.product_weight,
            percentage_discount: req.body.percentage_discount,
            stock_alert: req.body.stock_alert,
            stock_critical: req.body.stock_critical,
            online_date: req.body.online_date,
            author: req.body.author,
            enable_display: req.body.enable_display,
            comment: req.body.comment,
            approuved_by: req.body.approuved_by,
            product_picture: req.body.product_picture,
            filebutton: req.body.filebutton

        });
    
        addProduct.save((err , product) => {
            if(err){
                console.log(err.message);
                
            }else{
                console.log("Product Saved Sucssefully");
                res.redirect('/add-product');
            }
    
        });

}
    