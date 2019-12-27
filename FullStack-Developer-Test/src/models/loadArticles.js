var http = require('https');
 
/**
 * Carga de los parámetros genéricos del servicio RESTful
 */
var host = 'hn.algolia.com';
var params = 'query=nodejs';
/**
 * Función encargada de recuperar todos los usuarios.
 */
exports.loadUsers = function(next) {
    var path = '/api/v1/search_by_date';
 console.log("J 01");
    var options = {
        host: host,
        port: null,
        path: path,
        method: 'GET',
        encoding: null,
        query: params
    };
    console.log("J 00009");
    // Se invoca el servicio RESTful con las opciones configuradas previamente y sin objeto JSON.
    invocarServicio(options, null, function (users, err) {
        if (err) {
            next(null, err);
        } else {
            next(users, null);
        }
    });
};


/**
 * Función encargada de invocar los servicios RESTful y devolver
 * el objeto JSON correspondiente.
 */
function invocarServicio(options, jsonObject, next) {
    //console.log("J 0002");
    var req = http.request(options, function(res) {
//console.log("J 001");
//console.log(res.headers ) ;
        var contentType = res.headers['content-type'];
  //      console.log("J 02");
//        console.log(contentType);
        /**
         * Variable para guardar los datos del servicio RESTfull.
         */
        var data = '';
 
        res.on('data', function (chunk) {
            // Cada vez que se recojan datos se agregan a la variable
            data += chunk;

        }).on('end', function () {
            // Al terminar de recibir datos los procesamos
            var response = null;
 //console.log(data);
 
            // Nos aseguramos de que sea tipo JSON antes de convertirlo.
            if (contentType.indexOf('application/json') != -1) {

                response = JSON.parse(data);
//            console.log(response.hits[0].created_at)
//                console.log(profile.d.results[0].po_number);
            }

            // Invocamos el next con los datos de respuesta
            next(response, null);
        })
        .on('error', function(err) {
            // Si hay errores los sacamos por consola
            console.error('Error al procesar el mensaje: ' + err)
        })
        .on('uncaughtException', function (err) {
            // Si hay alguna excepción no capturada la sacamos por consola
            console.error(err);
        });
    }).on('error', function (err) {
        // Si hay errores los sacamos por consola y le pasamos los errores a next.
        console.error('HTTP request failed: ' + err);
        next(null, err);
    });
 
    // Si la petición tiene datos estos se envían con la request
    if (jsonObject) {
        req.write(jsonObject);
    }
 
    req.end();
};