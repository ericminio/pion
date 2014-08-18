var fileProvider = require('./lib/directory.file.provider');

var clean = require('./lib/clean');
var havingInFolder = require('./lib/having.in.folder');

describe('Directory file provider', function() {

	var filenames;
	
	beforeEach(function(done) {	
		clean.folder('test-data/');		
		havingInFolder('test-data/').theFileWithName('a-file.js').withContent('aaa');
		havingInFolder('test-data/').theFileWithName('b-file.js').withContent('bbb');

		fileProvider('test-data/').files(function(array) {
			filenames = array;
			done();
		});
	});
    
    it('supports when ignoring or excluding patterns are ommited', function() {
        expect(filenames.length).toEqual(2);
    });
	
});