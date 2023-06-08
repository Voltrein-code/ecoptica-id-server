const mongoose = require('mongoose');

const checkDetailType = (item) => item === 'debit' || item === 'credit';

const detailSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  amount: {
    type: Number,
    required: true,
  },
  detailType: {
    type: String,
    validate: {
      validator: (detailType) => checkDetailType(detailType),
      message: 'Неверный тип операции',
    },
  },
});
