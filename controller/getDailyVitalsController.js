import moment from 'moment';
import User from '../models/user';
import LastUpdate from '../models/lastUpdate';

var getDailyVitalsController = {};


getDailyVitalsController.getLastUpdate= function (req, res) { 
    console.log('getLastUpdate', req.query.userId);
    LastUpdate.findOne({ 
        userObjectId: req.query.userId
    })
    .exec()
    .then(function (data) { 
        if(data) {
            res.status(200).json({
                lastUpdated: data.lastUpdateList[data.lastUpdateList.length - 1]
            });
        } else {
            res.status(204).json({
                lastUpdated:{}
            });
        }
    })
}

module.exports = getDailyVitalsController;