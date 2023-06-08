const mongoose = require('mongoose');

const priorityCheck = (item) => item < 1 && item > 3;

const notificationSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  text: {
    type: String,
    minlength: 50,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  priority: {
    type: Number,
    default: 1,
    validate: {
      validator: (priority) => priorityCheck(priority),
      message: 'Неверное значение приоритета (разрешено от 1 до 3)',
    },
  },
});

module.exports = mongoose.model('notification', notificationSchema);
