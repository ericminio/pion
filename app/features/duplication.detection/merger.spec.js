var merge = require('./lib/merge');
describe('Merger', function() {

	it('can merge two one-line duplications', function() {
		
		var duplications = merge([
			{
				lines: ['first item'],
				occurences: [
					{ file: 'love', lineIndex: 0 },
					{ file: 'love', lineIndex: 2 }
				]
			},
			{
				lines: ['second item'],
				occurences: [
					{ file: 'love', lineIndex: 1 },
					{ file: 'love', lineIndex: 3 }
				]
			}
		]);
		
		expect(duplications).toEqual([{
			lines: ['first item', 'second item'],
			occurences: [
				{ file: 'love', lineIndex: 0 },
				{ file: 'love', lineIndex: 2 }
			]
		}]);
	});
	
});