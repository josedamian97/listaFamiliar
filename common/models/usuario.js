'use strict';

module.exports = function(Usuario) {

/**
 * le enviamos el id del usuario y si tiene alguna solicitud en la lista de miembros, se le aprobara la solicitud
 * @param {object} contexto el morcillon
 * @param {Function(Error, array)} callback
 */

Usuario.prototype.aceptarSolicitud = function(contexto, callback) {
  var array;
  var usuarioId = contexto.req.accessToken.userId;
  var usuario=this;
  var listaId;
  
  Usuario.findById(usuarioId,
  function(err, objetousuario) {
      listaId=objetousuario.listaFamiliarId;
  });

  Usuario.hasnadbelongstomany({where:{"",
  function(err, usuariometodo) {
  
});
  //callback(null, array);
};


};
