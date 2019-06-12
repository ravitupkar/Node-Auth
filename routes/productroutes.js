const express = require('express');
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');
const uri = "mongodb+srv://ravitupkar01:ravitupkar01@cluster0ravi-flkid.mongodb.net/shop?retryWrites=true";
mongoose.connect(uri,  { useNewUrlParser: true }, function (err) {
    if (err) throw err;
//    console.log('Successfully connected');
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ravitupkar02@gmail.com',
    pass: 'rv8983411542'
  }
});



const Product  = require('../model/poductModel'); // import user model 

const AuthController = require('../controller/authController'); // import  authController

const ProductController = require('../controller/productController'); // import  authController

const CartController = require('../controller/cartController'); // import  authController

const upload = require('../util/uploadMiddleware');

// const Resize = require('../util/Resize');

const productRouter   = express.Router(); // get route object

productRouter.use(AuthController.getUser);

productRouter.use('/user-home', AuthController.redirectToLogin, ProductController.allProduct);   // dashboard page view

productRouter.use('/product-details/:id', AuthController.redirectToLogin, ProductController.productDetails);   // dashboard page view
productRouter.use('/product-share/:id', AuthController.redirectToLogin, ProductController.productShare);  
productRouter.get('/add-product', AuthController.redirectToLogin, ProductController.addProduct);   // dashboard page view

productRouter.post('/save-product', upload.single('product_picture'), ProductController.saveProduct);   // dashboard page view

productRouter.get('/product-list', AuthController.redirectToLogin, ProductController.productList);   // dashboard page view

productRouter.get('/product-edit/:id', AuthController.redirectToLogin, ProductController.productedit);   // dashboard page view

productRouter.get('/product-view/:id', AuthController.redirectToLogin, ProductController.productview);   // dashboard page view

productRouter.get('/product-delete/:id', AuthController.redirectToLogin, ProductController.productdelete);   // dashboard page view

productRouter.post('/product-update', upload.single('product_picture'), ProductController.productUpdate);   // dashboard page view

productRouter.post('/share-email',(req, res) =>{

  var SubjectData = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
  </head>
  <body>
  <div class="container">
  `+req.body.subject+`
  <span class="pull-right">
  <i id="dislike2" class="glyphicon glyphicon-thumbs-down"><img src="https://www.sccpre.cat/mypng/full/14-141104_like-thumb-up-vote-comments-campanita-de-notificaciones.png" width="100"></i> 
<i id="like2" class="glyphicon glyphicon-thumbs-up"><img src="https://banner2.kisspng.com/20180702/cpg/kisspng-thumb-signal-gesture-finger-clip-art-thumbs-down-5b39a5d55c3126.7225102615305046613776.jpg" width="100"></i> 
                    </span>
  </div>
  </body>
  </html>`;
   var mailOptions = {
    from: 'ravitupkar02@gmail.com',
    to: req.body.hiddenEmail,
    subject: 'rate this',
    html: SubjectData
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

productRouter.post('/testAjax',(req, res) =>{
    // console.log(req.body.data);
    Product.findOne({_id : req.body.data}, function (err, product) {
      if(err){
          throw err;
      }else{
          console.log(JSON.stringify(product));
          res.send(JSON.stringify(product));
      }
    });
});



productRouter.post('/testCart', CartController.AddToCart);

productRouter.get('/getCart', CartController.getCart);

productRouter.get('/upload', async function (req, res) {
  await res.render('file-upload.ejs');
});

productRouter.post('/uploadfile', upload.array('product_picture', 12), (req, res, next) => {
    const file = req.files
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }

    var images = file.map(function(item) {
      return item.filename;
    });
    console.log(images);
    // res.send(images);

    // console.log(file.filename);

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
        product_picture: images,
        filebutton: req.body.filebutton

    });

    console.log(addProduct);

    addProduct.save((err , product) => {
        if(err){
            console.log(err.message);
            
        }else{
          console.log(product);
            console.log("Product Saved Sucssefully");
            res.redirect('/add-product');
        }

    });
    
  });

  productRouter.get('/uploadmultiplepage', (req, res, next) => {
      res.send(`
      <form action="/uploadmultiple" method="post" enctype="multipart/form-data">
        <input type="file" name="myFiles" multiple>
        <input type="submit" value="Upload">
    </form>
      `);
    
  });

  productRouter.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
  const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }

  var op = files.map(function(item) {
    return item.filename;
  });
  console.log(op);
  res.send(op);
  
});

productRouter.post('/file-upload', upload.single('image'), async function (req, res) {
  const imagePath = path.join(__dirname, '/public/images');
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ name: filename });
});

module.exports = productRouter;