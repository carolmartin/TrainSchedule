// Initialize Firebase
var config = {
    apiKey: "AIzaSyAL7s3MHTYEbDtftSU8cumnHZ3F59nOYtk",
    authDomain: "carolssuperawesomeproject.firebaseapp.com",
    databaseURL: "https://carolssuperawesomeproject.firebaseio.com",
    projectId: "carolssuperawesomeproject",
    storageBucket: "carolssuperawesomeproject.appspot.com",
    messagingSenderId: "802458806033"
};
firebase.initializeApp(config);


// Assume the following situations.

// (TEST 1)
// First Train of the Day is 3:00 AM
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:18 -- 2 minutes away

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:21 -- 5 minutes away


// ==========================================================

// Solved Mathematically
// Test case 1:
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21

// Assumptions
var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

var tRemainder = 0;
var nextTrain;
var tMinutesTillTrain = 0;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


$(".btn-primary").on("click", function (e) {
    e.preventDefault();
    var row = $("<tr>");
    row.append("<td>" + $("#trainName").val().trim() + "</td>");
    row.append("<td>" + $("#destination").val().trim() + "</td>");
    row.append("<td>" + $("#frequency").val().trim() + "</td>");
    tFrequency = $("#frequency").val().trim();
    console.log("frequency is " + tFrequency);
    firstTime = $("#firstTime").val().trim();
    
    console.log("first time is " + firstTime);

    // Call funciton to calculate the arrival of the next train and minute away
    getTrainArrival(tFrequency, firstTime);
    //  append the next time to the row we are formating to load onto the page
    row.append("<td>" + moment(nextTrain).format("hh:mm") + "</td>");
    row.append("<td>" + tMinutesTillTrain + "</td>");

    // var dt2 = $("#startDate").val();
    // var res = dt2.split("/");
    // var startMonth = parseInt(res[0]);
    // var startYear = parseInt(res[2]);
    // var diffMonths = 12* year + month - (startMonth + startYear * 12);
    // console.log(diffMonths);
    // row.append("<td>" + diffMonths + "</td>");
    // row.append("<td>" + $("#monthlyRate").val().trim() + "</td>");
    // row.append("<td>" + diffMonths * $("#monthlyRate").val() + "</td>");
    $("tbody").append(row);

    var database = firebase.database();

    database.ref().push({
        trainName: $("#trainName").val().trim(),
        destination: $("#destination").val().trim(),
        frequency: $("#frequency").val().trim(),
        firstTime: $("#firstTime").val().trim()
    });

});

function getTrainArrival(tFrequency,firstTime){

    // Take the frequency and first time schedule to detemine minutes until next arrival and arrival time

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
}
