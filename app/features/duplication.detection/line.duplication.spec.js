var duplications = require('./lib/pion.lines');
var oneFile = require('../utils/lib/one.file.provider');
var files = require('../utils/lib/files.provider');

describe('Pion', function() {

	var onefile = 'one-file';
	
	it('can detect one line duplicated two times in one file', function() {
		var content = 'first line\nfirst duplication\nfirst duplication';
		
		expect(duplications.inFiles(oneFile(onefile).withContent(content))).toEqual([{
			lines: ['first duplication'],
			occurences: [
				{ file: onefile, lineIndex: 1 },
				{ file: onefile, lineIndex: 2 }
			]
		}]);
	});
	
	it('can detect one line duplicated three times in one file', function() {
		var content = 'first line\nfirst duplication\nfirst duplication\nfirst duplication';
		
		expect(duplications.inFiles(oneFile(onefile).withContent(content))).toEqual([{
			lines: ['first duplication'],
			occurences: [
				{ file: onefile, lineIndex: 1 },
				{ file: onefile, lineIndex: 2 },
				{ file: onefile, lineIndex: 3 }
			]
		}]);
	});

	var secondfile = 'second-file';
	
	it('can detect one line duplicated two times in two files', function() {
		var content = 'first duplication';
		
		expect(duplications.inFiles(files([onefile, secondfile]).withContents([content, content]))).toEqual([{
			lines: ['first duplication'],
			occurences: [
				{ file: onefile, lineIndex: 0 },
				{ file: secondfile, lineIndex: 0 }
			]
		}]);
	});
	
	var thirdfile = 'third-file';

	it('can detect one line duplicated three times in three files', function() {
		var content = 'first duplication';
		
		expect(duplications.inFiles(files([onefile, secondfile, thirdfile]).withContents([content, content, content]))).toEqual([{
			lines: ['first duplication'],
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
});