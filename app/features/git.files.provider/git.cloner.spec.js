var cloneGitRepository = require('./lib/git.cloner');

describe('Git cloner,', function() {

	var cloneFolder = './cloned';

	beforeEach(function(done) {
		var exec = require('child_process').exec;
		var rmdir = exec('rm -rf ' + cloneFolder, function(error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			done();
		});
	});
	
	describe('when the repository exists,', function() {
		
		var repo = './app/features/git.files.provider/data/repo-with-one-file';
		
		it('returns without error', function(done) {
			cloneGitRepository(repo, cloneFolder, function(err) {
				expect(err).toEqual(undefined);
				done();			
			});		
		});

		it('clones the content', function(done) {
			cloneGitRepository(repo, cloneFolder, function(err) {
				var fs = require('fs');
				var files = fs.readdirSync(cloneFolder);

				expect(files).toContain('.git');
				expect(files).toContain('README.md');
				done();			
			});		
		});
	});

	it('returns error when the repository does not exist', function(done) {
		cloneGitRepository('./anything/but/an/existing/repository', cloneFolder, function(err) {
			expect(err).not.toEqual(undefined);
			done();			
		});		
	});
});