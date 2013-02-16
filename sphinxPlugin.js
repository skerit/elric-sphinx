var elric = {};

var Sphinx = function Sphinx (elriclink) {

	elric = elriclink;

	var thisSphinx = this;

	//elric.loadModel('motionCamera', 'motion');
	//elric.loadElementType('camera', 'motion');
	elric.loadCapability('sphinx', 'sphinx');
	
	// Listen to commands from sphinx
	this.on('command', function(packet, client) {
		console.log(packet);
	});
}

module.exports = Sphinx;