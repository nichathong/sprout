const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GardenPlantSchema = new Schema({
    ownerId:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    plantId:{
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

const GardenPlant = mongoose.model('garden_plants',GardenPlantSchema);
module.exports(GardenPlant);
