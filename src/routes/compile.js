var express = require('express');
var router = express.Router();
var parser = require('./analizador/gramatica');

/* GET users listing. */
router.post('/compilar', function(req, res, next){
  try {
    //var program = parser.parse(req.body.codigo)
    res.send('Compiló :D')
  } catch (error) {
    res.send('No Compiló D:')
  }
})
module.exports = router;