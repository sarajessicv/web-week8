var express = require('express');
const Users = require('../models/Users');
var router = express.Router();


router.get('/', (req, res, next) =>{
      res.json({'email': req.user.email});
    }
);

module.exports = router;
