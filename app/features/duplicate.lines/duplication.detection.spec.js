var fs = require('fs');
var detectDuplicateCodeInFolder = require('./lib/detect.duplicate.code.in.folder');
var array = require('../utils/lib/array.utils');

describe('Duplication detection', function() {

	var folder = 'test-data';
	
	beforeEach(function() {	
		if (!fs.existsSync(folder)) fs.mkdirSync(folder);
		var files = fs.readdirSync(folder);
		array.forEach(files, function(file) {
			fs.unlinkSync(folder + '/' + file);
		});
	});
	
	it('works with one line duplicated in the same file', function() {
		var content = 'hello world\nhello world';
		fs.writeFileSync(folder + '/one-file', content);
		var duplication = detectDuplicateCodeInFolder(folder);
		
		expect(duplication).toEqual({
			line: 'hello world',
			left:  { file: 'one-file', line: 1 },
			right: { file: 'one-file', line: 2 },
		});
	});
});