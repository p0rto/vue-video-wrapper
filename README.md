# Vue Video Wrapper
A Vue.js component to wrap embeded iframes from Vimeo and Youtube.

[![npm version](https://img.shields.io/npm/v/vue-video-wrapper)](https://www.npmjs.com/package/vue-video-wrapper)
[![vue version](https://img.shields.io/badge/vue-2.x-brightgreen)](https://vuejs.org/)
[![npm downloads](https://img.shields.io/npm/dt/vue-video-wrapper)](https://img.shields.io/npm/dt/vue-video-wrapper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Intro

A simple Vue.js component where you can wrap your **Vimeo** or **Youtube** embeded video and use their events.

## Installation

Using npm:

    npm install vue-video-wrapper

## Getting Started

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
    
