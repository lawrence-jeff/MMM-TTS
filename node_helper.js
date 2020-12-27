/* Magic Mirror
 * Module: MMM-TTS
 *
 * By fewieden https://github.com/fewieden/MMM-TTS
 *
 * MIT Licensed.
 */

/* eslint-env node */

const NodeHelper = require('node_helper');
const tts = require('say');

module.exports = NodeHelper.create({

    start() {
        console.log(`Starting node helper for: ${this.name}`);
    },

    socketNotificationReceived(notification, payload) {
        if (notification === 'CONFIG') {
            this.config = payload;
        } else if (notification === 'TTS') {
            if (typeof payload === 'string') {
                tts.speak(payload, this.config.voice, this.config.speed, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    this.sendSocketNotification('HIDE', {});
                });
            }
            else if (typeof payload === 'object') {
                tts.speak(payload.text, this.config.voice, this.config.speed,  (err) => {
                    if (err) {
                        console.log(err);
                    }
                    this.sendSocketNotification('HIDE', {});
                });
            }
        }
    }
});
