'use strict';

module.exports = function(Listafamiliar) {
    Listafamiliar.beforeRemote('create', function (context, Listafamiliar, next){
        context.args.data.owner = context.req.accessToken.userId;
        next();
    });
    
    Listafamiliar.afterRemote('create', function (context, listafamiliar, next){
        var Usuario = Listafamiliar.app.models.Usuario; //cogemos la tabla de usuario
        Usuario.findById(context.req.accessToken.userId, function(err,objetousuario){
            objetousuario.listaFamiliarId=listafamiliar.id;
            objetousuario.save(function (err){
                next();
            });        
        });                  
    });
    

/**
 * solicitud del usuario para pertenecer a una listafamiliar
 * @param {object} contexto el objeto
 * @param {Function(Error, object)} callback
 */

Listafamiliar.prototype.solicitar = function(contexto, callback) {
  var solicitudexplorer;
  var these=this.id;
  var usuario=contexto.req.accessToken.userId;
  this.hasandbelongstomany.add(usuario, function(err) {
      solicitudexplorer={
          usuarioId:usuario,
          listaFamiliarId:these
      };
      callback(null, solicitudexplorer);
});
};

};
