const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GardenPlantSchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    plant:{
        type: Schema.Types.ObjectId,
        ref: 'plants'
    },
    nickname:{
        type: String,
        default: 'My Plant'
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

const GardenPlant = mongoose.model('garden_plants',GardenPlantSchema);
module.exports=GardenPlant;
