var notificationSend = {};

notificationSend.send = function (scheduleData) {
console.log("Data send");
    var admin = require("firebase-admin");
    var serviceAccount ;

    if(scheduleData.os === 'ios') {
        serviceAccount = require("./GoogleService-Info.plist");
    } else {
        serviceAccount = require("./careven-dc568-firebase-adminsdk-16z0i-450b565a9c.json");
    }

    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://careven-dc568.firebaseio.com"
    });

    // var payload = {
    //     data: {
    //         notifcation: {
    //            title: 'Time to Wake Up',
    //            body:'It already time to go to office'
    //         }
    //     }
    // };

    var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
    };

    //console.log(serviceAccount );
    admin.messaging().sendToDevice(scheduleData.regToken, scheduleData.payload, options)
        .then(function(message) {
            console.log("Successfully notification send", message)
        })
        .catch(function(error) {
            console.log('Error notifcation failure', error)
        });

};

module.exports = notificationSend;