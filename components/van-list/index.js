Component({
  properties: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: String,
    finishedText: String,
    immediateCheck: {
      type: Boolean,
      value: true
    },
    offset: {
      type: Number,
      value: 300
    },
    direction: {
      type: String,
      value: 'down'
    }
  },
})