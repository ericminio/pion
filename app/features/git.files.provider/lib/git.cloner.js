module.exports = {
    
    clone: function(name, directory, callback) {
        var exec = require('child_process').exec;
        var clone = exec('git clone ' + name + ' ' + directory, function (error, stdout, stderr) {
		    if (error !== null) {
			    callback(error.toString());
		    }
		    else {
			    callback(undefined);
		    }
	    });
    }
};