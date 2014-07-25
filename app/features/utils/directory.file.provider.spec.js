var fileProvider = require('./lib/directory.file.provider');

var clean = require('./lib/clean');
var havingInFolder = require('./lib/having.in.folder');

describe('Directory file provider', function() {

	var filenames;
	
	beforeEach(function() {	
		clean.folder('test-data/');		
		clean.folder('test-data/any');		
		havingInFolder('test-data/').theFileWithName('a-file').withContent('aaa');
		havingInFolder('test-data/any').theFileWithName('c-file').withContent('ccc');
		havingInFolder('test-data/').theFileWithName('b-file').withContent('bbb');

		filenames = fileProvider('test-data/').files();
	});
	
	it('takes sub-directories into account', function() {
		expect(filenames.length).toEqual(3);
	});
	
	it('provides filenames with folder prefix', function() {
		expect(filenames[1]).toEqual('test-data/any/c-file');
	});
	
	it('can provide the content of a file', function() {
		expect(fileProvider().contentOf('test-data/any/c-file')).toEqual('ccc');
	});
	
});