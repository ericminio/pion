var duplications = require('./lib/pion.lines');
var oneFile = require('../utils/lib/one.file.provider');
var files = require('../utils/lib/files.provider');

describe('Pion', function() {

	var line = 'first duplication';

	var onefile = 'one-file';
	var firstFile_Line1 = { file: onefile, lineIndex: 0 };
	var firstFile_Line2 = { file: onefile, lineIndex: 1 };
	var firstFile_Line3 = { file: onefile, lineIndex: 2 };
	var firstFile_Line4 = { file: onefile, lineIndex: 3 };
	
	it('can detect one line duplicated two times in one file', function() {
		expect(duplications.inFiles(oneFile(onefile).withContent(line + '\nanything\n' + line))).toEqual([{
			lines: [line],
			occurences: [ firstFile_Line1, firstFile_Line3 ]
		}]);
	});
	
	it('can detect one line duplicated three times in one file', function() {
		var content = 'anything\n' + line + '\n' + line + '\n' + line;
		
		expect(duplications.inFiles(oneFile(onefile).withContent(content))).toEqual([{ lines: [line],
			occurences: [ firstFile_Line2, firstFile_Line3, firstFile_Line4 ]
		}]);
	});

	var secondfile = 'second-file';
	var secondFile_Line1 = { file: secondfile, lineIndex: 0 };
	
	it('can detect one line duplicated two times in two files', function() {
		expect(duplications.inFiles(files([onefile, secondfile]).withContents([line, line]))).toEqual([{ lines: [line],
			occurences: [ firstFile_Line1, secondFile_Line1 ]
		}]);
	});
	
	var thirdfile = 'third-file';

	it('can detect one line duplicated three times in three files', function() {
		expect(duplications.inFiles(files([onefile, secondfile, thirdfile]).withContents([line, line, line]))).toEqual([{ lines: [line],
			occurences: [
				{ file: onefile, lineIndex: 0 },
				{ file: secondfile, lineIndex: 0 },
				{ file: thirdfile, lineIndex: 0 }
			]
		}]);
	});
	
	it('can detect several duplications in several files', function() {
		var fileProvider = files([onefile, secondfile, thirdfile]).withContents([
				'first item\nsecond item\nfirst item',
				'second item\nthird item\nthird item',
				'third item\nsecond item\nthird item\nfourth item\nfourth item'
			]);

		expect(duplications.inFiles(fileProvider)).toEqual([
			{
				lines: ['first item'],
				occurences: [
					{ file: onefile, lineIndex: 0 },
					{ file: onefile, lineIndex: 2 }
				]
			},
			{
				lines: ['second item'],
				occurences: [
					{ file: onefile, lineIndex: 1 },
					{ file: secondfile, lineIndex: 0 },
					{ file: thirdfile, lineIndex: 1 }
				]
			},
			{
				lines: ['third item'],
				occurences: [
					{ file: secondfile, lineIndex: 1 },
					{ file: secondfile, lineIndex: 2 },
					{ file: thirdfile, lineIndex: 0 },
					{ file: thirdfile, lineIndex: 2 }
				]
			},
			{
				lines: ['fourth item'],
				occurences: [
					{ file: thirdfile, lineIndex: 3 },
					{ file: thirdfile, lineIndex: 4 }
				]
			},
		]);
	});

	it('ignores empty lines and blanck lines', function() {
		var content = '\n' +
					  '\n' +
					  '    \n' +
					  '    \n';
		
		expect(duplications.inFiles(oneFile(onefile).withContent(content))).toEqual([]);
	});
	
	it('trims lines before comparing', function() {
		var content = 'hello world\n' + '  hello world\n';
		
		expect(duplications.inFiles(oneFile(onefile).withContent(content))).toEqual([{
				lines: ['hello world'],
				occurences: [
					{ file: onefile, lineIndex: 0 },
					{ file: onefile, lineIndex: 1 }
				]
			}]);
	});

	it('trims and suppresses tabs in lines before comparing', function() {
		expect(duplications.inFiles(oneFile(onefile).withContent('hello world\n' + '\t\t  hello world  \n'))).toEqual([{
				lines: ['hello world'],
				occurences: [
					{ file: onefile, lineIndex: 0 },
					{ file: onefile, lineIndex: 1 }
				]
			}]);
	});
});