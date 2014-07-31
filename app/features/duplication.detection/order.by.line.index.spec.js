var order = require('./lib/order');

describe('Order by lineIndex', function() {

	it('keeps unchanged an already ordered collection', function() {
		var collection = [ { lineIndex: 0 }, { lineIndex: 1 }, { lineIndex: 2 } ];
		order(collection).byLineIndex();
		
		expect(collection).toEqual([ { lineIndex: 0 }, { lineIndex: 1 }, { lineIndex: 2 } ]);
	});
	
	it('orders by ascending lineIndex', function() {
		var collection = [ { lineIndex: 2 }, { lineIndex: 1 }, { lineIndex: 0 } ];
		order(collection).byLineIndex();
		
		expect(collection).toEqual([ { lineIndex: 0 }, { lineIndex: 1 }, { lineIndex: 2 } ]);
	});
});