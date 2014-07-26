var isString = require('./lib/string.utils');

describe('String utils > ', function() {

	describe('is.empty', function() {
			
		it('can detect an empty string', function() {
			expect(isString.empty('')).toEqual(true);
		});

		it('can detect that a string is not an empty string', function() {
			expect(isString.empty('anything')).toEqual(false);
		});
	});
	
	describe('is blanck', function() {
	
		it('can detect a blanck string', function() {
			expect(isString.blanck('  ')).toEqual(true);
		});
		
		it('can detect that a string is not a blanck string', function() {
			expect(isString.blanck('anything')).toEqual(false);
		});
		
		it('is considered blanck when composed of tabulations and spaces', function() {
			expect(isString.blanck('\t\t  \t')).toEqual(true);			
		});
	});
});