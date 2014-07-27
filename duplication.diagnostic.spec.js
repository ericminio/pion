describe('Running Pion is easy :).', function() {
	
	describe('Pion', function() {
		
		it('should have 0 duplicated lines', function() {		
			var fileProvider = require('./app/features/utils/lib/directory.file.provider');
			var detectDuplications = require('./app/features/duplication.detection/lib/pion.lines');

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

			console.log(JSON.stringify(duplications, null, 4));
		
			expect(duplications.length).toEqual(0);
		});
	});

});