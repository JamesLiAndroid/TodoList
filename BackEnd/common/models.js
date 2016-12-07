module.exports = {
  user:{
    name:{
      type: String,
      required: true
    },
    password:{
      type: String,
      required: true
    }
  },

  todoItems:{
    userId: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    time: {
      type: String,
    },

    isDel: {
      type: Boolean,
      default: false
    },

    isComplete: {
      type: Boolean,
      default: false
    }
  }
}
