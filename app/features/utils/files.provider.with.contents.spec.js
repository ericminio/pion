var files = require('./lib/files.provider');

describe('Files provider with contents builder', function() {

	var provider;
	
	beforeEach(function() {
		provider = files(['a', 'b']).withContents(['first', 'second']);		
	});

	it('provides the expected files async', function(done) {
		provider.files(function(filenames) {
			expect(filenames).toEqual(['a', 'b']);
			done();
		});
	});

	it('provides the expected content sync', function() {
		expect(provider.contentOf('a')).toEqual('first');
		expect(provider.contentOf('b')).toEqual('second');
	});
});