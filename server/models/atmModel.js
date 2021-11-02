const mongoose = require('mongoose');
const {Schema} = mongoose;

const atmSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User ' },
    geojson:{
        type:{type:String, default:"Feature"},
        properties:{
            full_id: String,
            osm_id:String,
            osm_type:String,
            amenity:String,
            name_en:String,
        },
        geometry: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], 
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }
    }
    });

  
const AtmModel = mongoose.model('Atm', atmSchema)


module.exports = AtmModel;