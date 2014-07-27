var all = require('./ignoring/ignoring');

var javascript = require('./ignoring/ignoring.javascript');
var node = require('./ignoring/ignoring.node');
var jasmine = require('./ignoring/ignoring.jasmine');

describe('Running Pion is easy :).', function() {
    
    describe('Pion', function() {
        
        it('should have 0 duplicated lines', function() {       
            var fileProvider = require('./app/features/utils/lib/directory.file.provider');
            var detectDuplications = require('./app/features/duplication.detection/lib/pion.lines');
			detectDuplications.logger = require('./app/features/utils/lib/console.logger');
            var duplications = detectDuplications.ignoring(
				all([javascript, node, jasmine, [
					
					'inFiles: function(fileProvider) {',
					'occurences: [',
					'return duplications;',
					
					]])
            ).inFiles(fileProvider('app/'));

            expect(duplications.length).toEqual(0);
        });
        
        xit('should have 0 duplicated blocks', function() {
            var fileProvider = require('./app/features/utils/lib/directory.file.provider');
            var detectDuplications = require('./app/features/duplication.detection/lib/pion.blocks');
            var duplications = detectDuplications.inFiles(fileProvider('app/'));

            expect(duplications.length).toEqual(0);
        });
    });

});
