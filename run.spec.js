describe('Running Pion', function() {
	
	it('is easy :)', function() {		
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

			'occurences: [',
		]).inFiles(fileProvider('app/'));
		console.log(duplications.length + ' duplications found.');
		
		expect(duplications[0]).toEqual(undefined);
	});
});