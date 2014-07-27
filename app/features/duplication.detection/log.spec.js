var duplications = require('./lib/pion.lines');
var oneFile = require('../utils/lib/one.file.provider');
var files = require('../utils/lib/files.provider');
var files = require('../utils/lib/files.provider');

describe('Pion', function() {

	it('has a default logger that does nothing', function() {
		expect(duplications.logger).not.toEqual(undefined);
		expect(duplications.logger.start.toString()).toEqual((function(filecount) {}).toString());
		expect(duplications.logger.progress.toString()).toEqual((function(leftFile, rightFile, leftIndex, rightIndex, duplications) {}).toString());
		expect(duplications.logger.end.toString()).toEqual((function() {}).toString());
	});

	it('logs start', function() {
		spyOn(duplications.logger, 'start');
		duplications.inFiles(files(['a', 'b']).withContents(['first', 'second']));
		
		expect(duplications.logger.start).toHaveBeenCalledWith(2);
	});

	it('logs end', function() {
		spyOn(duplications.logger, 'end');
		duplications.inFiles(files(['a', 'b', 'c']).withContents(['one', 'two', 'three']));
		
		expect(duplications.logger.end).toHaveBeenCalled();
	});

	describe('progress logging', function() {
	
		beforeEach(function() {
			spyOn(duplications.logger, 'progress');
		});
		
		it('logs progress from the first file', function() {
			duplications.inFiles(files(['a']).withContents(['any']));
		
			expect(duplications.logger.progress).toHaveBeenCalledWith('a', 'a', 0, 0, []);
		});
	
		it('logs progress', function() {
			duplications.inFiles(files(['a', 'b']).withContents(['any', 'any']));
		
			var expected = [ 
				{ 
					lines : [ 'any' ], 
					occurences : [ { file : 'a', lineIndex : 0 }, { file : 'b', lineIndex : 0 } ]
				}];
			expect(duplications.logger.progress).toHaveBeenCalledWith('a', 'b', 0, 1, expected);
		});
	});	
});