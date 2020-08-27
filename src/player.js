import players from './constants/players';

export default {
  name: 'VideoWrapper',
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
    videoId: { type: [String, Number], required: true }
  },
  render(h, {props, listeners}) {
    const player = players.find(e => e.name == props.player.toUpperCase());

    if (player) {
      return h(player.component, { props: { videoId: props.videoId }, on: listeners })
    }    
  }
}