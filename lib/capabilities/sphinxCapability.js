module.exports = function (elric) {

	this.name = 'sphinx';
	this.title = 'Sphinx';
	this.version = '2013-02-26.01';
	this.plugin = 'sphinx';
	
	this.settingBlueprint = {
		model_name: {
			fieldType: 'String',
			default: 'default',
			title: 'Model Name'
		},
		card_name: {
			fieldType: 'String',
			default: 'default',
			title: 'Card Name (eg: hw:0)'
		}
	};
	
	this.fields = ['model_name', 'card_name'];

}