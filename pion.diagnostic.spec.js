describe('Running Pion is easy :).', function() {
    
    describe('Pion', function() {
        
        it('should have 0 duplicated lines', function() {       
            var fileProvider = require('./app/features/utils/lib/directory.file.provider');
            var detectDuplications = require('./app/features/duplication.detection/lib/pion.lines');
			detectDuplications.logger = require('./app/features/utils/lib/console.logger');
            var duplications = detectDuplications.ignoring([
                '});',
                ']);',
                '{',
                '}',
                '},',
                'return {',
                '};',
                ']',
                /require/,
                /describe/,
                '}]);',
                'module.exports = {',                                    
            ]).inFiles(fileProvider('app/'));

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
