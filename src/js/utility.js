'use strict';

class utility {
    constructor(){
        // nothing
    }

    /**
     * スピーカーかどうかを判定する
     * @returns {boolean}
     */
    static isSpeaker() {
        return location.hash === '#speaker' ? true : false;
    }

    /**
     * getUserMediaのOptionオブジェクトを生成する
     * @param videoSource
     * @param audioSource
     * @param width
     * @param height
     * @param framerate
     * @returns {*}
     */
    static createGumConstraints(videoSource,audioSource,width = null,height = null,framerate =null) {

        let _param = {
            video: {},
            audio: true
        };

        if (!!navigator.mozGetUserMedia) {
            // for FF
            if (!isFinite(width))
                _param.video.width = {min: width, max: width};
            if (!isFinite(height))
                _param.video.height = {min: height, max: height};
        }else{
            // for Chrome
            if (!isFinite(width))
                _param.video.width = {min: width, max: width};
            if (!isFinite(height))
                _param.video.height = {min: height, max: height};
            if (!isFinite(framerate))
                _param.video.frameRate = {min: framerate, max: framerate};
        }

        if(!isFinite(videoSource)) {
            _param.video = {deviceId: {exact: videoSource}};
        }
        if(!isFinite(audioSource)) {
            _param.audio = {deviceId: {exact: audioSource}};
        }

        return _param;
    }

    /**
     * ブラウザチェック
     * @returns {boolean}
     */
    static usingChrome(){
        const agent = window.navigator.userAgent.toLowerCase();
        return (agent.indexOf('chrome') !== -1) && (agent.indexOf('edge') === -1)  && (agent.indexOf('opr') === -1);
    }    

}

export default utility;