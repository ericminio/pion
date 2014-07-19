var fileProvider = require('./lib/directory.file.provider');

var clean = require('./lib/clean');
var havingInFolder = require('./lib/having.in.folder');

describe('Directory file provider', function() {

	var filenames;
	
	beforeEach(function() {	
		clean.folder('test-data/');		
		havingInFolder('test-data/').theFileWithName('a-file').withContent('aaa');
		havingInFolder('test-data/').theFileWithName('b-file').withContent('bbb');

		filenames = fileProvider('test-data/').files();
	});
	
	it('provides all the files of the given folder', function() {
		expect(filenames.length).toEqual(2);
	});
	
	it('provides filenames with folder prefix', function() {
		expect(filenames[0]).toEqual('test-data/a-file');
	});
	
	it('can provide the content of a file', function() {
		expect(fileProvider().contentOf(filenames[1])).toEqual('bbb');
	});
});