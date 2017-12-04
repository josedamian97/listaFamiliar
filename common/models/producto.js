'use strict';

module.exports = function(Producto) {
/**
 * poner en "false" el atributo comprar de todos los productos de la lista familiar del usuario logeado
 * @param {object} contexto el morcillon
 * @param {Function(Error, array)} callback
 */

Producto.limpiarLista = function(contexto, callback) {
  var usuarioId = contexto.req.accessToken.userId;
  var Uzuario = Producto.app.models.Usuario;
  var array;
  var listaUzuario;
  Uzuario.findById(usuarioId, function(err,objetoUzuario){
      listaUzuario = objetoUzuario.listaFamiliarId;
      Producto.updateAll({listaFamiliarId: listaUzuario}, {comprar:0}, function(err, info) {
      Producto.find({where:{"listaFamiliarId":listaUzuario}}, function(err, array){
          callback(null, array);
      });
      });
  });
};

};
