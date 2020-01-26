import React from "react";
import cold from "./cold.png";
import hot from "./hot.png";

var mqtt = require('mqtt');
var client = mqtt.connect('wss://test.mosquitto.org:8081');


// Checks if RPi is connected, console logs message
client.on("connect", () => {
    client.subscribe("test/temp");
    console.log("Connected");
})


// Checks temperature input from RPi, changes image and records water saved based on flow rate if temp greater than 28 degrees 

client.on("message", (topic, payload) => {
    console.log(parseFloat(payload.toString()));

    function whichImage() {
        if (parseFloat(payload) > 28) {

            waterSaved += flowRate;
            document.getElementById("demo").innerHTML = waterSaved;
            document.getElementById("image").src = hot;

        } else {
            document.getElementById("image").src = cold;
        }
        window.onload = function savedWater() {
            document.getElementById("demo").innerHTML = waterSaved;
        };
        return imageSource;
    };
    whichImage();

})




var imageSource = "";







var waterSaved = 0;
var flowRate = 30;



// Prints current water flow rate or issues a warning if input is invalid.
// Displays litres of water saved if given valid input and temperature is beyond threshold
const Result = props => (
    <div className="result">
        <br></br>
        <p className="pad">Current state:</p>
        <img id="image" height="480" width="630"></img>
        <br></br>


        {props.saved &&
            <p className="result__key">The flow rate is currently at:
            <span className="result__value"> { flowRate = parseFloat(props.saved) }</span> L/s
            
            { console.log(flowRate) }
            </p>
        }

        {props.error && 
            <p className="result__key">Warning:
            <span className="result__value"> {props.error}</span>
            </p>}
        <p>Litres of Water Saved:</p>
        <p id="demo"></p>
    </div>
);


export default Result;