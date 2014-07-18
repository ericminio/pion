var array = require('../utils/lib/array.utils');
var clean = require('../utils/lib/clean');
var havingInFolder = require('../utils/lib/having.in.folder');
var duplications = require('./lib/pion');

describe('Pion', function() {

	var folder = 'test-data';
	
	beforeEach(function() {	
		clean.folder(folder);		
	});
	
	it('can detect one duplication in one file', function() {
		havingInFolder(folder).theFileWithName('one-file').withContent('hello world\nhello world');
		
		expect(duplications.inFolder(folder)).toEqual([{
			line: 'hello world',
			left:  { file: 'one-file', line: 1 },
			right: { file: 'one-file', line: 2 },
		}]);
	});
});