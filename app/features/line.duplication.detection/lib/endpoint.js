var clean = require('../../utils/lib/clean');
var all = require('../../../../ignoring/ignoring');

var javascript = require('../../../../ignoring/ignoring.javascript');
var node = require('../../../../ignoring/ignoring.node');
var jasmine = require('../../../../ignoring/ignoring.jasmine');
var csharp = require('../../../../ignoring/ignoring.csharp');
var nunit = require('../../../../ignoring/ignoring.nunit');
var xml = require('../../../../ignoring/ignoring.xml');

var endpoint = function(request, response, callback) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    
    var query = require('url').parse(request.url, true).query;
    var status = {
        repository: query.repository,
    }
    if (query.repository === undefined) {
        status.error = 'missing repository parameter';
        response.write( JSON.stringify(status) );
        callback();
        return;
    }
    clean.folder('./cloned');
    module.exports.cloner.clone(query.repository, './cloned', function(error) {
        if (error !== undefined) { 
            status.error = error;
            response.write( JSON.stringify(status) );
            callback(); 
            return; 
        }
                
        var fileProvider = require('../../utils/lib/directory.file.provider');
        var detectDuplications = require('./pion.lines');
        
        detectDuplications.ignoring( all([javascript, node, jasmine, csharp, nunit, xml]) )
                          .inFiles(fileProvider('./cloned/'), function(duplications) {
            status.duplicationCount = duplications.length,
            status.duplications = duplications;
            response.write( JSON.stringify(status) );
            callback();        
        });
    });    
};

module.exports = endpoint;
module.exports.cloner = require('../../git.files.provider/lib/git.cloner');