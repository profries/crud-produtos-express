var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../model/usuario')

mongoose.connect("mongodb://localhost/app_produtos");
router.post('/', function(req, res, next) {
    
    if (!req.body.username || !req.body.senha)
        res.sendStatus(401);

    Usuario.findOne({'username':req.body.username}, 
    function(error, usuario) {
      if(error) 
        res.send(error);
      else if(!usuario || usuario==null)
        res.sendStatus(401);
      else if(usuario.senha==req.body.senha){
        var token = jwt.sign({
            id: usuario.id
          }, 'SEN@CR$', { expiresIn: '1h' });
        res.status(201).send({"token":token});
      }
      else
        res.sendStatus(401);
    });

    /*usuario.save(function(error) {
      if(error)
        res.status(500).send(err);
                        
      res.sendStatus(201);
    });*/
  });

  function validaUsuario(req, res, next){
    var token = req.get("x-auth-token");
    if(!token)
      res.status(403).send("Nao tem o token de acesso!");
    else{
      jwt.verify(token,'SEN@CR$',function(err,userId){
        if(err) 
          res.status(401).send(err);
        else {
          console.log(userId);
          next();
        }   
      });
    }
  }
  module.exports = {router,validaUsuario};