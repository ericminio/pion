var endpoint = require('./lib/endpoint');

describe('Line duplication detection endpoint', function() {
    
    var request, response;
    
    beforeEach(function() {
        response = { writeHead: function(){}, write: function(){} };
    });
    
    it('returns json', function(done) {
        spyOn(response, 'writeHead');
        endpoint(request, response, function() {
            expect(response.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'application/json'});
            done();
        });
    });
    
    it('returns in-construction message', function(done) {
        spyOn(response, 'write');
        
        endpoint(request, response, function() {
            expect(response.write).toHaveBeenCalledWith( JSON.stringify({ status: 'in construction' }) );
            done();
        });
    });
});