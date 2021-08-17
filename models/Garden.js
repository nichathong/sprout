const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GardenSchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    plant:{
        type: Schema.Types.ObjectId,
        ref: 'plants'
    },
    waterDate:{
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
      }
});

const Garden = mongoose.model('gardens',GardenSchema);
module.exports=GardenPlant;
