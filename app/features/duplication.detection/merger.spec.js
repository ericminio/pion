var merge = require('./lib/merge');
describe('Merger', function() {

	it('can merge two one-line duplications', function() {
		
		var duplications = merge([
			{
				lines: ['first item'],
				occurences: [
					{ file: 'any', lineIndex: 0 },
					{ file: 'any', lineIndex: 2 }
				]
			},
			{
				lines: ['second item'],
				occurences: [
					{ file: 'any', lineIndex: 1 },
					{ file: 'any', lineIndex: 3 }
				]
			}
		]);
		
		expect(duplications).toEqual([{
			lines: ['first item', 'second item'],
			occurences: [
				{ file: 'any', lineIndex: 0 },
				{ file: 'any', lineIndex: 2 }
			]
		}]);
	});
	
});