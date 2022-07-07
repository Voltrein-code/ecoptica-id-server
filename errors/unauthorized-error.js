module.exports = class UnauhorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
