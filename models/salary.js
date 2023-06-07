const mongoose = require('mongoose');

const checkSalaryType = (item) => item === 'basic' || item === 'prepayment' || item === 'other';

const salarySchema = mongoose.Schema({
  salaryType: {
    type: String,
    required: true,
    validate: {
      validator: (salaryType) => checkSalaryType(salaryType),
      message: 'Некорректный тип операции',
    },
    amount: {
      type: Number,
      required: true,
    },
    details: [{
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: 'detail',
    }],
    deduction: {
      type: Number,
      required: true,
    },
    next: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
});

module.exports = mongoose.model('salary', salarySchema);
