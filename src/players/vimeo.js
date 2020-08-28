import VimeoPlayer from '@vimeo/player';
import assign from 'object-assign';

import events from '../constants/vimeo/vimeoEvents';
import props from '../constants/vimeo/vimeoProps';

let videoCount = 0;

export default {
    name: 'VimeoPlayer',
    props: props,
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