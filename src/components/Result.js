import React from "react";
import cold from "./cold.png";
import hot from "./hot.png";
import off from "./off.png";

var mqtt = require('mqtt');
var client = mqtt.connect('wss://test.mosquitto.org:8081');



client.on("connect", () => {
    client.subscribe("test/temp");
    console.log("nice");
})



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



const images = [
    cold,
    hot,
]

var sensorTemp = "";

var imageSource = "";










const testTemp = 31;
// var imageSource = "";
var power = true;
var waterSaved = 0;
var flowRate = 30;

// function whichImage() {
//     imageSource = images[0];
//     while (testTemp > 30) {
//         function myFunction() { 
//             setInterval(myTimer, 1000);
//         }
//         myFunction();
//         function myTimer() {
//             waterSaved += flowRate;
//             document.getElementById("demo").innerHTML = waterSaved
//         };
//         imageSource = images[1];
//         return imageSource;
//     };
//     window.onload = function savedWater(){
//     document.getElementById("demo").innerHTML = waterSaved;
//     };

//     return imageSource;
// };

// const chooseImage = whichImage();


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
            <p className="result__key">Error:
            <span className="result__value"> {props.error}</span>
            </p>}
        <p>Litres of Water Saved:</p>
        <p id="demo"></p>
    </div>
);


export default Result;