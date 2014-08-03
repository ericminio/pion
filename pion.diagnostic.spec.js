var all = require('./ignoring/ignoring');

var javascript = require('./ignoring/ignoring.javascript');
var node = require('./ignoring/ignoring.node');
var jasmine = require('./ignoring/ignoring.jasmine');
var pion = [
    'ignoring: function(patterns) {',
    'this.patterns = patterns;',
    'inFiles: function(fileProvider, callback) {',
    'contentOf: function(filename) {',
    'module.exports = function(collection) {',
    'return function(item) {',

    'occurences: [',
    'return duplications;',
    'expect(duplications).toEqual([',
    ];

describe('Running Pion is easy :).', function() {
    
    describe('Pion', function() {
        
        it('should have 0 duplicated lines', function(done) {       
            var folder = 'app/';
            console.log('Scanning directory ' + folder + ' for lines duplication');            
            var fileProvider = require('./app/features/utils/lib/directory.file.provider');
            var detectDuplications = require('./app/features/line.duplication.detection/lib/pion.lines');
            detectDuplications.logger = require('./app/features/utils/lib/console.logger');
            
            detectDuplications.ignoring( all([javascript, node, jasmine, pion]) )
                              .inFiles(fileProvider(folder), function(duplications) {
                console.log(JSON.stringify(duplications, null, 4));
                expect(duplications.length).toEqual(0);
                done();
            });
        });
        
        it('should have 0 duplicated blocks', function(done) {
            var folder = 'app/';
            console.log('Scanning directory ' + folder + ' for blocks duplication');
            
            var fileProvider = require('./app/features/utils/lib/directory.file.provider');
            var detectDuplications = require('./app/features/block.duplication.detection/lib/pion.blocks');
            detectDuplications.logger = require('./app/features/utils/lib/console.logger');
            detectDuplications.ignoring( all([javascript, node, jasmine, pion]) )
                              .inFiles(fileProvider(folder), function(duplications) {
                console.log(JSON.stringify(duplications, null, 4));
                expect(duplications.length).toEqual(0);
                done();
            });        
        });
    });

});
