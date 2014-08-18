delete require.cache[require.resolve('./lib/endpoint')];
var endpoint = require('./lib/endpoint');
var clean = require('../utils/lib/clean');
var fs = require('fs');

describe('Line duplication detection endpoint', function() {
    
    var request, response;
    
    beforeEach(function(done) {
        response = { writeHead: function(){}, write: function(){} };
        
		var exec = require('child_process').exec;
		var rmdir = exec('rm -rf ./cloned', function(rmerror, stdout, stderr) {
			done();
		});
    });
    
    it('returns json', function(done) {
        spyOn(response, 'writeHead');
        endpoint({ url: '?repository=any-repo' }, response, function() {
            expect(response.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'application/json'} );
            done();
        });
    });
    
    it('uses the git cloner', function() {
        expect(endpoint.cloner).toEqual(require('../git.files.provider/lib/git.cloner'));
    });
    
    it('clones the requested repo', function(done) {
        var cloner = { clone: function(repo, folder, afterClone) { afterClone('stop here'); } };
        spyOn(cloner, 'clone').andCallThrough();        
        endpoint.cloner = cloner;
        
        endpoint({ url: '?repository=any-repo' }, response, function() {
            expect(cloner.clone).toHaveBeenCalledWith('any-repo', './cloned', jasmine.any(Function));
            done();
        });
    });
    
    it('searches duplications in the cloned repository', function(done) {
        var cloner = { 
            clone: function(repo, folder, afterClone) { 
                clean.folder('cloned/');	
                fs.writeFileSync('./cloned/one-file.js', 'one line\none line');
                
                afterClone(); 
            } 
        };
        endpoint.cloner = cloner;
        spyOn(response, 'write');
        var status = {
            repository: 'any-repo',
            duplicationCount: 1,
            duplications: [ 
                { 
                    line: 'one line', 
                    occurences: [ 
                        { file: './cloned/one-file.js', lineIndex: 0}, 
                        { file: './cloned/one-file.js', lineIndex: 1 } 
                    ] 
                } 
            ]
        };
        
        endpoint({ url: '?repository=any-repo' }, response, function() {
            expect(response.write).toHaveBeenCalledWith(JSON.stringify(status));
            done();
        });
    });
    
    it('reports error if any', function(done) {
        var cloner = { clone: function(repo, folder, afterClone) { afterClone('something unexpected happened'); } };
        endpoint.cloner = cloner;
        spyOn(response, 'write');
        var status = {
            repository: 'any-repo',
            error: 'something unexpected happened'
        };
        
        endpoint({ url: '?repository=any-repo' }, response, function() {
            expect(response.write).toHaveBeenCalledWith(JSON.stringify(status));
            done();
        });
    });
    
    it('reports missing parameter', function(done) {
        spyOn(response, 'write');
        var status = {
            repository: undefined,
            error: 'missing repository parameter'
        };
        
        endpoint({ url: '' }, response, function() {
            expect(response.write).toHaveBeenCalledWith(JSON.stringify(status));
            done();
        });
    });
    
});