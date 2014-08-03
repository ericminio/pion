var linesDuplications = require('./lib/pion.lines');
var oneFile = require('../utils/lib/one.file.provider');
var files = require('../utils/lib/files.provider');

describe('Pion', function() {

	var line = 'first duplication';

	var onefile = 'one-file';
	var firstFile_Line1 = { file: onefile, lineIndex: 0 };
	var firstFile_Line2 = { file: onefile, lineIndex: 1 };
	var firstFile_Line3 = { file: onefile, lineIndex: 2 };
	var firstFile_Line4 = { file: onefile, lineIndex: 3 };
	
	it('can detect one line duplicated two times in one file', function(done) {
		linesDuplications.inFiles( oneFile(onefile).withContent(line + '\nanything\n' + line), function(duplications) {
			expect(duplications).toEqual([ { lines: [line], occurences: [ firstFile_Line1, firstFile_Line3 ] } ]);
			done();
		});
	});
	
	it('can detect one line duplicated three times in one file', function(done) {
		var content = 'anything\n' + line + '\n' + line + '\n' + line;
		
		linesDuplications.inFiles(oneFile(onefile).withContent(content), function(duplications) {
			expect(duplications).toEqual([ { lines: [line], occurences: [ firstFile_Line2, firstFile_Line3, firstFile_Line4 ] } ]);
			done();
		});
	});

	var secondfile = 'second-file';
	var secondFile_Line1 = { file: secondfile, lineIndex: 0 };
	
	it('can detect one line duplicated two times in two files', function(done) {
		linesDuplications.inFiles(files([onefile, secondfile]).withContents([line, line]), function(duplications) {
			expect(duplications).toEqual([ { lines: [line], occurences: [ firstFile_Line1, secondFile_Line1 ] } ] );
			done();
		});
	});
	
	var thirdfile = 'third-file';
	var thirdFile_Line1 = { file: thirdfile, lineIndex: 0 };

	it('can detect one line duplicated three times in three files', function(done) {
		linesDuplications.inFiles(files([onefile, secondfile, thirdfile]).withContents([line, line, line]), function(duplications) {
			expect(duplications).toEqual([{ lines: [line], occurences: [ firstFile_Line1, secondFile_Line1, thirdFile_Line1 ] }])
			done();
		});
	});
	
	it('can detect several linesDuplications in several files', function(done) {
		var fileProvider = files([onefile, secondfile, thirdfile]).withContents([
				'first item\nsecond item\nfirst item',
				'second item\nthird item\nthird item',
				'third item\nsecond item\nthird item\nfourth item\nfourth item'
			]);

		linesDuplications.inFiles(fileProvider, function(duplications) {
			expect(duplications).toEqual([
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
				}
			]);
			done();
		});
	});

	it('ignores empty lines and blanck lines', function(done) {
		var content = '\n' +
					  '\n' +
					  '    \n' +
					  '    \n';
		
		linesDuplications.inFiles(oneFile(onefile).withContent(content), function(duplications) {
			expect(duplications).toEqual([]);
			done();
		});
	});
	
	it('trims lines before comparing', function(done) {
		linesDuplications.inFiles(oneFile('space').withContent('hello world\n' + '  hello world\n'), function(duplications) {
			expect(duplications).toEqual([{ lines: ['hello world'],
				occurences: [
					{ file: 'space', lineIndex: 0 },
					{ file: 'space', lineIndex: 1 }
				]
			}]);
			done();
		});
	});

	it('trims and suppresses tabs in lines before comparing', function(done) {
		linesDuplications.inFiles(oneFile('tabs').withContent('love you\n' + '\t\t  love you  \n'), function(duplications) {
			expect(duplications).toEqual([{ lines: ['love you'],
				occurences: [
					{ file: 'tabs', lineIndex: 0 },
					{ file: 'tabs', lineIndex: 1 }
				]
			}]);
			done();
		});
	});
});