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
  var damelista;
  var ide=this.id;
  Usuario.findById(usuarioId,
  function(err, objetousuario) {
      listaId=objetousuario.listaFamiliarId;
      
      usuario.hasandbelongstomany(function (err, usuariorelacion){console.info(usuariorelacion);
          damelista=usuariorelacion[0].id;
          if(damelista==listaId){
              Usuario.updateAll({id: ide}, {listaFamiliarId:listaId }, function(err, info) {
                  
                });
              usuario.hasandbelongstomany.remove(this,
            function(err) {
          });
          Usuario.find({where:{listaFamiliarId:listaId}},function (err,object){
              callback(err,object);
          });
          }else{
           var respuesta="no existe la peticion";
              callback(err,respuesta);
          }
      });
      
});

  //callback(null, array);
};

/**
 * rechazamos la solicitud que se refleja con el usuario logeado
 * @param {object} contexto morcillon contexto
 * @param {Function(Error, array)} callback
 */

Usuario.prototype.rechazarSolicitud = function(contexto, callback) {
  var array;
  var usuarioId = contexto.req.accessToken.userId;
  var usuario=this; //este es el id del usuario logeado
  var idLista;
  var idusuario=this.id; //este es el id del usuario this
  var solicitud;
  
  Usuario.findById(usuarioId, function(err,objectousuario){
      idLista=objectousuario.listaFamiliarId; //con esto sacamos el listaId del usuario logeado
      
      usuario.hasandbelongstomany(function (err, usuariorelacion){
          solicitud=usuariorelacion[0].id;
          if(solicitud==idLista){
              console.log(usuario);
              usuario.hasandbelongstomany.remove(this, function(err) {
          });
          };
      });
  });

  callback(null, array);
};



};
