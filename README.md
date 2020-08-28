# Vue Video Wrapper :video_camera:
A Vue.js component to wrap embeded iframes from Vimeo and Youtube.

[![npm version](https://img.shields.io/npm/v/vue-video-wrapper)](https://www.npmjs.com/package/vue-video-wrapper)
[![vue version](https://img.shields.io/badge/vue-2.x-brightgreen)](https://vuejs.org/)
[![npm downloads](https://img.shields.io/npm/dt/vue-video-wrapper)](https://www.npmjs.com/package/vue-video-wrapper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Intro

A simple Vue.js component where you can wrap your **Vimeo** or **Youtube** embeded video and use their events.

## Installation

Using npm:

    npm install vue-video-wrapper

## Getting Started :heavy_check_mark:

### Using globally:

```javascript
import Vue from 'vue'
import VueVideoWrapper from 'vue-video-wrapper'

Vue.use(VueVideoWrapper) 
Vue.use(VueVideoWrapper, { componentId: "another-component-name" }) //if you want to give another name to the component
```

### Using locally:

```javascript
import VueVideoWrapper from 'vue-video-wrapper'

export default {
    components: { VueVideoWrapper }
}
```

## Examples

The *required prop* `:player` must receive a `String` with the name of the video player.

#### Vimeo

```html
<video-wrapper :player="'vimeo'" :videoId="videoId" />

<another-component-name :player="'vimeo'" :videoId="videoId" />  <!-- if you changed the name of the component -->
```

#### Youtube

```html
<video-wrapper :player="'youtube'" :videoId="videoId" />

<another-component-name :player="'youtube'" :videoId="videoId" />  <!-- if you changed the name of the component -->
```

:mag: You can see [here](https://codesandbox.io/s/agitated-volhard-rw2pe) a demo on CodeSandbox.

## Props

### Both players

| Prop | Type | Required | Default | Description
| --- | --- | --- | --- | --- |
| player | String | true | | The embeded iframe player. Acceptable values: "Vimeo" and "Youtube", **case insensitive**.
| videoId | String, Number | true | | Video identifier.

### Vimeo

| Prop | Type | Required | Default | Description
| --- | --- | --- | --- | --- |
| playerHeight | String, Number | false | 320 | Height of the embeded iframe player.
| playerWidth | String, Number | false | 640 | Width of the embeded iframe player.
| options | Object | false | {} | Options to pass to the Vimeo instance. See on https://github.com/vimeo/player.js/#embed-options
| loop | Boolean | false | false | Enable loop on the end of the video.
| autoplay | Boolean | false | false | The video starts automatically when it's ready.
| controls | Boolean | false | true | If **false**, all elements in the player (play bar, sharing buttons, etc) will be hidden.

#### Example:

```html
<video-wrapper :player="'vimeo'" :videoId="videoId" :autoplay="true" :playerHeight="500" />
```

### Youtube 

| Prop | Type | Required | Default | Description
| --- | --- | --- | --- | --- |
| height | String, Number | false | 360 | Height of the embeded iframe player.
| width | String, Number | false | 640 | Width of the embeded iframe player.
| resize | Boolean | false | false | Embeded iframe player proportionally scale height with its width.
| resizeDelay | Number | false | 100 | Delay in ms to before resize.
| nocookie | Boolean | false | false | If **true** use `https://www.youtube-nocookie.com` as host.
| fitParent | Boolean | false | false | Use parent's width.

#### Example:

```html
<video-wrapper :player="'youtube'" :video="videoId" :height="500" :width="800" />
```
