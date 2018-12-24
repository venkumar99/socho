var notificationSend = {};

notificationSend.send = function (regToken) {
console.log("Data send");
    var admin = require("firebase-admin");

    var serviceAccount = require("./careven-dc568-firebase-adminsdk-16z0i-450b565a9c.json");

    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://careven-dc568.firebaseio.com"
    });

    var regToken = "";

    var payload = {
        data: {
            notifcation: 'Time to Wake Up'
        }
    };

    var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
    };

    //console.log(serviceAccount );
    admin.messaging().sendToDevice(regToken, payload, options)
        .then(function(message) {
            console.log("Successfully notification send", message)
        })
        .catch(function(error) {
            console.log('Error notifcation failure', error)
        });

};

module.exports = notificationSend;