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
    
    it('ignores patterns given in pion.json', function(done) {
        var cloner = { 
            clone: function(repo, folder, afterClone) { 
                clean.folder('cloned/');	
                fs.writeFileSync('./cloned/one-file.js', 'one line\none line');                
                var pionJsonContent = '{ "ignoringLinesMatching": [ "one line" ] }';
                fs.writeFileSync('./cloned/pion.json', pionJsonContent);
                
                afterClone(); 
            } 
        };
        endpoint.cloner = cloner;
        spyOn(response, 'write');
        var status = {
            repository: 'any-repo',
            duplicationCount: 0,
            duplications: [ ]
        };
        
        endpoint({ url: '?repository=any-repo' }, response, function() {
            expect(response.write).toHaveBeenCalledWith(JSON.stringify(status));
            done();
        });
    });
    
    it('reports a mal-formed pion.json', function(done) {
        var cloner = { 
            clone: function(repo, folder, afterClone) { 
                clean.folder('cloned/');	
                fs.writeFileSync('./cloned/one-file.js', 'one line\none line');                
                var pionJsonContent = 'anything';
                fs.writeFileSync('./cloned/pion.json', pionJsonContent);
                
                afterClone(); 
            } 
        };
        endpoint.cloner = cloner;
        spyOn(response, 'write');
        var status = {
            repository: 'any-repo',
            error: 'mal-formed pion.json'
        };
        
        endpoint({ url: '?repository=any-repo' }, response, function() {
            expect(response.write).toHaveBeenCalledWith(JSON.stringify(status));
            done();
        });
    });
    
    it('reports a missing ignoringLinesMatching in pion.json', function(done) {
        var cloner = { 
            clone: function(repo, folder, afterClone) { 
                clean.folder('cloned/');	
                fs.writeFileSync('./cloned/one-file.js', 'one line\none line');                
                var pionJsonContent = '{}';
                fs.writeFileSync('./cloned/pion.json', pionJsonContent);
                
                afterClone(); 
            } 
        };
        endpoint.cloner = cloner;
        spyOn(response, 'write');
        var status = {
            repository: 'any-repo',
            error: 'missing array ignoringLinesMatching in pion.json'
        };
        
        endpoint({ url: '?repository=any-repo' }, response, function() {
            expect(response.write).toHaveBeenCalledWith(JSON.stringify(status));
            done();
        });
    });
    
    it('reports a mal-formed ignoringLinesMatching in pion.json', function(done) {
        var cloner = { 
            clone: function(repo, folder, afterClone) { 
                clean.folder('cloned/');	
                fs.writeFileSync('./cloned/one-file.js', 'one line\none line');                
                var pionJsonContent = '{"ignoringLinesMatching":"anything"}';
                fs.writeFileSync('./cloned/pion.json', pionJsonContent);
                
                afterClone(); 
            } 
        };
        endpoint.cloner = cloner;
        spyOn(response, 'write');
        var status = {
            repository: 'any-repo',
            error: 'missing array ignoringLinesMatching in pion.json'
        };
        
        endpoint({ url: '?repository=any-repo' }, response, function() {
            expect(response.write).toHaveBeenCalledWith(JSON.stringify(status));
            done();
        });
    });
});