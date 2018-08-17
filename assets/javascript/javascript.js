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



    name = $("#trainName").val().trim();
    destination = $("#trainDestination").val().trim();
    frequency = $("#trainFrequency").val().trim();
    nextArrival = $("#trainFirst").val().trim();





    var newTrain = {
        name: name,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
    }

    database.ref().push(newTrain)

    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainFirst").val("");
    $("#trainFrequency").val("");

})

database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val())
    var name = snapshot.val().name
    var destination = snapshot.val().destination
    var frequency = snapshot.val().frequency
    var nextArrival = snapshot.val().nextArrival

    var firstTrain = nextArrival;
    console.log(firstTrain);
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "y");
    console.log(firstTrainConverted);
    var currentTime = moment();
    console.log(currentTime);
    var diffTime = currentTime.diff(moment(firstTrainConverted), "minutes")
    console.log(diffTime)
    var timeRemainder = diffTime % frequency;
    console.log(timeRemainder)
    var minutesTilTrain = frequency - timeRemainder;
    console.log("this many minutes til next train: " + minutesTilTrain)
    var nextTrain = currentTime.add(minutesTilTrain, "minutes");
    var nextTrainTime = (moment(nextTrain).format("h:mm A"));
    console.log(nextTrainTime);

    var newRow = $('<tr>');
    newRow.append($('<td>').html(name));
    newRow.append($('<td>').html(destination));
    newRow.append($('<td>').html(frequency));
    newRow.append($('<td>').html(nextTrainTime));
    newRow.append($('<td>').html(minutesTilTrain));

    $("#trainInfo").append(newRow);
})