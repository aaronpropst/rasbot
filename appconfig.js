module.exports = {
	webServerPort: 8081,
	socketServerPort: 8082,
	//using this so i can run this code on my mac and not trigger the gpio stuff.
	DISABLEDmockBot: { 
		setup: 		function(){ console.log('mock setup') },
		setGPIO: 	function(){ console.log('mock setGPIO') },
		getGPIO: 	function(){ console.log('mock getGPIO') },
		setMotor: 	function(){ console.log('mock setMotor') },
		getMotor: 	function(){ console.log('mock getMotor') },
		setLED: 	function(){ console.log('mock setLED') },
		getLED: 	function(){ console.log('mock getLED') },
		getOC: 		function(){ console.log('mock getOC') },
		setOC: 		function(){ console.log('mock setOC') },
		setSwitchCallback: function(){ console.log('mock setSwitch') }
	}
};