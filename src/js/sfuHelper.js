'use strict';

import utility from './utility';
const anzu = require('./libs/anzu.js');

class sfuHelper {

    constructor(param) {

        const defaultoptions = {
            provider: 'ANZU',
            anzuChannelId: '',
            anzuUpstreamToken: '',
        };
        this.options = Object.assign({},defaultoptions,param);
        console.log(this.options);

    }
    startStreamingForAnzu(gUNOptions){
        let self = this;
        return new Promise(function(resolve,reject){
            var anzuUpstream = new anzu('upstream');
            anzuUpstream.start(self.options.anzuChannelId,self.options.anzuUpstreamToken, gUNOptions)
                .then(function(params) {
                    resolve(params.stream);
                })
                .catch(function(error) {
                    reject(error);
                });
        });

    }

    startViewingForAnzu(){
        let self = this;
        return new Promise(function(resolve,reject){
            var anzuDownstream = new anzu('downstream');
            anzuDownstream.start(self.options.anzuChannelId, "")
                .then(function(params) {
                    resolve(params.stream);
                })
                .catch(function(error) {
                    reject(error);
                });
        });

    }

    startStreamingForSkyWay(gUNOptions){
        let self = this;
        return new Promise(function(resolve,reject) {
            navigator.mediaDevices.getUserMedia(gUNOptions)
                .then(function (stream) { // success
                    let date = new Date() ;
                    let skywayUpstream = new Peer('UPSTREAM_'+ date.getTime(),{key: self.options.skywayAPIKey,debug: 3});
                    skywayUpstream.on('open', function(){
                        let sfuRoom = skywayUpstream.joinRoom(self.options.skywayRoomName, {mode: 'sfu', stream: stream});
                        sfuRoom.on('open', function() {
                            console.log('Broadcast ready.');
                            resolve(stream);
                        });
                        sfuRoom.on('peerJoin', function(peerId) {
                            console.log('join the viewer');
                        });
                    });
                }).catch(function (error) { // error
                reject(error);
            });
        });

    }

    startViewingForSkyWay(){
        let self = this;
        return new Promise(function(resolve,reject){
            let skywayDownstream = new Peer({key: self.options.skywayAPIKey,debug: 1});
            skywayDownstream.on('open', function(){
                navigator.mediaDevices.getUserMedia(utility.createGumOptions(1,1,1))
                    .then(function (stream) { // success
                        let sfuRoom = skywayDownstream.joinRoom(self.options.skywayRoomName, {mode: 'sfu', stream: self._streamMute(stream)});
                        console.log('Viewer ready.');
                        self._skywayViewingEvents(sfuRoom,resolve);
                    }).catch(function (error) { // error
                    reject(error);
                });
            });
        });

    }

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

    _skywayViewingEvents(sfuRoom,resolve){
        sfuRoom.on('stream', function(stream) {
            if(stream.peerId.slice(0,8) === 'UPSTREAM'){
                console.log('stream');
                resolve(stream);
            }
        });
        sfuRoom.on('removeStream', function(stream) {
            if(stream.peerId.slice(0,8) === 'UPSTREAM'){
                console.log('remove');
            }
        });
        sfuRoom.on('close', function(stream) {
            if(stream.peerId.slice(0,8) === 'UPSTREAM'){
                console.log('close peer');
            }
        });
    }
}

export default sfuHelper;