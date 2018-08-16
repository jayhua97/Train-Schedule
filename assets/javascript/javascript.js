// Initialize Firebase
var config = {
apiKey: "AIzaSyD1jKe9E_xZ_IZyPBq6BIvwuwyeEV-39Jk",
authDomain: "trainschedule-6d985.firebaseapp.com",
databaseURL: "https://trainschedule-6d985.firebaseio.com",
projectId: "trainschedule-6d985",
storageBucket: "",
messagingSenderId: "644939206838"
};
firebase.initializeApp(config);

database = firebase.database();



$("#addTrain").on("click", function(event) {
    event.preventDefault();
    var name = 'default';
    var destination = 'default';
    var frequency = 'default';
    var nextArrival = 'deafult';
    var minutesAway = 'default';



    name = $("#trainName").val().trim();
    destination = $("#trainDestination").val().trim();
    frequency = $("#trainFrequency").val().trim();
    nextArrival = $("#trainFirst").val().trim();
    minutesAway = $("#trainName").val().trim();



    var firstTrain = $("#trainFirst").val().trim();
    console.log(firstTrain);
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "y");
    console.log(firstTrainConverted);
    var currentTime = moment();
    console.log(currentTime);
    var diffTime = currentTime.diff(moment(firstTrainConverted), "minutes")
    console.log(diffTime)
    var trainRemainder = diffTime % frequency;
    console.log(trainRemainder)
    var minutesTilTrain = frequency - trainRemainder;
    console.log("this many minutes til next train: " + minutesTilTrain)
    var nextTrain = currentTime.add(minutesTilTrain, "minutes");
    var nextTrainTime = (moment(nextTrain).format("HH:mm"));
    console.log(nextTrainTime);

    var newTrain = {
        name: name,
        destination: destination,
        frequency: frequency,
        nextArrival: nextTrainTime,
        minutesAway: minutesTilTrain
    }

    database.ref().push(newTrain)


})

database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val())
    var name = snapshot.val().name
    var destination = snapshot.val().destination
    var frequency = snapshot.val().frequency
    var nextArrival = snapshot.val().nextArrival
    var minutesAway = snapshot.val().minutesAway

    var newRow = $('<tr>');
    newRow.append($('<td>').html(name));
    newRow.append($('<td>').html(destination));
    newRow.append($('<td>').html(frequency));
    newRow.append($('<td>').html(nextArrival));
    newRow.append($('<td>').html(minutesAway));

    $("#trainInfo").append(newRow);
})