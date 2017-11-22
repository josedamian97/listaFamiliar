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
};
