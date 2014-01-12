module.exports = {
	webServerPort: 80,
	socketServerPort: 8082,
	//using this so i can run this code on my mac and not trigger the gpio stuff.
	DISABLEDmockBot: { 
		setup: 		function(){ console.log('mock function called') },
		setGPIO: 	function(){ console.log('mock function called') },
		getGPIO: 	function(){ console.log('mock function called') },
		setMotor: 	function(){ console.log('mock function called') },
		getMotor: 	function(){ console.log('mock function called') },
		setLED: 	function(){ console.log('mock function called') },
		getLED: 	function(){ console.log('mock function called') },
		getOC: 		function(){ console.log('mock function called') },
		setOC: 		function(){ console.log('mock function called') },
		setSwitchCallback: function(){ console.log('mock function called') }
	}
};