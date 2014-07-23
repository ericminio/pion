var blockDuplications = require('./lib/pion.blocks');
var oneFile = require('../utils/lib/one.file.provider');
var files = require('../utils/lib/files.provider');

describe('Pion', function() {

	var onefile = 'one-file';
	
	it('can detect a duplicated block of two lines in one file', function() {
        var content = 'first item\nsecond item\n' +
                      'first item\nsecond item';		
					  
		expect(blockDuplications.inFiles(oneFile(onefile).withContent(content))).toEqual([{
			lines: ['first item', 'second item'],
			occurences: [
				{ file: onefile, lineIndex: 0 },
				{ file: onefile, lineIndex: 2 }
			]
		}]);
	});
	
	it('supports a block almost duplicated three times', function() {
		var expected = [{
			lines: ['first item', 'second item'],
			occurences: [
				{ file: onefile, lineIndex: 0 },
				{ file: onefile, lineIndex: 2 }
			]
		}];

        var content = 'first item\nsecond item\n' +
                      'first item\nsecond item\n' +
                      'first item';
		expect(blockDuplications.inFiles(oneFile(onefile).withContent(content))).toEqual(expected);		

        content = 'first item\nsecond item\n' +
                  'first item\nsecond item\n' +
                  'second item';					  
 		expect(blockDuplications.inFiles(oneFile(onefile).withContent(content))).toEqual(expected);
	});
	
	it('can detect a duplicated block of two lines in two file', function() {
        var contents = [
            'first item\nsecond item\n',
		    'first item\nsecond item'
		];
					  
		expect(blockDuplications.inFiles(files(['a', 'b']).withContents(contents))).toEqual([{
			lines: ['first item', 'second item'],
			occurences: [
				{ file: 'a', lineIndex: 0 },
				{ file: 'b', lineIndex: 0 }
			]
		}]);
	});
});