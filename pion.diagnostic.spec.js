var all = require('./ignoring/ignoring');

var javascript = require('./ignoring/ignoring.javascript');
var node = require('./ignoring/ignoring.node');
var jasmine = require('./ignoring/ignoring.jasmine');

describe('Running Pion is easy :).', function() {
    
    describe('Pion', function() {
        
        it('should have 0 duplicated lines', function() {       
			var folder = 'app/';
			console.log('Scanning directory ' + folder + ' for lines duplication');
			
            var fileProvider = require('./app/features/utils/lib/directory.file.provider');
            var detectDuplications = require('./app/features/duplication.detection/lib/pion.lines');
			detectDuplications.logger = require('./app/features/utils/lib/console.logger');
            var duplications = detectDuplications.ignoring(
				all([javascript, node, jasmine, [
					
					'inFiles: function(fileProvider) {',
					'contentOf: function(filename) {',
					
					'occurences: [',
					'return duplications;',
					
					/break/,
					
					]])
            ).inFiles(fileProvider(folder));

            expect(duplications.length).toEqual(0);
        });
        
        xit('should have 0 duplicated blocks', function() {
			var folder = 'app/';
			console.log('Scanning directory ' + folder + ' for blocks duplication');
			
            var fileProvider = require('./app/features/utils/lib/directory.file.provider');
            var detectDuplications = require('./app/features/duplication.detection/lib/pion.blocks');
			detectDuplications.logger = require('./app/features/utils/lib/console.logger');
            var duplications = detectDuplications.ignoring(
				all([javascript, node, jasmine, [
					
					'inFiles: function(fileProvider) {',
					'contentOf: function(filename) {',
					
					'occurences: [',
					'return duplications;',
					
					/break/,
					
					]])
            ).inFiles(fileProvider(folder));
			
			console.log(JSON.stringify(duplications, null, 4));

            expect(duplications.length).toEqual(0);
        });
    });

});
