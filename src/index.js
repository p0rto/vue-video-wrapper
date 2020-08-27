import videoWrapper from './player.js';

function install(Vue, options = {}) {
  if (install.installed) return;
  install.installed = true;
  const { componentId = "video-wrapper" } = options;

  Vue.component(componentId, videoWrapper);
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

videoWrapper.install = install;

export default videoWrapper;