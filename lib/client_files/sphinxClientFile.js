var async = require('async');
var child = require('child_process');

module.exports = function (client) {

	var thisClient = this;
	var settings = client.settings;
	var submit = client.filteredSubmit('sphinx');
	
	client.event.on('start', function() {
		
		console.log('Sphinx is starting after everything has loaded');
		
		// Where to find the vox python file, our link to sphinx
		var vox_path = __dirname + "/sphinx/vox.py";
		
		var vox = child.spawn("python", ["-u", vox_path], null);
		
		vox.stdout.on('data', function (data) {
			try {
				var command = JSON.parse(data);
				submit('command', command);
			} catch (err) {
				// Not a json string
				//console.log(data);
			}
			
		});
		
		vox.on('exit', function (code) {
			console.log('child process exited with code ' + code);
		});
		
	});
	
	// Listen to the setoption events from the server
	client.socket.on('setoption', function(packet) {
		
	});
	
}