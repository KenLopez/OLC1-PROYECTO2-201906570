var express = require('express');
var router = express.Router();
var parser = require('./analizador/gramatica');
var fs = require('fs')

/* GET users listing. */
router.post('/compilar', function(req, res, next){
  try {
    var program = parser.parse(req.body.codigo)
    let imagen = program.graficar()
    res.send({data: program.getOutput(), errores: program.getErrors(), symbols: program.getSymbols(), ast:imagen})
  } catch (error) {
    res.send({data:"No compiló D:", errores:[], symbols:[], ast:null})
  }
})
module.exports = router;