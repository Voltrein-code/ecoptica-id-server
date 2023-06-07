const mongoose = require('mongoose');

const operationSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  operationType: {
    type: String,
    required: true,
    validate: {
      validator: (operationType) => operationType === 'debit' || operationType === 'credit',
      message: 'Неккоректный тип операции',
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model('operation', operationSchema);
