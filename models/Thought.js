const { Schema, model } = require('mongoose');

const Thought = new Schema({
  body: {
    type: String,
    required: 'You need to leave a post!',
    minlength: 1,
    maxlength: 280
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'reaction'
  }]
}, { timestamps: true }
)

module.exports = model('thought', Thought)