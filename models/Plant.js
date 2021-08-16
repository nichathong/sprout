const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PlantSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type: String,
        required: true
    }
    // tags:{
    //     type: Array,
    //     default: []
    // },
    // waterLevel:{
    //     type: Number,
    //     required: true
    // },
    // light:{
    //     type: Number,
    //     required: true
    // },
    // temperature:{
    //     type: String,
    //     default: ''
    // },
    // level:{
    //     type:String,
    //     required: true
    // },
    // waterFrequency:{
    //     type: Number,
    //     required: true
    // },
    // photoUrls:{
    //     type: Array,
    //     default: []
    // }

})

const Plant = mongoose.model('plants',PlantSchema);
module.exports= Plant;
