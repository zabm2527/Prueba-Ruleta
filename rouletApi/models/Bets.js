const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const betsSchema = new Schema(
  {
    idBet: {
      type: Number,
      unique: true,
    },
    idRoulette: Number,
    idUser: Number,
    bet: [
      {
        number: Number,
        color: String,
        value: Number,
      }
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Bets", betsSchema);
