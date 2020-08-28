export default {
    videoId: { 
      type: [String, Number], 
      required: true
    },
    playerHeight: {
      type: [String, Number],
      default: 320
    },
    playerWidth: {
      type: [String, Number],
      default: 640
    },
    options: {
      type: Object,
      default: () => ({})
    },
    videoUrl: {
      type: String,
      default: undefined
    },
    loop: {
      type: Boolean,  
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    }
};