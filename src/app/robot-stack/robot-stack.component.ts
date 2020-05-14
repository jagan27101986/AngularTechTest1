import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-robot-stack',
  templateUrl: './robot-stack.component.html',
  styleUrls: ['./robot-stack.component.css']
})
export class RobotStackComponent implements OnInit {
  robotStackForm: FormGroup;
  outputData: any;
  constructor( private formBuilder: FormBuilder) {

  }
  ngOnInit() {
    const noWhiteSpace = /^(?!\s*$).+/;
      this.robotStackForm = this.formBuilder.group({
            roboValue: ['', {validators: [Validators.required, Validators.pattern(noWhiteSpace)]}],
          });
  }

  sendValues(){
   /** Process Values **/
     let robotValue = this.robotStackForm.controls.roboValue.value.trim();
     if(robotValue == "" || typeof robotValue == "undefined") {
        alert('Value Cannot be empty');
     } else {
       //GOTO Robot Execution
        var robot = new Robot(new RobotStack(10, 15));
         let roboOut = robot.execute(robotValue);
         this.outputData = 'The Output data is ' + roboOut.toString();
     }
  }

  clearValues(){
    /** CLEAR THE FORM **/
    this.robotStackForm.reset();
    this.outputData='';
  }
}
/** ROBOT AND ROBOSTACK CLASSES AS CLOSURES - Return DATA **/
var Robot = (function () {
    function Robot(piles) {
        /*private*/ this.position = 0;
        /*private*/ this.hasBlock = false;
        if (this.piles === undefined)
            this.piles = null;
        if (this.maxWidth === undefined)
            this.maxWidth = 0;
        this.maxWidth = piles.getWidth();
        this.piles = piles;
    }
    Robot.prototype.execute = function (robotValue) {
        {
            let robotSplitValue = robotValue.split('');
            robotSplitValue.map(values => {
              switch ((values).charCodeAt(0) || values) {
                /** ASCII VALUES OR NORMAL VALUES **/
                  case 80:
                  case 'P':
                  case 'p':
                      this.pickup();
                      break;
                  case 77:
                  case 'M':
                  case 'm':
                      this.move();
                      break;
                  case 76:
                  case 'L':
                  case 'l':
                      this.lower();
                      break;
                  default: /* ÁNYTHING APRT FROM THESE CHARACTERS */
                    console.log("*** Unknown command " + values);
              }
            });
        }
        /** MESSAGE TO BE PRINTED **/
        let roboJoin = [];
        let roboOutput = this.piles.toString();
        return roboOutput;

    };
    /*private*/ Robot.prototype.pickup = function () {
      /*** RESET BLOCK - AVAILABLE AND RESET POSITION TO 0 **/
        this.hasBlock = true;
        this.position = 0;
    };
    /*private*/ Robot.prototype.move = function () {
       /** INCREMENT POSITION BY 1 **/
       /** WIDTH IS 9 ALWAYS UNTIL PILE WIDTH IS CHANGED**/
        this.position = Math.min(++this.position, this.maxWidth);
    };
    /*private*/ Robot.prototype.lower = function () {
       /** DROP THE POSITION AFTER MOVE OR POSITION  **/
        if (this.piles.drop(this.position)) {
            this.hasBlock = false;
        }
    };
    return Robot;
}());

var RobotStack = (function () {
  /** Get Height and Width from the Value Passed - RoboStack **/
    function RobotStack(width, height) {
        if (this.width === undefined)
            this.width = 0;
        if (this.height === undefined)
            this.height = 0;
        if (this.piles === undefined)
            this.piles = null;
        this.width = width - 1;
        this.height = height;
        this.piles = (function (s) { var a = []; while (s-- > 0)
              a.push(0); return a; })(width);
    }
    // RobotStack.prototype.getWidthPosition = function (widthData) {
    //   let arrayWidthStack = [];
    //   while (widthData-- > 0)
    //     arrayWidthStack.push(0);
    //     return arrayWidthStack;
    //   }

    RobotStack.prototype.toString = function () {
      /** If the code is more than 9 make the characters as a to .... **/
        let _this = this;
        let res = { str: "", toString: function () { return this.str; } };
        let _loop_1 = function (i) {
            {
                /* append */ (function (sb) {
                  sb.str = sb.str.concat(_this.piles[i].toString(16).toUpperCase());
                  return sb;
                  })(res);
            }
            ;
        };
        this.piles.map((value,index) =>  {
             _loop_1(index);
        });

        return res.str;
    };

    RobotStack.prototype.drop = function (position) {
       //CHECK THE STACK IF THERE ANY POSITION AVAILABLE
        let positionValid = position <= (this.width - 1);
        // PILE AVAILABLE TO PLACE IT
        let pileAvailable = this.piles[position] < this.height;
        if (positionValid && pileAvailable) {
            this.piles[position]++;
        }
        return positionValid && pileAvailable;
    };
    RobotStack.prototype.getWidth = function () {
        return this.width;
    };
    RobotStack.prototype.getHeight = function () {
        return this.height;
    };
    return RobotStack;
}());
