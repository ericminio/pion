var keepsOnlyLinesIn = require('./lib/keeps.only.lines.in');

describe('Keeps only lines in collection after given index >', function() {

	it('keeps the given index', function() {
		var collection = [ { lineIndex: 3 }, { lineIndex: 12 }, { lineIndex: 24 } ];
		var selected = keepsOnlyLinesIn(collection).withLineIndexGreaterOrEqualTo(12);
		
		expect(selected).toEqual([ { lineIndex: 12 }, { lineIndex: 24 } ]);
	});
});