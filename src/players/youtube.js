import YoutubePlayer from 'youtube-player';

import { UNSTARTED, ENDED, PLAYING, PAUSED, BUFFERING, CUED } from '../constants/youtube/youtubeStates';
import props from '../constants/youtube/youtubeProps';

let videoCount = 0;

export default {
  name: 'YoutubePlayer',
  props: props,
  data () {
    videoCount += 1;

    return {
      player: {},
      events: {
        [UNSTARTED]: 'unstarted',
        [PLAYING]: 'play',
        [PAUSED]: 'pause',
        [ENDED]: 'ended',
        [BUFFERING]: 'buffering',
        [CUED]: 'cued'
      },
      resizeTimeout: null,
      htmlId: `embed-youtube-video-${videoCount}`,
    }
  },
  computed: {
    aspectRatio () {
      return this.width / this.height
    }
  },
  methods: {
    playerReady (e) {
      this.$emit('ready', e.target)
    },
    playerStateChange (e) {
      if (e.data !== null && e.data !== UNSTARTED) {
        this.$emit(this.events[e.data], e.target)
      }
    },
    playerError (e) {
      this.$emit('error', e.target)
    },
    updatePlayer (videoId) {
      if (!videoId) {
        this.player.stopVideo()
        return
      }

      if (this.playerVars.autoplay === 1) {
        this.player.loadVideoById({ videoId })
        return
      }

      this.player.cueVideoById({ videoId })
    },
    resizeProportionally () {
      this.player.getIframe().then(iframe => {
        const width = this.fitParent
          ? iframe.parentElement.offsetWidth
          : iframe.offsetWidth
        const height = width / this.aspectRatio
        this.player.setSize(width, height)
      })
    },
    onResize () {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(
        this.resizeProportionally,
        this.resizeDelay
      )
    }
  },
  watch: {
    videoId: 'updatePlayer',
    resize (val) {
      if (val) {
        window.addEventListener('resize', this.onResize)
        this.resizeProportionally()
      } else {
        window.removeEventListener('resize', this.onResize)
        this.player.setSize(this.width, this.height)
      }
    },
    width (val) {
      this.player.setSize(val, this.height)
    },
    height (val) {
      this.player.setSize(this.width, val)
    }
  },
  beforeDestroy () {
    if (this.player !== null && this.player.destroy) {
      this.player.destroy()
      delete this.player
    }

    if (this.resize) {
      window.removeEventListener('resize', this.onResize)
    }
  },
  mounted () {
    window.YTConfig = {
      host: 'https://www.youtube.com/iframe_api'
    }
    
    const host = this.nocookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com'

    this.player = new YoutubePlayer(this.$el, {
      host,
      width: this.width,
      height: this.height,
      videoId: this.videoId,
      playerVars: this.playerVars
    })

    this.player.on('ready', this.playerReady)
    this.player.on('stateChange', this.playerStateChange)
    this.player.on('error', this.playerError)

    if (this.resize) {
      window.addEventListener('resize', this.onResize)
    }

    if (this.fitParent) {
      this.resizeProportionally()
    }
  },
  render (h) {
    return h('div', { attrs: { id: this.htmlId } });
  }
}