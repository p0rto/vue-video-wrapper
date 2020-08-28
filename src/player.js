import players from './constants/players';
import vimeoProps from './constants/vimeo/vimeoProps';
import youtubeProps from './constants/youtube/youtubeProps';

export default {
  functional: true,
  props: {
    player: { 
        type: String, 
        required: true,
        validator: (value) => {
          // The value must match one of these strings
          return players.map((e) => {
            return e.name;
          }).indexOf(value.toUpperCase()) !== -1;
        } 
    },
    videoId: { type: [String, Number], required: true },
    ...vimeoProps,
    ...youtubeProps
  },
  render(h, {data, props, listeners}) {
    const player = players.find(e => e.name == props.player.toUpperCase());

    if (player) {
      return h(player.component, { props: props, ref: data.ref, on: listeners })
    }    
  }
}