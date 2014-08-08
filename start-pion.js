var endpoint = require('./app/features/line.duplication.detection/lib/endpoint');

require('http').createServer(function(request, response) {
    endpoint(request, response, function() {
        response.end();        
    });
}).listen(process.env.PORT || 5000);
