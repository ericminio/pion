var blockDuplications = require('./lib/pion.blocks');
var oneFile = require('../utils/lib/one.file.provider');
var any = require('../utils/lib/nop.logger');

describe('Pion block duplication', function() {

	it('forward logger to the line duplication detector', function(done) {
		blockDuplications.logger = any;
		
		blockDuplications.inFiles(oneFile('a-file').withContent('content'), function(duplications) {
			expect(blockDuplications.linesDuplications.logger).toEqual(any);
			done();
		});
	});
});