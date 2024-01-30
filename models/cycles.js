const mongoose = require("mongoose");
const { Schema } = mongoose;

const cycleSchema = new Schema({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  gridAmountConsumed: Number,
  totalVCAP: Number,
  gridFixedCharges: Number,

  p1name: String,
  p1InitialMeter: Number,
  p1FinalMeter: Number,
  p1consumption: Number,

  p2name: String,
  p2InitialMeter: Number,
  p2FinalMeter: Number,
  p2consumption: Number,

  p3name: String,
  p3InitialMeter: Number,
  p3FinalMeter: Number,
  p3consumption: Number,

  p4name: String,
  p4InitialMeter: Number,
  p4FinalMeter: Number,
  p4consumption: Number,

  gridUnitsConsumed: Number,
  totalAmt: Number,

  p1Owes: Number,
  p2Owes: Number,
  p3Owes: Number,
  p4Owes: Number,
  transactions: [String],
});

module.exports = mongoose.model("futecCycles", cycleSchema);
