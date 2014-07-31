var files = require('./lib/files.provider');

describe('Files provider with contents builder', function() {

	var provider;
	
	beforeEach(function() {
		provider = files(['a', 'b']).withContents(['first', 'second']);		
	});

	it('provides the expected files', function() {
		expect(provider.files()).toEqual(['a', 'b']);
	});


	it('provides the expected content', function() {
		expect(provider.contentOf('a')).toEqual('first');
		expect(provider.contentOf('b')).toEqual('second');
	});
});