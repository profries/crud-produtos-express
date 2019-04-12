var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../model/usuario')

mongoose.connect("mongodb://localhost/app_produtos");
router.get('/', function(req, res, next) {
  Usuario.find(function(err,usuarios) {
    if(err){
        res.status(500).send(err);
    }
    else
        res.json(usuarios);
  });
});

router.get('/:id', function(req, res, next) {
  Usuario.findById(req.params.id, function(error, usuario) {
    if(error) 
      res.send(error);
    res.json(usuario);
  });
});

router.get('/username/:username', function(req, res, next) {
    Usuario.findOne({'username':req.params.username}, 
    function(error, usuario) {
      if(error) 
        res.send(error);
      res.json(usuario);
    });
  });
/* POST user */
router.post('/', function(req, res, next) {
    var usuario = new Usuario();
    usuario.nome = req.body.nome;
    usuario.username = req.body.username;
    usuario.senha = req.body.senha;
    usuario.save(function(error) {
      if(error)
        res.status(500).send(err);
                        
      res.sendStatus(201);
    });
  });

router.put('/:id', function(req, res, next) {
  console.log("PUT ", req.params.id);
  Usuario.findById(req.params.id, function(error, usuario) {
    if(error) 
      res.send(error);
    
      usuario.nome = req.body.nome;
      usuario.username = req.body.username;
      usuario.senha = req.body.senha;
    
      usuario.save(function(error) {
      if(error)
        res.send(error);
      //Se não teve erro, retorna response normal (200)
      res.sendStatus(200);
    });
  });
});

router.delete('/:id', function(req, res, next) {
  console.log("Delete ", req.params.id);
  Usuario.remove({
    _id: req.params.id
  }, function(error) {
    if(error)
      res.send(error);
    //Se não teve erro, retorna response normal (200)
    res.sendStatus(200);
  });
});
        
module.exports = router;
