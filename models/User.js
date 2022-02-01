const { Schema, model } = require('mongoose');

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought',
    }],
    reactions: [{
      type: Schema.Types.ObjectId,
      ref: 'reaction'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }, { timestamps: true })


User.virtual('friendCount').get(function () {
  return this.friends.length
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('user', User)