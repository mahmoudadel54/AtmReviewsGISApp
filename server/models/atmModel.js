const mongoose = require("mongoose");
const { Schema } = mongoose;
const geoJSONSchema = new Schema({
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
});

const atmSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User " },
  type: { type: String, default: "Feature" },
  // location:{
    properties: {
      full_id: String,
      osm_id: String,
      osm_type: String,
      amenity: String,
      name_en: String,
    },
// },
geometry: {
  type: geoJSONSchema,
  required: true,
  index: "2dsphere", // Create a special 2dsphere index on `City.location`
},
},
{timestamps: { createdAt: true, updatedAt: true }}
);

const AtmModel = mongoose.model("Atm", atmSchema);

module.exports = AtmModel;
