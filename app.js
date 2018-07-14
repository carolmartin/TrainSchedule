// Initialize Firebase

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCNv54OmFV5t3hzF8WQH7YuM0VKyCNHAFs",
    authDomain: "trainschedule-1ca26.firebaseapp.com",
    databaseURL: "https://trainschedule-1ca26.firebaseio.com",
    projectId: "trainschedule-1ca26",
    storageBucket: "trainschedule-1ca26.appspot.com",
    messagingSenderId: "909343682622"
};
firebase.initializeApp(config);


var tFrequency = 0;


var firstTime;

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
    row.append("<td>" + moment(nextTrain).format("hh:mm a") + "</td>");
    row.append("<td>" + tMinutesTillTrain + "</td>");

    $("tbody").append(row);

    var database = firebase.database();

    database.ref().push({
        trainName: $("#trainName").val().trim(),
        destination: $("#destination").val().trim(),
        frequency: $("#frequency").val().trim(),
        firstTime: $("#firstTime").val().trim()
    });

});

function getTrainArrival(tFrequency, firstTime) {

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
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));
}

loadTrainSchedule();

function loadTrainSchedule() {
    // Loop through users in order with the forEach() method. The callback
    // provided to forEach() will be called synchronously with a DataSnapshot
    // for each child:
    var query = firebase.database().ref().orderByKey();
    // var query = firebase.database().ref().orderByKey(trainName);
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                
                var key = childSnapshot.key;
                var row = $("<tr>");

                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                console.log(childData);

                // format data onto HTML page

                row.append("<td>" + childData.trainName + "</td>");
                row.append("<td>" + childData.destination + "</td>");
                row.append("<td>" + childData.frequency + "</td>");
                tFrequency = childData.frequency
                console.log("frequency is " + tFrequency);

                firstTime = childData.firstTime;
            
                console.log("first time is " + firstTime);
            
                // Call function to calculate the arrival of the next train and minute away
                getTrainArrival(tFrequency, firstTime);
                //  append the next time to the row we are formating to load onto the page
                row.append("<td>" + moment(nextTrain).format("hh:mm a") + "</td>");
                row.append("<td>" + tMinutesTillTrain + "</td>");

                $("tbody").append(row);

            });
        });
};
