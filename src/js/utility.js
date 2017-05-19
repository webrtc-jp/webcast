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
     * @param width
     * @param height
     * @param framerate
     * @returns {*}
     */
    static createGumConstraints(width,height,framerate) {

        let _param = {
            video: {},
            audio: true
        };

        if (!!navigator.mozGetUserMedia) {
            // for FF
            if (isFinite(width))
                _param.video.width = {min: width, max: width};
            if (isFinite(height))
                _param.video.height = {min: height, max: height};
        }else{
            // for Chrome
            if (isFinite(width))
                _param.video.width = {min: width, max: width};
            if (isFinite(height))
                _param.video.height = {min: height, max: height};
            if (isFinite(framerate))
                _param.video.frameRate = {min: framerate, max: framerate};
        }

        return _param;
    }

}

export default utility;