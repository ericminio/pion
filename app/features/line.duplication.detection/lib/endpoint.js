var clean = require('../../utils/lib/clean');
var all = require('../../../../ignoring/ignoring');

var javascript = require('../../../../ignoring/ignoring.javascript');
var node = require('../../../../ignoring/ignoring.node');
var jasmine = require('../../../../ignoring/ignoring.jasmine');
var csharp = require('../../../../ignoring/ignoring.csharp');
var nunit = require('../../../../ignoring/ignoring.nunit');
var xml = require('../../../../ignoring/ignoring.xml');
var python = require('../../../../ignoring/ignoring.python');
var nose = require('../../../../ignoring/ignoring.nose');
var java = require('../../../../ignoring/ignoring.java');
var ruby = require('../../../../ignoring/ignoring.ruby');

var fs = require('fs');
var fileProvider = require('../../utils/lib/directory.file.provider');
var detectDuplications = require('./pion.lines');

var withError = function(error, status, response, callback) {
    status.error = error;
    response.write( JSON.stringify(status) );
    callback();
};

var endpoint = function(request, response, callback) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    
    var query = require('url').parse(request.url, true).query;
    var status = {
        repository: query.repository,
    }
    if (query.repository === undefined) { return withError('missing repository parameter', status, response, callback); }

    clean.folder('./cloned');
    module.exports.cloner.clone(query.repository, './cloned', function(error) {
        if (error !== undefined) { return withError(error, status, response, callback); }
                
        var specificPatternToIgnore = [];
        var includingFilenamesMatching = [ /\.js$/, /\.cs$/, /\.py$/, /\.java$/, /\.rb$/ ];
        var excludingFilenamesMatching = [ /^bootstrap\.js$/ ];

        if (fs.existsSync('./cloned/pion.json')) {
            var pionJson = fs.readFileSync('./cloned/pion.json').toString();
            
            try {
                var pionConfig = JSON.parse(pionJson);
                if (! Array.isArray(pionConfig.ignoringLinesMatching)) { 
                    return withError('missing array ignoringLinesMatching in pion.json', status, response, callback); 
                }

                specificPatternToIgnore = pionConfig.ignoringLinesMatching;
            }
            catch (Exception) { return withError('mal-formed pion.json', status, response, callback); }                        
        }        
        var allPatternsToIgnore = all([javascript, node, jasmine, csharp, nunit, xml, python, nose, java, ruby, specificPatternToIgnore]);                                             
        var clonedRepository = fileProvider('./cloned/').including(includingFilenamesMatching).excluding(excludingFilenamesMatching);
        
        detectDuplications.ignoring(allPatternsToIgnore)                          
                          .inFiles(clonedRepository, function(duplications) {
            status.duplicationCount = duplications.length,
            status.duplications = duplications;
            response.write( JSON.stringify(status) );
            callback();        
        });
    });    
};

module.exports = endpoint;
module.exports.cloner = require('../../git.files.provider/lib/git.cloner');