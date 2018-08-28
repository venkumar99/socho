import mongoose from 'mongoose';

var BeerSchema = new mongoose.Schema ({
    name: String,
    type: String,
    quantity: Number,
}
);

//export the Mongoose Model

module.exports = mongoose.model('Beer', BeerSchema);

