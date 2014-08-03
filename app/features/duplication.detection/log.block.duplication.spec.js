var blockDuplications = require('./lib/pion.blocks');
var oneFile = require('../utils/lib/one.file.provider');

describe('Pion block duplication', function() {

	it('forward logger to the line duplication detector', function(done) {
		var any = {
			start: function(filecount) {},
			progress: function(leftFile, rightFile, leftIndex, rightIndex, duplications) {},
			end: function() {},
		};
		blockDuplications.logger = any;
		
		blockDuplications.inFiles(oneFile('a-file').withContent('content'), function(duplications) {
			expect(blockDuplications.linesDuplications.logger).toEqual(any);
			done();
		});
	});
});