import embedVideo from './player.js';

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("v-video-wrapper", embedVideo);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

embedVideo.install = install;

export default embedVideo;