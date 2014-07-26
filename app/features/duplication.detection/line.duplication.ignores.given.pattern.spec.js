var duplications = require('./lib/pion.lines');
var oneFile = require('../utils/lib/one.file.provider');
var files = require('../utils/lib/files.provider');

describe('Pion', function() {

	var onefile = 'one-file';
	
	it('ignores lines with given string', function() {
		var content = 'hello\n' +
					  'hello\n';
		
		expect(duplications.ignoring(['hello']).inFiles(oneFile(onefile).withContent(content))).toEqual([]);
	});
});