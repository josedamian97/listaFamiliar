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

/**
 * si es true lo ponemos false y viceversa de un id de producto
 * @param {object} contexto el morcillon
 * @param {Function(Error, array)} callback
 */

Producto.prototype.comprado = function(contexto, callback) {
  var array;
  var usuarioId = contexto.req.accessToken.userId;
  var idProducto = this.id;
  var estado = this.comprar;
  var listaId= this.listafamiliarId;
  var uzuario = Producto.app.models.Usuario;
  var listaUzuario;
  
  uzuario.findById(usuarioId, function (err,objetousuario){
     listaUzuario=objetousuario.listaFamiliarId;
     
     if(listaId == listaUzuario){
         if(estado == 0){
            Producto.updateAll({id: idProducto}, {comprar: 1}, function(err, info) {
                Producto.find({where:{"listafamiliarId":listaUzuario}}, function(err, array){
          callback(null, array);
      });
        });
        
    
        }else if(estado == 1){
            Producto.updateAll({id: idProducto}, {comprar: 0}, function(err, info) {
                Producto.find({where:{"listafamiliarId":listaUzuario}}, function(err, array){
          callback(null, array);
      });
        });
        
        }
     }else{
         callback("Ese producto no pertenece a la lista del usuario autenticado");
     }
  });
  
  
  
  
};


};
