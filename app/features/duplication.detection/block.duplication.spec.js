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
	
	var onefile = 'block-file';
	var line1 = 'line 1';
	var line2 = 'line 2';
	var line3 = 'line 3';
	var block = line1 + '\n' + line2 + '\n';

	it('can detect a duplicated block of two lines in two files', function() {
		var fileProvider = files(['a', 'b']).withContentsInLine([
            [line1,     line1],
            [line2,     line2]  ]);	
		
		expect(blockDuplications.inFiles(fileProvider)).toEqual([{ lines: [line1, line2],
			occurences: [ { file: 'a', lineIndex: 0 }, { file: 'b', lineIndex: 0 } ]
		}]);
	});
	
	it('can detect a duplicated block of three lines in two files', function() {
		var block3 = line1 + '\n' + line2 + '\n' + line3 + '\n';

		expect(blockDuplications.inFiles(files(['a', 'b']).withContents([block3, block3]))).toEqual([{ lines: [line1, line2, line3],
			occurences: [ { file: 'a', lineIndex: 0 }, { file: 'b', lineIndex: 0 } ]
		}]);
	});
	
	it('can detect a duplicated block of three lines in three files', function() {
		var block3 = line1 + '\n' + line2 + '\n' + line3 + '\n';

		expect(blockDuplications.inFiles(files(['a', 'b', 'c']).withContents([block3, block3, block3]))).toEqual([{ lines: [line1, line2, line3],
			occurences: [ { file: 'a', lineIndex: 0 }, { file: 'b', lineIndex: 0 }, { file: 'c', lineIndex: 0 } ]
		}]);
	});
	
	it('can detect a duplicated block of two lines in one file', function() {
		var block2 = line1 + '\n' + line2 + '\n';
		
		expect(blockDuplications.inFiles(oneFile(onefile).withContent(block2 + block2))).toEqual([{
			lines: [line1, line2],
			occurences: [ { file: onefile, lineIndex: 0 }, { file: onefile, lineIndex: 2 } ]
		}]);
	});
	
	it('returns no block duplications when the 2 lines duplication can not be merged in one block', function() {
		expect(blockDuplications.inFiles(oneFile('any-file').withContent('1\n2\n1\n3\n2'))).toEqual([]);
	});
	
	it('can detect a block duplication not on the first duplication', function() {
		var fileProvider = files(['a', 'b']).withContentsInLine([
            [line1,     	line1],
			['anything', 	'something'],			
            [line2,     	'else'],
            [line3,     	line2] ,
			['',            line3] 
		]);	
		
		expect(blockDuplications.inFiles(fileProvider)).toEqual([{ lines: [line2, line3],
			occurences: [ { file: 'a', lineIndex: 2 }, { file: 'b', lineIndex: 3 } ]
		}]);
		
	});
});