var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) =>{
      res.render("index");
    }
);

router.get('/register.html', (req, res, next) =>{
  res.render("register");
}
);

router.get('/login.html', (req, res, next) =>{
  res.render("login");
}
);

module.exports = router;
