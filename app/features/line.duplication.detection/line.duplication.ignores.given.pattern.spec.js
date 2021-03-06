var lineDuplications = require('./lib/pion.lines');
var oneFile = require('../utils/lib/one.file.provider');
var files = require('../utils/lib/files.provider');
var isEmptyDuplications = require('../common/is.empty.duplications');

describe('Pion', function() {

	it('ignores lines with given string', function(done) {
		var content = 'hello\n' +
					  'hello\n';
		
		lineDuplications.ignoring(['hello']).inFiles(oneFile('any').withContent(content), isEmptyDuplications(done));
	});
});