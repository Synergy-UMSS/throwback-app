/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent("throwbackApp", () => App);

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => require('./service'));
// service.js
module.exports = async function() {
    // This service needs to be registered for the module to work
    // but it will be used later in the "Receiving Events" section
}