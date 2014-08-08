module.exports = function(request, response, callback) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write( JSON.stringify({ status: 'in construction' }) );

    callback();
};