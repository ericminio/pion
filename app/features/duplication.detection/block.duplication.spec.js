var blockDuplications = require('./lib/pion.blocks');
var oneFile = require('../utils/lib/one.file.provider');
var files = require('../utils/lib/files.provider');

describe('Pion', function() {

	var onefile = 'block-file';
	var line1 = 'first item';
	var line2 = 'second item';
	var block = line1 + '\n' + line2 + '\n';

	var expected = {
			lines: [line1, line2],
			occurences: [ { file: onefile, lineIndex: 0 }, { file: onefile, lineIndex: 2 } ]
		};
	
	it('can detect a duplicated block of two lines in one file', function() {
		expect(blockDuplications.inFiles(oneFile(onefile).withContent(block + block))).toEqual([expected]);
	});
	
	it('supports a block almost duplicated three times', function() {
		expect(blockDuplications.inFiles(oneFile(onefile).withContent(block + block + line1))).toEqual([expected]);		
 		expect(blockDuplications.inFiles(oneFile(onefile).withContent(block + block + line2))).toEqual([expected]);
	});
	
	it('can detect a duplicated block of two lines in two file', function() {
		expect(blockDuplications.inFiles(files(['a', 'b']).withContents([block, block]))).toEqual([{ lines: [line1, line2],
			occurences: [ { file: 'a', lineIndex: 0 }, { file: 'b', lineIndex: 0 } ]
		}]);
	});
	
	it('can detect several duplicated blocks', function() {
		var fileProvider = files(['a', 'b', 'c']).withContents([
			block + 'hello\nworld\n' + block,				
			block,				
			'hello\nworld\n' + block			
		]);
		
		expect(blockDuplications.inFiles(fileProvider)).toEqual([
			{
				lines: expected.lines,
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
        var content = block + line1 + '\n\n' + line2;		
					  
		expect(blockDuplications.inFiles(oneFile(onefile).withContent(content))).toEqual([expected]);		
	});
});