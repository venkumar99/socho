import mongoose, {
    SchemaType,
    SchemaTypes,
    Model
} from 'mongoose';

var NutritionSchema = new mongoose.Schema({
    userObjectId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    nutritionList: [{
        dateTime: {
            date:{
                type:Date,
            },
            hour:{
                type: Number,
            },
            min:{
                type: Number,
            }
        },
        noteText: {
            type: String
        },
        isBreakfastTaken:{
            type: Boolean
        },
        isLunchTaken: {
            type: Boolean
        },
        isDinnerTaken: {
            type: Boolean
        },
        isAssistanceNeeded: {
            type: Boolean
        },
        food: {
            type: String
        }
    }]

});

module.exports = mongoose.model('Nutrition', NutritionSchema);