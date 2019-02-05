'use strict';

import utility from './utility';
import sfuHelper from './sfuHelper';
import viewController from './viewController';
import manager from './manager';

const speakerPrefix = 'SPEAKER_';
const dummyPrefix = 'DUMMY_';
const managerOptions = {
    skywayAPIKey: 'a134f02c-4b4f-4e4b-a742-3ac45dc3a384',
};
const sfuOptions = {
    anzuChannelId: 'BrWeoWi0N',
    anzuUpstreamToken: 'gwCF7fXsGRUofYC8Z',
    skywayAPIKey: 'd707b39d-e658-44ea-bf10-1ea26ef737fd',
    skywayRoomName: 'skeop2jvrnfesw2',
    dummyPrefix: dummyPrefix
};

const sfu = new sfuHelper(sfuOptions);

const interval = {
    updateViewerCounter: 5000,
    viewerWaiting: 3000
};

let streamingOptions = {
    provider: '',
    gUMconstraints: '',
    /*gUMconstraints: {
        video: true,
        audio: true
    }*/
};

let viewOptions = {
    mode: ''
};

let peer;
let manage;
let updateIntervalObj;
let isAlreadySpeaker = false;
let isWaiting = true;

if(!utility.usingChrome()){
    alert('このサービスはGoogle Chrome専用です。');
    window.location.href = 'https://www.google.com/intl/ja_ALL/chrome/';
}

if(utility.isSpeaker()){
    console.log('speaker mode');
    viewOptions.mode = 'speaker';
    const view = new viewController(viewOptions);
    view.createMediaSourceSelector();
    view.createView(function(result){
        if (result.status == 'start') {
            // 配信を開始する
            if (result.selected == 'skyway') {
                streamingOptions.provider = 'skyway';
            } else if (result.selected == 'anzu') {
                streamingOptions.provider = 'anzu';
            }
            // getUserMediaのConstraintsを生成する
            streamingOptions.gUMconstraints = utility.createGumConstraints(view.getVideoSource(),view.getAudioSource()),
            // 既にスピーカーが存在するかどうかのチェック
            peer = new Peer({key: managerOptions.skywayAPIKey});
            peer.on('open', function () {
                peer.listAllPeers(function (list) {
                    for (let cnt = 0; cnt < list.length; cnt++) {
                        // PeerIDのPrefixで判定
                        if (list[cnt].substr(0, 8) == speakerPrefix) {
                            console.warn('speaker is already exist');
                            isAlreadySpeaker = true;
                            break;
                        }
                    }
                    // PeerIDを識別用フラグとして利用しているので一度切断
                    peer.destroy();
                    // スピーカーが存在しない場合はスピーカーとしてJoinする
                    if (!isAlreadySpeaker) {
                        let date = new Date();
                        peer = new Peer(speakerPrefix + streamingOptions.provider + '_' + date.getTime(), {key: managerOptions.skywayAPIKey});
                        peer.on('open', function () {
                            // 配信開始
                            startStreaming(peer, view);
                        });
                    } else {
                        console.log('配信者がすでにいるため配信できません。ブラウザを閉じて下さい。')
                    }
                });
            });
        }else if(result.status == 'stop'){
            // 配信を停止する
            sfu.stopStreamingViewing(streamingOptions);
            // 管理用Roomから切断
            peer.destroy();

            clearInterval(updateIntervalObj);
            view.initIndicator();
        }
    },function(error){
        console.error(error);
    });
}else{
    console.log('viewer mode');

    viewOptions.mode = 'viewer';
    const view = new viewController(viewOptions);
    view.createView();
    peer = new Peer({key: managerOptions.skywayAPIKey,debug: 1});
    peer.on('open', function() {
        if(isWaiting) waitingViewer(view);        
    });
}

function startStreaming(p,v){
    sfu.startStreaming(streamingOptions)
        .then(function(stream){
            const videoDom = $('#video')[0];
            videoDom.srcObject = stream;
            videoDom.muted = true;
            // 配信管理機能を初期化
            manage = new manager(p);
            updateViewerCounter(v);
        })
        .catch(function(reason){
            console.error(reason);
        });
}

function startViewing(p,v){
    sfu.startViewing(streamingOptions)
        .then(function(stream){
            const videoDom = $('#video')[0];
            videoDom.srcObject = stream;
            // 配信管理機能を初期化
            manage = new manager(p);
            updateViewerCounter(v);
        })
        .catch(function(reason){
            console.error(reason);
        });
}

function updateViewerCounter(viewInstance){
    manage.getViewersCount(speakerPrefix,dummyPrefix)
        .then(function(result){
            viewInstance.updateIndicatorToBroadcastingMode(result.count);
            if(result.isSpeakerExist){
            }else{
                // スピーカーが抜け場合は切断処理
                viewInstance.initIndicator();
                sfu.stopStreamingViewing(streamingOptions);
                if(!isWaiting) waitingViewer(viewInstance);
            }
        })
        .then(function(){
            updateIntervalObj = setInterval(function() {
                manage.getViewersCount(speakerPrefix,dummyPrefix)
                    .then(function(result){
                        viewInstance.updateIndicatorToBroadcastingMode(result.count);
                        if(result.isSpeakerExist){
                        }else{
                            // スピーカーが抜け場合は切断処理
                            viewInstance.initIndicator();
                            sfu.stopStreamingViewing(streamingOptions);
                            if(!isWaiting) waitingViewer(viewInstance);
                        }
                    })
                    .catch(function(reason){
                        console.error(reason);
                    });
            },interval.updateViewerCounter);
        })
        .catch(function(reason){
            console.error(reason);
        });
}

function waitingViewer(viewInstance){
    isWaiting = true;
    // 配信が開始されるまで待機しされたら接続する
    const waitingInterval = setInterval(function(){
        peer.listAllPeers(function (list) {
            for (let cnt = 0; cnt < list.length; cnt++) {
                // PeerIDのPrefixで判定
                if (list[cnt].substr(0, 8) == speakerPrefix && isWaiting) {
                    if(~list[cnt].indexOf('_skyway_')){
                        streamingOptions.provider = 'skyway';
                    }else if(~list[cnt].indexOf('_anzu_')){
                        streamingOptions.provider = 'anzu';
                    }
                    startViewing(peer,viewInstance);
                    isWaiting = false;
                    clearInterval(waitingInterval);
                    break;
                }
            }
            if(!isWaiting){
                clearInterval(waitingInterval);
            }
        });
    },interval.viewerWaiting);
}