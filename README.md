# Vue Video Wrapper :video_camera:
A Vue.js component to wrap embeded iframes from Vimeo and Youtube.

[![npm version](https://img.shields.io/npm/v/vue-video-wrapper)](https://www.npmjs.com/package/vue-video-wrapper)
[![vue version](https://img.shields.io/badge/vue-2.x-brightgreen)](https://vuejs.org/)
[![npm downloads](https://img.shields.io/npm/dt/vue-video-wrapper)](https://www.npmjs.com/package/vue-video-wrapper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Supported Players

- Vimeo :heavy_check_mark:
- YouTube :heavy_check_mark:

### Intro

A simple Vue.js component where you can wrap your **Vimeo** or **Youtube** embeded video and use their events.

## Installation :wrench:

Using npm:

    npm install vue-video-wrapper

## Getting Started :rocket:

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

## Examples :eyes:

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

## Props :memo:

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

## Events :collision:

The component triggers events to notify the changes in the player.

### Vimeo

- play
- pause
- ended
- timeupdate
- progress
- seeked
- texttrackchange
- cuechange
- cuepoint
- volumechange
- error
- loaded

#### Example

```html
<template>
    <video-wrapper :player="'vimeo'" :videoId="videoId" @play="handlePlay" @pause="handlePause" />
</template>
<script>
export default {
    data() {
        return {
            videoId: "some-video-id"
        }
    },
    methods: {
        handlePlay() {
            console.log("playing video...");
        },
        handlePause() {
            console.log("pausing video...");
        }
    }
}
</script>
```

### Youtube

- ready
- ended
- play
- pause
- buffering
- cued
- error

#### Example

```html
<template>
    <video-wrapper :player="'youtube'" :videoId="videoId" @play="handlePlay" @ended="handleEnded" />
</template>
<script>
export default {
    data() {
        return {
            videoId: "some-video-id"
        }
    },
    methods: {
        handlePlay() {
            console.log("playing video...");
        },
        handleEnded() {
            console.log("ended video...");
        }
    }
}
</script>
```

## Player :star:

You have access to all api methods from both players through component referencing.

### Vimeo

Check the [Vimeo api methods](https://github.com/vimeo/player.js/#methods)

#### Example

```html
<template>
    <video-wrapper ref="player" :player="'vimeo'" :videoId="videoId" />
</template>
```
```javascript
export default {
    // ...
    methods: {
        playVideo() {
            this.$refs.player.play();
        },
        pauseVideo() {
            this.$refs.player.pause();
        }
    }
}
```
```javascript
export default {
    // ...
    methods: {
        getDuration() {
            this.$refs.$player.$player.getDuration().then(function(duration) {
                // do something with the duration
            });
        },
        getCurrentTime() {
            this.$refs.$player.$player.getCurrentTime().then(function(seconds) {
                // do something with the current time
            });
        }
    }
}
```

### Youtube

Check the [Youtube api methods](https://developers.google.com/youtube/iframe_api_reference#Functions)

#### Example

```html
<template>
    <video-wrapper ref="player" :player="'youtube'" :videoId="videoId" />
</template>
```
```javascript
export default {
  // ...
  methods: {
    playVideo() {
        this.$refs.player.player.playVideo();
    },
    pauseVideo() {
        this.$refs.player.player.pauseVideo();
    }
  }
}
```
