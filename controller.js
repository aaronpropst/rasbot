var RaspiRobot = require("raspirobot").RaspiRobot;


function Controller(config){
    if (typeof config.mockBot !== 'undefined'){
        this.robot = config.mockBot;
    }else{
        this.robot = new RaspiRobot();
    }
    this.robot.setup();
}

module.exports = Controller;


Controller.prototype.forward = function(){
    this.robot.setMotor('left', 1, 1);
    this.robot.setMotor('right', 1, 1);
};

Controller.prototype.back = function(){
    this.robot.setMotor('left', 1, 0);
    this.robot.setMotor('right', 1, 0);
};
Controller.prototype.left = function(){
    this.robot.setMotor('left', 1, 0);
    this.robot.setMotor('right', 0, 1);
};
Controller.prototype.right = function(){
    this.robot.setMotor('left', 0, 1);
    this.robot.setMotor('right', 1, 0);
};
Controller.prototype.stop = function(){
    this.robot.setMotor('left', 0, 0);
    this.robot.setMotor('right', 0, 0);
};