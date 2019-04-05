var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProdutosSchema = new Schema({
    nome: String,
    preco: Number
});

module.exports = mongoose.model("Produto",ProdutosSchema);