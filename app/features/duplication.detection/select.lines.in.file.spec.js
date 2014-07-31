var selectLines = require('./lib/select.lines.in.file');

describe('Pion', function() {

	it('can select lines of a file in one duplication', function() {
	
		var duplication = {
			lines: ['line1'],
			occurences: [ { file: 'this-file', lineIndex: 0 }, { file: 'that-file', lineIndex: 0 } ]
		};
		
		var lines = selectLines([duplication]).inFile('this-file');
		
		expect(lines).toEqual([ { line: 'line1', lineIndex: 0 } ]);
	});

	it('can select lines of a file in two duplications', function() {
	
		var duplications = [
			{
				lines: ['one'],
				occurences: [ { file: 'this-file', lineIndex: 0 }, { file: 'that-file', lineIndex: 0 } ]
			},
			{
				lines: ['two'],
				occurences: [ { file: 'this-file', lineIndex: 1 }, { file: 'that-file', lineIndex: 1 } ]
			},
		];
		
		var lines = selectLines(duplications).inFile('this-file');
		
		expect(lines).toEqual([ { line: 'one', lineIndex: 0 }, { line: 'two', lineIndex: 1 } ]);
	});
});