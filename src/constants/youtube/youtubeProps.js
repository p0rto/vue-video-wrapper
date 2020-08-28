export default {
    videoId: {
        type: String
    },
    playerVars: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: [Number, String],
      default: 360
    },
    width: {
      type: [Number, String],
      default: 640
    },
    resize: {
      type: Boolean,
      default: false
    },
    resizeDelay: {
      type: Number,
      default: 100
    },
    nocookie: {
      type: Boolean,
      default: false
    },
    fitParent: {
      type: Boolean,
      default: false
    }
};