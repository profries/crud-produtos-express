var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Produto = require('../model/produto')

mongoose.connect("mongodb://localhost/app_produtos");
/* GET produtos listing. */
router.get('/', function(req, res, next) {
  Produto.find(function(err,produtos) {
    if(err){
        res.status(500).send(err);
    }
    else
        res.json(produtos);
  });
});
/* GET produtos by id listing. */
router.get('/:id', function(req, res, next) {
    res.send('respond with a resource '+req.params.id);
  });
/* GET users listing. */
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
  });
/* GET users listing. */
router.put(':id', function(req, res, next) {
    res.send('respond with a resource');
  });
/* GET users listing. */
router.delete(':id', function(req, res, next) {
    res.send('respond with a resource');
  });
        
module.exports = router;
