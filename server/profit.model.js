const { Schema, model, mongo, Types } = require("mongoose");

const profiltModel = Schema({
  timestamp: {
    type: String,
    required: true,
  },

  profitPercentage: {
    type: Types.Decimal128,
    required: true,
  },
});

module.exports = model("Profit", profiltModel);
