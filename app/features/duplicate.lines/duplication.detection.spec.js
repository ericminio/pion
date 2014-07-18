var fs = require('fs');
var detectDuplicateCodeInFolder = require('./lib/detect.duplicate.code.in.folder');

describe('Duplication detection', function() {

	var folder = 'test-data';
	
	beforeEach(function() {	
		if (!fs.existsSync(folder)) fs.mkdirSync(folder);			
	});
	
	it('works with one line duplicated in two files', function() {
		var content = 'hello world';
		fs.writeFileSync(folder + '/first-file', content);
		fs.writeFileSync(folder + '/second-file', content);
		var duplication = detectDuplicateCodeInFolder(folder);
		
		expect(duplication).toEqual({
			line: 'hello world',
			left:  { file: 'first-file', line: 1 },
			right: { file: 'second-file', line: 1 },
		});
	});
});