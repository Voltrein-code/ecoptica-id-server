const mongoose = require('mongoose');

const bonusCardShema = mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  operations: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'operation',
  }],
});

module.exports = mongoose.model('bonusCard', bonusCardShema);
