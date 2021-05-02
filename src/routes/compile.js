var express = require('express');
var router = express.Router();
var parser = require('./analizador/gramatica');

/* GET users listing. */
router.post('/compilar', function(req, res, next){
  try {
    var program = parser.parse(req.body.codigo)
    res.statusCode = 200
    res.send({data: program.getOutput(), errores: program.getErrors(), symbols: program.getSymbols()})
  } catch (error) {
    res.send({data:"No compiló D:", errores:[]})
  }
})
module.exports = router;