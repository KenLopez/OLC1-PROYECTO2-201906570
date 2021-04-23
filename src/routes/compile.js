var express = require('express');
var parser = require('./analizador/gramatica')

/* GET users listing. */
router.post('/parse', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;