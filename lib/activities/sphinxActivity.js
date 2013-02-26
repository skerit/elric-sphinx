module.exports = function sphinxActivity (elric) {

	this.name = 'sphinx';
	this.title = 'Sphinx Voice Command';
	this.plugin = 'sphinx';
	
	this.categories = ['Sphinx', 'Command'];
	
	this.blueprint = {
		command: {
			fieldType: 'String',
			group: 'Command',
			title: 'Command',
			description: 'The command',
		},
		room_id: {
			fieldType: 'String',
			group: 'Origin',
			title: 'Room',
			description: 'The room the microphone is in',
			source: {type: 'model', name: 'room'}
		},
		element_id: {
			fieldType: 'String',
			group: 'Origin',
			title: 'Room Element',
			description: 'The room element',
			source: {type: 'model', name: 'roomElement'}
		}
	};
	
	this.instanceConstructor = function (elric, options) {
		//elric.getRoomElement
		this.payload = options;
	}
	
}