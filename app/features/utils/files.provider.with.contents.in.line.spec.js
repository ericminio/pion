var files = require('./lib/files.provider');

describe('Files provider with contents in line builder', function() {

	var provider;
	
	beforeEach(function() {
		provider = files(['a', 'b', 'c']).withContentsInLine([
				['1', '2', '3'],
				['1', '2', '3']
			]);		
	});

	it('provides the expected files', function(done) {
		provider.files(function(filenames) {
			expect(filenames).toEqual(['a', 'b', 'c']);
			done();
		});
	});


	it('provides the expected content', function() {
		expect(provider.contentOf('b')).toEqual('2\n2\n');
	});
});