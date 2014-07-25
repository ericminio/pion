describe('Running Pion', function() {
	
	it('is easy :)', function() {		
		var fileProvider = require('./app/features/utils/lib/directory.file.provider');
		var detectDuplications = require('./app/features/duplication.detection/lib/pion.lines');

		var duplications = detectDuplications.inFiles(fileProvider('app/'));
		
		expect(duplications).not.toEqual(undefined);
	});
});