var keepsOnlyAdjacentLines = require('./lib/keeps.only.adjacent.lines');

describe('Keeps only adjacent lines', function() {

	it('works', function() {
		var collection = [ { lineIndex: 0 }, { lineIndex: 1 }, { lineIndex: 3 } ];
		var filtered = keepsOnlyAdjacentLines(collection);
		
		expect(filtered).toEqual([ { lineIndex: 0 }, { lineIndex: 1 } ]);
	});
	
	it('returns the single element of a colelction with a single element', function() {
		expect(keepsOnlyAdjacentLines([ { lineIndex: 18 } ])).toEqual([ { lineIndex: 18 } ]);
	});
	
	it('returns the whole collection if the lineIndex are adjacents', function() {
		expect(keepsOnlyAdjacentLines([ { lineIndex: 18 }, { lineIndex: 19 }, { lineIndex: 20 } ]))
			.toEqual([ { lineIndex: 18 }, { lineIndex: 19 }, { lineIndex: 20 } ]);
	});
});