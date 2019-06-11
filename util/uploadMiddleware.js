const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
})

const upload = multer({storage: storage, limits: { fileSize: 4 * 1024 * 1024}});

module.exports = upload