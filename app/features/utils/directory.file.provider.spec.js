var fileProvider = require('./lib/directory.file.provider');

var clean = require('./lib/clean');
var havingInFolder = require('./lib/having.in.folder');

describe('Directory file provider', function() {

	var filenames;
	
	beforeEach(function(done) {	
		clean.folder('test-data/');		
		clean.folder('test-data/any');		
		clean.folder('test-data/.git');		
		havingInFolder('test-data/').theFileWithName('a-file.js').withContent('aaa');
		havingInFolder('test-data/any').theFileWithName('c-file.js').withContent('ccc');
		havingInFolder('test-data/').theFileWithName('b-file.js').withContent('bbb');
		havingInFolder('test-data/').theFileWithName('e-file.cs').withContent('eee');

		havingInFolder('test-data/').theFileWithName('g-file.excluded.cs').withContent('eee');

		havingInFolder('test-data/').theFileWithName('f-file.png').withContent('fff');
		havingInFolder('test-data/').theFileWithName('bootstrap.js').withContent('fff');
		havingInFolder('test-data/.git').theFileWithName('d-file.js').withContent('ddd');

		fileProvider('test-data/').including([ /\.js$/, /\.cs$/ ]).excluding([ /^bootstrap\.js$/, /excluded\.cs$/ ]).files(function(array) {
			filenames = array;
			done();
		});
	});
    
    it('ignores .git directory', function() {
        expect(filenames).not.toContain('test-data/.git/d-file.js');
    });
	
	it('selects only the included extensions', function() {
		expect(filenames).toEqual([ 'test-data/a-file.js', 'test-data/any/c-file.js', 'test-data/b-file.js', 'test-data/e-file.cs' ]);
	});
	
	it('can provide the content of a file', function() {
		expect(fileProvider().contentOf('test-data/any/c-file.js')).toEqual('ccc');
	});
	
});