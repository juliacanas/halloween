var express = require('express');
var router = express.Router();
const User = require("../model/User");

const { isNotLoggedIn } = require("../middlewares/authMiddlewares");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/info', isNotLoggedIn, (req, res, next) => {
  const user = req.session.currentUser;
  res.render('info', {
    user
  });
});

router.post('/',(req, res, next)=>{
  const {email} = req.body
  if (email === "") {
    res.render("index", {
      errorMessage: "Introduce tu email para ver los datos de la fiesta"
    });
    return;
  }

 User.create({email})
    .then(user =>{
      req.session.currentUser = user;
      res.redirect('info');}
    )
    .catch(err => console.log(err))

})


module.exports = router;
