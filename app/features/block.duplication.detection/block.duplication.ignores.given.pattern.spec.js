var blockDuplications = require('./lib/pion.blocks');
var oneFile = require('../utils/lib/one.file.provider');

describe('Pion block duplication ignoring pattern', function() {

	it('is forwarded to the line duplication detector', function(done) {
		var any = [ 'anything' ];

		blockDuplications.ignoring(any).inFiles(oneFile('a-file').withContent('content'), function(duplications) {
			expect(blockDuplications.linesDuplications.patterns).toEqual(any);
			done();
		});
	});
});