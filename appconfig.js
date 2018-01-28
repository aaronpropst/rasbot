module.exports = {
	webServerPort: 80,
	socketServerPort: 8082,
	//using this so i can run this code on my mac and not trigger the gpio stuff.
	mockBot: {
		setup: 		function(){ console.log('mock setup', arguments) },
		setGPIO: 	function(){ console.log('mock setGPIO', arguments) },
		getGPIO: 	function(){ console.log('mock getGPIO', arguments) },
		setMotor: 	function(){ console.log('mock setMotor', arguments) },
		getMotor: 	function(){ console.log('mock getMotor', arguments) },
		setLED: 	function(){ console.log('mock setLED', arguments) },
		getLED: 	function(){ console.log('mock getLED', arguments) },
		getOC: 		function(){ console.log('mock getOC', arguments) },
		setOC: 		function(){ console.log('mock setOC', arguments) },
		setSwitchCallback: function(){ console.log('mock setSwitch') }
	}
};
