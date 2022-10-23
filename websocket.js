//variables
var connected_flag = 0;
var mqtt;
var reconnectTimeout = 2000;
var host ="broker.hivemq.com";
var port = 8000 ; 

var chart; // global variuable for chart
var dataTopics = new Array();


//call back function
function onConnect(){
    console.log("Connected")
    connected_flag = 1;
    //mqtt.subscribe("testtopic/22")         

}

function onConnectionLost(){
    console.log("Connection Lost");
    document.getElementById("messages").innerHTML = "Connection Lost";
    connected_flag = 0;
}



//connect and create a client
function MQTTconnect(){

    console.log("connecting to " + host + " " + port);
    mqtt = new Paho.MQTT.Client(host, port, "clientjs"); //client js -> client ID
    var options = {
        timeout : 3,
        onSuccess: onConnect,
        //onFailure: onFailure,
    };
    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived
    mqtt.connect(options);

    return false;
}

function sub_topics(){
    document.getElementById("messages").innerHTML="";
    if (connected_flag==0){
        out_msg = "<b>Not Connected so cant subscribe</b>"
        console.log(out_msg);
        documen.getElementById("messages").innerHTML = out_msg;
        return false;
    }
    var stopic = document.forms["subs"]["Stopic"].value;
    console.log("Subscribing to topic = " + stopic);
    mqtt.subscribe(stopic);
    return false;
   
}


function onMessageArrived(msg){
    out_msg = "Message received : " + msg.payloadString + " % ";
    console.log(dataTopics.indexOf(msg.destinationName));
    stringvalue = msg.payloadString;
    console.log(out_msg)
    document.getElementById("messages").innerHTML= out_msg;

    //    // gauge
}

MQTTconnect();
console.log("connected")


// //check if a real number
// function isNumber(n) {
// return !isNaN(parseFloat(n)) && isFinite(n);
// };

// //function that is called once the document has loaded
// function init() {
// //i find i have to set this to false if i have trouble with timezones.
// Highcharts.setOptions({
//   global: {
//       useUTC: false
//   }
// });
// // Connect to MQTT broker
// //client.connect(options);
// };


//this adds the plots to the chart
// function plot(point, chartno) {
//   console.log(point);

//       var series = chart.series[0],
//           shift = series.data.length > 20; // shift if the series is
//                                            // longer than 20
//       // add the point
//       chart.series[chartno].addPoint(point, true, shift);
// };

//   //settings for the chart
// $(document).ready(function() {
//   chart = new Highcharts.Chart({
//       chart: {
//           renderTo: 'container',
//           defaultSeriesType: 'spline'
//       },
//       title: {
//           text: 'Real Time Moisture data variation'
//       },
//       xAxis: {
//           type: 'datetime',
//           tickPixelInterval: 150,
//           maxZoom: 20 * 1000
//       },
//       yAxis: {
//           minPadding: 0.2,
//           maxPadding: 0.2,
//           title: {
//               text: 'Value',
//               margin: 80
//           }
//       },
//       series: []
//   });
// });