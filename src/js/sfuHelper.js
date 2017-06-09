'use strict';

import utility from './utility';
const anzu = require('./libs/anzu.js');

class sfuHelper {

    constructor(param) {
        this.options = param;
        this.sfuInstatnce = {
            skyway: '',
            skywayObject: '',
            anzu: ''
        }
    }

    startStreaming(options){
        const self = this;
        return new Promise(function(resolve,reject){
            if(options.provider == 'anzu'){
                self._startStreamingForAnzu(options.gUMconstraints)
                    .then(function(stream) {
                        resolve(stream);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            }else if(options.provider == 'skyway'){
                self._startStreamingForSkyWay(options.gUMconstraints)
                    .then(function(stream) {
                        resolve(stream)
                    })
                    .catch(function(error) {
                        reject(error)
                    })
            }else {
                reject('unknown provider');
            }
        });

    };

    stopStreamingViewing(options){
        if(options.provider == 'anzu'){
            this.sfuInstatnce.anzu.disconnect();
        }else if(options.provider == 'skyway'){
            this.sfuInstatnce.skywayObject.close();
            this.sfuInstatnce.skyway.destroy();
        }
    };

    startViewing(options){
        const self = this;
        return new Promise(function(resolve,reject){
            if(options.provider == 'anzu'){
                self._startViewingForAnzu()
                    .then(function(stream) {
                        resolve(stream);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            }else if(options.provider == 'skyway'){
                self._startViewingForSkyWay(options.gUMconstraints)
                    .then(function(stream) {
                        resolve(stream)
                    })
                    .catch(function(error) {
                        reject(error)
                    })
            }else {
                reject('unknown provider');
            }
        });
    };

    /**
     * Anzuによる配信を開始する
     * @param gUNOptions
     * @returns {Promise}
     * @private
     */
    _startStreamingForAnzu(gUMconstraints){
        const self = this;
        return new Promise(function(resolve,reject){
            const anzuUpstream = new anzu('upstream');
            self.sfuInstatnce.anzu = anzuUpstream;
            anzuUpstream.start(self.options.anzuChannelId,self.options.anzuUpstreamToken, gUMconstraints)
                .then(function(params) {
                    resolve(params.stream);
                })
                .catch(function(error) {
                    reject(error);
                });
        });

    }

    /**
     * Anzuによる視聴を開始する
     * @returns {Promise}
     * @private
     */
    _startViewingForAnzu(){
        const self = this;
        return new Promise(function(resolve,reject){
            const anzuDownstream = new anzu('downstream');
            self.sfuInstatnce.anzu = anzuDownstream;
            anzuDownstream.start(self.options.anzuChannelId, "")
                .then(function(params) {
                    resolve(params.stream);
                })
                .catch(function(error) {
                    reject(error);
                });
        });

    }

    /**
     * SkyWay SFUによる配信を開始する
     * @param gUNOptions
     * @param successCallback
     * @param errorCallback
     * @private
     */
    _startStreamingForSkyWay(gUMconstraints){
        const self = this;
        return new Promise(function(resolve,reject){
            navigator.mediaDevices.getUserMedia(gUMconstraints)
                .then(function (stream) { // success
                    const date = new Date() ;
                    const skywayUpstream = new Peer('UPSTREAM_'+ date.getTime(),{key: self.options.skywayAPIKey,debug: 1});
                    self.sfuInstatnce.skyway = skywayUpstream;
                    skywayUpstream.on('open', function(){
                        let sfuRoom = skywayUpstream.joinRoom(self.options.skywayRoomName, {mode: 'sfu', stream: stream});
                        self.sfuInstatnce.skywayObject = sfuRoom;
                        sfuRoom.on('open', function() {
                            console.log('Broadcast ready.');
                            resolve(stream);
                        });
                        sfuRoom.on('peerJoin', function(peerId) {
                            console.log('join the viewer');
                        });
                        sfuRoom.on('error', function (error) {
                            reject(error);
                        });
                    });
                })
                .catch(function (error) { // error
                    reject(error);
                });
        });
    }

    /**
     * SkyWay SFUによる視聴を開始する
     * @param successCallback
     * @param errorCallback
     * @private
     */
    _startViewingForSkyWay(){
        const self = this;
        return new Promise(function(resolve,reject){
            const skywayDownstream = new Peer({key: self.options.skywayAPIKey,debug: 1});
            self.sfuInstatnce.skyway = skywayDownstream;
            skywayDownstream.on('open', function(){
                navigator.mediaDevices.getUserMedia(utility.createGumConstraints(1,1,1))
                    .then(function (stream) { // success
                        const sfuRoom = skywayDownstream.joinRoom(self.options.skywayRoomName, {mode: 'sfu', stream: self._streamMute(stream)});
                        self.sfuInstatnce.skywayObject = sfuRoom;
                        console.log('Viewer ready.');
                        sfuRoom.on('stream', function(stream) {
                            if(stream.peerId.slice(0,8) === 'UPSTREAM'){
                                console.log('receive stream');
                                resolve(stream);
                            }
                        });
                        sfuRoom.on('removeStream', function(stream) {
                            if(stream.peerId.slice(0,8) === 'UPSTREAM'){
                                console.log('remove');
                            }
                        });
                        sfuRoom.on('close', function() {
                            console.log('close peer');
                        });
                        sfuRoom.on('error', function (error) {
                            reject(error);
                        });
                    }).catch(function (error) { // error
                    reject(error);
                });
            });
        });

    }

    /**
     * @private _streamMute
     */
    _streamMute(stream){
        let tempVideoTrack = stream.getVideoTracks()[0];
        let tempAudioTrack = stream.getAudioTracks()[0];
        tempVideoTrack.enabled = false;
        tempAudioTrack.enabled = false;
        let result = new MediaStream();
        result.addTrack(tempVideoTrack);
        result.addTrack(tempAudioTrack);
        return result;
    }
}

export default sfuHelper;