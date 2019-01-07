import moment from 'moment';

import User from '../models/user';
import DeviceDetail from '../models/deviceDetail'

var deviceController = {};


/**
 * Get list of Consent
 * @param {Object} request 
 * @param {Object} response 
 */
deviceController.getDeviceDetail = function(userId) {
    DeviceDetail.findOne({
            userObjectId: userId  
        })
        .exec()
        .then(function (deviceDetail) { 
            if(deviceDetail) {
                console.log('consent ', constents)
                return deviceDetail
            } else {
                console.log("Something went wrong ", deviceDetail)
            }
        });
};

/**
 * Add Device Detail
 * @param {*} deviceDetail 
 */
deviceController.addDeviceDetail = function(deviceDetail, userId) {
    var note_dateUTC = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    var device = {
        deviceList: {
            dateTime: {
                date:note_dateUTC,
                hour:moment.utc(note_dateUTC,'HH'),
                min:moment.utc(note_dateUTC,'mm')
            },
            deviceId:deviceDetail.deviceId,
            token: deviceDetail.token,
            os:deviceDetail.os
        }
    };

    DeviceDetail.findOneAndUpdate( 
        {
            userObjectId: userId
        },
        {
            $push: device
        },
        {
            safe:true,
            upsert:true
        }
    )
    .exec()
    .then(function (deviceInfo) { 
        console.log("Device has been Added")
    });
}

module.exports = deviceController;


