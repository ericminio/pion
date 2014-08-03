var order = require('./lib/order');

describe('Order by lineIndex', function() {

	it('keeps unchanged an already ordered collection', function() {
		var collectionAlreadyOrdered = [ { lineIndex: 0 }, { lineIndex: 1 }, { lineIndex: 2 } ];
		order(collectionAlreadyOrdered).byLineIndex();
		
		expect(collectionAlreadyOrdered).toEqual([ { lineIndex: 0 }, { lineIndex: 1 }, { lineIndex: 2 } ]);
	});
	
	it('orders by ascending lineIndex', function() {
		var collection = [ { lineIndex: 24 }, { lineIndex: 12 }, { lineIndex: 0 } ];
		order(collection).byLineIndex();
		
		expect(collection).toEqual([ { lineIndex: 0 }, { lineIndex: 12 }, { lineIndex: 24 } ]);
	});
	
	it('keeps unchanged two items with the same index', function() {
		var collectionWithDuplicatedIndex = [ { lineIndex: 0, field: 'one' }, { lineIndex: 0, field: 'two' } ];
		order(collectionWithDuplicatedIndex).byLineIndex();
		
		expect(collectionWithDuplicatedIndex).toEqual([ { lineIndex: 0, field: 'one' }, { lineIndex: 0, field: 'two' } ]);
	});
});