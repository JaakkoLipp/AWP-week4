var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/recipe/:food', (req, res) => {

  const foodname = req.params.food;
  res.json( { name:foodname, instructions:["prep", "cook", "eat"], ingredients:["food 1", "food 2", "food 3"] } );

});

module.exports = router;
