var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProdutosSchema = new Schema({
    nome: String,
    marca: String,
    preco: Number
},{
    versionKey:false
});

module.exports = mongoose.model("Produto",ProdutosSchema);