var lineShouldBeIgnored = require('./lib/line.should.be.ignored');

describe('Pion', function() {
	
	it('does not ignore line by default', function() {
		expect(lineShouldBeIgnored('anything', undefined)).toEqual(false);
	});
	
	it('does not ignore a line that doess not contain the given string', function() {
		expect(lineShouldBeIgnored('anything', 'something else')).toEqual(false);
	});
	
	it('can ignore a line by exact string', function() {
		expect(lineShouldBeIgnored('anything', 'anything')).toEqual(true);
	});
	
	it('can ignore a line that when trimmed is the exact string', function() {
		expect(lineShouldBeIgnored('     anything  ', 'anything')).toEqual(true);
	});
	
	it('does not ignore a line that only contains a given string', function() {
		expect(lineShouldBeIgnored('love is all you need', 'love')).toEqual(false);
	});
});