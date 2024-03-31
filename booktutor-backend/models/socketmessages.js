const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Message schema and model
const SocketMessagesSchema = new mongoose.Schema({
    sender: String,
    recipient: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
  });

  const SocketMessages = mongoose.model('SocketMessages', SocketMessagesSchema);

  module.exports = SocketMessages;