const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rouletteSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: String,
    state: Number,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Roulette", rouletteSchema);
