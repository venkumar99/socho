import medicationController from './medicationController';
import deviceController from './deviceController'; 
import notificationSend from '../util/notificationSend';

var schedularController = {};

var earlyMorningtTime = [];
var morningTime = [];
var noonTime = [];
var eveningTime = [];
var dinnerTime = [];
var lateNightTime = [];
var  allOther = [];

schedularController.schedule = function(agenda) {
    //Schedule Job Created
    agenda.define('2amJob', (job, done) => {
        console.log("2 am job");
       var scheduleData =  medicationController.getMedicationsbyCurrentDate();
       console.log(scheduleData);
        if(scheduleData) {
            schedularController.setUpdateSchedule(scheduleData);
        } else {
            console.log("2 am job failed!");
        };
        done();
    });

    agenda.define('6amJob', (job, done) => {
        console.log("6 am job");
        if(earlyMorningtTime) {
            schedularController.sendNotification(earlyMorningtTime);
        } else {
            console.log("6 am job failed!");
        };
        done();
    });
    

    agenda.define('9amJob', (job, done) => {
    console.log("9 am job");
    if(morningTime) {
        schedularController.sendNotification(morningTime);
    } else {
        console.log("9 am job failed!");
    };
    done();
    });  

    agenda.define('12pmJob', (job, done) => {
    console.log("12 pm job");
    if(noonTime) {
        schedularController.sendNotification(noonTime);
    } else {
        console.log("12 aPM job failed!");
    };
    done();
    });
    

    agenda.define('3pmJob', (job, done) => {
        console.log("3 pm job");
        if(eveningTime) {
            schedularController.sendNotification(eveningTime);
        } else {
            console.log("3 pm job failed!");
        };
        done();
    });
    

    agenda.define('6pmJob', (job, done) => {
    console.log("6 pm job");
    if(dinnerTime) {
        schedularController.sendNotification(dinnerTime);
    } else {
        console.log("6 pm job failed!");
    };
    done();
    });  
    

    agenda.define('9pmJob', (job, done) => {
    console.log("9 pm job");
    if(lateNightTime) {
        schedularController.sendNotification(lateNightTime);
    } else {
        console.log("9 pm job failed!");
    };
    done();
    });
    
    //Job Trigger
    agenda.schedule('2:00am', '2amJob');
    agenda.schedule('5:45am', '6amJob');
    agenda.schedule('8:45am', '9amJob');
    agenda.schedule('11:45am', '12pmJob');
    agenda.schedule('2:45am', '3pmJob');
    agenda.schedule('5:45pm', '6pmJob');
    agenda.schedule('8:45pm', '9pmJob');

}

schedularController.setUpdateSchedule = function(listOfSchedule) {

    listOfSchedule.map(schedule => {
        let deviceDetail = deviceController.getDeviceDetail(schedule.userObjectId);

        if(deviceDetail) {
            let payload = {
                data: {
                    notifcation: {
                       title: 'Time to take medication',
                       body:''
                    }
                },
                regToken: deviceDetail.token,
                os: deviceDetail.os,
                userId: schedule.userObjectId,
                medicineName : schedule.medicationName
            }

            if(schedule.timesADay == 1 ) {
                payload.data.notifcation.body='Please take your medication at 8:00 AM';
                morningTime.push(payload);
            } else if(schedule.timesADay == 2) {
                payload.data.notifcation.body='Please take your medication at 8:00 AM';
                morningTime.push(payload);
                payload.data.notifcation.body='Please take your medication at 8:00 PM';
                dinnerTime.push(payload);
            } else if(schedule.timesADay == 3) {
                payload.data.notifcation.body='Please take your medication at 8:00 AM';
                morningTime.push(payload);
                payload.data.notifcation.body='Please take your medication at 12:00 PM';
                eveningTime.push(payload);
                payload.data.notifcation.body='Please take your medication at 8:00 PM';
                dinnerTime.push(payload);
            } else if(schedule.timesADay == 4) {
                payload.data.notifcation.body='Please take your medication at 8:00 AM';
                morningTime.push(payload);
                payload.data.notifcation.body='Please take your medication at 12:00 PM';
                noonTime.push(payload);
                payload.data.notifcation.body='Please take your medication at 4:00 PM';
                eveningTime.push(payload);
                payload.data.notifcation.body='Please take your medication at 8:00 PM';
                dinnerTime.push(payload);
            } else if(schedule.timesADay == 6) {
                payload.data.notifcation.body='Please take your medication at 6:00 AM';
                earlyMorningtTime.push(payload);
                payload.data.notifcation.body='Please take your medication at 9:00 AM';
                morningTime.push(payload);
                payload.data.notifcation.body='Please take your medication at 12:00 PM';
                noonTime.push(payload);
                payload.data.notifcation.body='Please take your medication at 3:00 PM';
                eveningTime.push(payload);
                payload.data.notifcation.body='Please take your medication at 6:00 PM';
                dinnerTime.push(payload);
                payload.data.notifcation.body='Please take your medication at 9:00 PM';
                lateNightTime.push(payload);
            } else {
                allOther.push(payload);
            } 

        }
    })
};

schedularController.sendNotification = function(scheduleList) {
    scheduleList.map(sendItems => {
        notificationSend.send(sendItems);
    })
}

schedularController.getTodaySchedule = function(request, response) {
    let userSchedule = [];
    if(request.body.userid) {
        schedularController.filterUserSchedule(earlyMorningtTime, request.body.userid,userSchedule, earlyMorning);
        schedularController.filterUserSchedule(morningTime, request.body.userid,userSchedule, morning);
        schedularController.filterUserSchedule(noonTime, request.body.userid,userSchedule, noon);
        schedularController.filterUserSchedule(eveningTime, request.body.userid,userSchedule, evening);
        schedularController.filterUserSchedule(dinnerTime, request.body.userid,userSchedule, dinner);
        schedularController.filterUserSchedule(lateNight, request.body.userid,userSchedule, lateNight);
    }

    response.status(200).json(userSchedule);
}
schedularController.filterUserSchedule = function(listOfData, userId, userSchedule, time) {
    let date  = moment().toDate();
    listOfData.map(item => {
        if(userId === item.userId) {
            let detail = {
                date: item.medicineName,
                time: time
            }
            userSchedule.push(detail);
        }
    })
}


module.exports = schedularController;