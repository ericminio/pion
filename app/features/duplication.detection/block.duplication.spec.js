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
	
	it('can detect several duplicated blocks', function() {
		var fileProvider = files(['a', 'b', 'c']).withContents([
				'block 1 - line 1\n' +
				'block 1 - line 2\n' +
				'hello\n' +
				'world\n' +
				'block 1 - line 1\n' +
				'block 1 - line 2',
				
				'block 1 - line 1\n' +
				'block 1 - line 2',
				
				'hello\n' +
				'world\n' +
				'block 1 - line 1\n' +
				'block 1 - line 2',				
			]);
		
		expect(blockDuplications.inFiles(fileProvider)).toEqual([
			{
				lines: ['block 1 - line 1', 'block 1 - line 2'],
				occurences: [
					{ file: 'a', lineIndex: 0 },
					{ file: 'a', lineIndex: 4 },
					{ file: 'b', lineIndex: 0 },
					{ file: 'c', lineIndex: 2 }
				]
			},
			{
				lines: ['hello', 'world'],
				occurences: [
					{ file: 'a', lineIndex: 2 },
					{ file: 'c', lineIndex: 0 }
				]
			}
		]);
	});
	
	it('ignores empty lines in blocks', function() {
        var content = 'first item\n' +
		              'second item\n' +
                      'first item\n' +
					  '\n' +
					  'second item';		
					  
		expect(blockDuplications.inFiles(oneFile(onefile).withContent(content))).toEqual([{
			lines: ['first item', 'second item'],
			occurences: [
				{ file: onefile, lineIndex: 0 },
				{ file: onefile, lineIndex: 2 }
			]
		}]);		
	});
});