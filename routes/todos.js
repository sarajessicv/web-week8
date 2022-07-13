var express = require('express');
const Todo = require('../models/Todo');
var router = express.Router();


router.post('/', (req, res, next) =>{
    Todo.findOne({ user: req.user._id}, (err, user) => {
        if (err) {
          console.log(err);
          throw err
        };
        if (user) {
          (req.body.items).forEach(item => {
            user.items.push(item);
          });
          user.save((err) => {
            if(err) throw(err)
            else res.send("ok");
          });
        } else {
            Todo.create(
                {
                    user: req.user._id,
                    items: req.body.items
                },
                (err, ok) => {
                    if (err) throw err;
                    return res.send("ok");
                }
            )
        }
    }
);
});

module.exports = router;
