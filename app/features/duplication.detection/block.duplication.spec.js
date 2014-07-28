var blockDuplications = require('./lib/pion.blocks');
var oneFile = require('../utils/lib/one.file.provider');
var files = require('../utils/lib/files.provider');

describe('Pion', function() {

	it('returns no block duplications when there is not even any line duplication', function() {
		expect(blockDuplications.inFiles(oneFile('any-file').withContent('any content'))).toEqual([]);
	});
	
	it('returns no block duplications when there is not at least 2 lines duplication', function() {
		expect(blockDuplications.inFiles(oneFile('any-file').withContent('duplication\nduplication'))).toEqual([]);
	});
	
	it('returns no block duplications when the 2 lines duplication can not be merged in one block', function() {
		expect(blockDuplications.inFiles(oneFile('any-file').withContent('1\n2\n1\n3\n2'))).toEqual([]);
	});

	var onefile = 'block-file';
	var line1 = 'line 1';
	var line2 = 'line 2';
	var line3 = 'line 3';
	var block = line1 + '\n' + line2 + '\n';

	it('can detect a duplicated block of two lines in one file', function() {
		var block2 = line1 + '\n' + line2 + '\n';
		
		expect(blockDuplications.inFiles(oneFile(onefile).withContent(block2 + block2))).toEqual([{
			lines: [line1, line2],
			occurences: [ { file: onefile, lineIndex: 0 }, { file: onefile, lineIndex: 2 } ]
		}]);
	});
	
	it('can detect a duplicated block of three lines in one file', function() {
		var block3 = line1 + '\n' + line2 + '\n' + line3 + '\n';
		
		expect(blockDuplications.inFiles(oneFile(onefile).withContent(block3 + block3))).toEqual([{
			lines: [line1, line2, line3],
			occurences: [ { file: onefile, lineIndex: 0 }, { file: onefile, lineIndex: 3 } ]
		}]);
	});
	
	xit('ignores empty lines in blocks', function() {
		expect(blockDuplications.inFiles(oneFile(onefile).withContent(block + line1 + '\n\n' + line2))).toEqual([{
			lines: [line1, line2],
			occurences: [ { file: onefile, lineIndex: 0 }, { file: onefile, lineIndex: 2 } ]
		}]);		
	});

	xit('can detect a duplicated block of two lines in two files', function() {
		expect(blockDuplications.inFiles(files(['a', 'b']).withContents([block, block]))).toEqual([{ lines: [line1, line2],
			occurences: [ { file: 'a', lineIndex: 0 }, { file: 'b', lineIndex: 0 } ]
		}]);
	});
	
	xit('can detect a duplicated block of three lines in two files', function() {
		var block3 = line1 + '\n' + line2 + '\n' + line3 + '\n';
		expect(blockDuplications.inFiles(files(['one', 'two'])
							    .withContents([block3, block3, block3])))
								.toEqual([{ lines: [line1, line2, line3 ],
			occurences: [ { file: 'one', lineIndex: 0 }, { file: 'two', lineIndex: 0 } ]
		}]);
	});
});