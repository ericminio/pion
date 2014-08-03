var duplications = require('./lib/pion.lines');
var oneFile = require('../utils/lib/one.file.provider');
var files = require('../utils/lib/files.provider');

describe('Pion', function() {

	it('has a default logger that does nothing', function() {
		expect(duplications.logger).not.toEqual(undefined);
		expect(duplications.logger.start.toString()).toEqual((function(filecount) {}).toString());
		expect(duplications.logger.progress.toString()).toEqual((function(leftFile, rightFile, leftIndex, rightIndex, duplications) {}).toString());
		expect(duplications.logger.end.toString()).toEqual((function() {}).toString());
	});

	it('logs start', function(done) {
		spyOn(duplications.logger, 'start');
		duplications.inFiles(files(['a', 'b']).withContents(['first', 'second']), function() {
			expect(duplications.logger.start).toHaveBeenCalledWith(2);
			done();
		});		
	});

	it('logs end', function(done) {
		spyOn(duplications.logger, 'end');
		duplications.inFiles(files(['a', 'b', 'c']).withContents(['one', 'two', 'three']), function() {
			expect(duplications.logger.end).toHaveBeenCalled();
			done();
		});		
	});

	describe('progress logging', function() {
	
		beforeEach(function() {
			spyOn(duplications.logger, 'progress');
		});
		
		it('logs progress from the first file', function(done) {
			duplications.inFiles(files(['a']).withContents(['any']), function() {
				expect(duplications.logger.progress).toHaveBeenCalledWith('a', 'a', 0, 0, []);
				done();
			});		
		});
	
		it('logs progress', function(done) {
			duplications.inFiles(files(['a', 'b']).withContents(['any', 'any']), function() {
				var expected = [ 
					{ 
						lines : [ 'any' ], 
						occurences : [ { file : 'a', lineIndex : 0 }, { file : 'b', lineIndex : 0 } ]
					}];
				expect(duplications.logger.progress).toHaveBeenCalledWith('a', 'b', 0, 1, expected);
				done();
			});		
		});
	});	
});