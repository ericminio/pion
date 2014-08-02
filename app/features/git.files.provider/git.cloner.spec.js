var cloneGitRepository = require('./lib/git.cloner');

describe('Git cloner,', function() {

	var cloneFolder = './cloned';

	beforeEach(function(done) {
		var exec = require('child_process').exec;
		var rmdir = exec('rm -rf ' + cloneFolder, function(rmerror, stdout, stderr) {
			if (rmerror !== null) {
				console.log('exec error: ' + error);
			}
			done();
		});
	});
	
	describe('when the repository exists,', function() {
		
		var repo = './app/features/git.files.provider/data/repo-with-one-file';
		var error;
		
		beforeEach(function(done) {
			cloneGitRepository(repo, cloneFolder, function(err) {
				error = err;
				done();			
			});		
		});
		
		it('returns without error', function() {
			expect(error).toEqual(undefined);
		});

		it('clones the content', function() {
			var fs = require('fs');
			var files = fs.readdirSync(cloneFolder);

			expect(files).toContain('.git');
			expect(files).toContain('README.md');
		});
	});

	it('returns error when the repository does not exist', function(done) {
		cloneGitRepository('./anything/but/an/existing/repository', cloneFolder, function(err) {
			expect(err).not.toEqual(undefined);
			done();			
		});		
	});
});