module.exports = {
	start: function(filecount) {
		this.filecount = filecount;
		this.previousDuplicationCount = 0;
		process.stdout.write('Scanning ' + filecount + ' files...\n');
	},
	progress: function(leftFile, rightFile, leftIndex, rightIndex, duplications) {
		var percentage = Math.floor(100 * (leftIndex+1) / this.filecount);
		process.stdout.write(percentage + '% (' + (leftIndex+1) + '/' + this.filecount + '-' + (rightIndex+1) + ') ' + duplications.length + ' duplications found     \r');
		
		if(duplications.length > this.previousDuplicationCount) {
			this.previousDuplicationCount = duplications.length;
			process.stdout.write('\n' + JSON.stringify(duplications, null, 4));
		}
	},
	end: function() {
		process.stdout.write('\nScanning completed.\n');
	}	
};