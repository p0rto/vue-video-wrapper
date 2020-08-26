import VimeoPlayer from '@vimeo/player';
import assign from 'object-assign';

import events from '../constants/vimeoEvents';

let videoCount = 0;

export default {
    name: 'VimeoPlayer',
    props: {
        videoId: { 
          type: Number, 
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
    },
    methods: {
        update (videoId) {
            return this.player.loadVideo(videoId)
        },
        play () {
            return this.player.play()
        },
        pause () {
            return this.player.pause()
        },
        mute () {
            return this.player.setVolume(0)
        },
        unmute (volume = 0.5) {
            return this.player.setVolume(volume)
        },
        emitVueEvent (event) {
          this.player.on(event, (data) => {
            this.$emit(event, data, this.player)
          });
        },
        setEvents() {
            this.player.ready()
              .then(function () {
                this.$emit('ready', this.player)
              })
              .catch((error) => {
                this.$emit('error', error, this.player)
              })
          
            events.forEach(event => this.emitVueEvent.call(this, event))
        }
    },
    data() {
        videoCount += 1;

        return {
            htmlId: `embed-vimeo-video-${videoCount}`,
            player: null
        }
    },
    render (h) {
        return h('div', { attrs: { id: this.htmlId } })
    },
    mounted() {
        const options = {
            id: this.videoId,
            width: this.playerWidth,
            height: this.playerHeight,
            loop: this.loop,
            autoplay: this.autoplay,
            controls: this.controls
          }
          if (this.videoUrl) { options.url = this.videoUrl }
      
          this.player = new VimeoPlayer(this.htmlId, assign(options, this.options));

          this.setEvents();
    },
    watch: {
        videoId: 'update',
    },
    beforeDestroy () {
      this.player.unload()
    }
}