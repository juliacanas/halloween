var express = require('express');
var router = express.Router();
const User = require("../model/User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/signup',(req, res, next)=>{
  const {email} = req.body
  if (email === "") {
    res.render("index", {
      errorMessage: "Introduce tu email para ver los datos de la fiesta"
    });
    return;
  }

  User.create({email})
    .then(
      res.redirect('/private/private-info')
    )
    .catch(err => console.log(err))

})


module.exports = router;
