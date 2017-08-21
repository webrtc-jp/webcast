'use strict';

import utility from './utility';
import sfuHelper from './sfuHelper';
import viewController from './viewController';
import manager from './manager';

const managerOptions = {
    skywayAPIKey: 'eef9d145-a76c-4ab7-8510-f697dadaef11',
};
const sfuOptions = {
    anzuChannelId: 'BrWeoWi0N',
    anzuUpstreamToken: 'gwCF7fXsGRUofYC8Z',
    skywayAPIKey: '423c2921-a505-412e-93da-98995c420323',
    skywayRoomName: 'skeop2jvrnfesw2'
};

const sfu = new sfuHelper(sfuOptions);

const speakerPrefix = 'SPEAKER_';

const interval = {
    updateViewerCounter: 10000,
    viewerWaiting: 5000
};

let streamingOptions = {
    provider: '',
    gUMconstraints: utility.createGumConstraints(1920,1080,29),
};

let viewOptions = {
    mode: ''
};

let peer;

let manage;

let isAlreadySpeaker = false;

let updateIntervalObj;

if(utility.isSpeaker()){
    console.log('speaker mode');

    viewOptions.mode = 'speaker';
    const view = new viewController(viewOptions);
    view.createView(function(result){
        if (result.status == 'start') {
            // 配信を開始する
            if (result.selected == 'skyway') {
                streamingOptions.provider = 'skyway';
            } else if (result.selected == 'anzu') {
                streamingOptions.provider = 'anzu';
            }

            // 既にスピーカーが存在するかどうかのチェック
            peer = new Peer({key: managerOptions.skywayAPIKey});
            peer.on('open', function () {
                peer.listAllPeers(function (list) {
                    for (var cnt = 0; cnt < list.length; cnt++) {
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
        // waitingViewer()を呼び出す形に変更したいがまだ動かない

        let isWaiting = true;
        // 配信が開始されるまで待機しされたら接続する
        const waitingInterval = setInterval(function(){
            peer.listAllPeers(function (list) {
                for (var cnt = 0; cnt < list.length; cnt++) {
                    // PeerIDのPrefixで判定
                    if (list[cnt].substr(0, 8) == speakerPrefix) {
                        if(~list[cnt].indexOf('_skyway_')){
                            streamingOptions.provider = 'skyway';
                        }else if(~list[cnt].indexOf('_anzu_')){
                            streamingOptions.provider = 'anzu';
                        }
                        startViewing(peer,view);
                        isWaiting = false;
                        break;
                    }
                }
                if(!isWaiting){
                    clearInterval(waitingInterval);
                }
            });
        },interval.viewerWaiting);
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
    manage.getViewersCount(speakerPrefix)
        .then(function(result){
            viewInstance.updateIndicatorToBroadcastingMode(result.count);
            if(result.isSpeakerExist){
            }else{
                // スピーカーが抜け場合は切断処理
                viewInstance.initIndicator();
                sfu.stopStreamingViewing(streamingOptions);
                waitingViewer(viewInstance);
            }
        })
        .then(function(){
            updateIntervalObj = setInterval(function() {
                manage.getViewersCount(speakerPrefix)
                    .then(function(result){
                        viewInstance.updateIndicatorToBroadcastingMode(result.count);
                        if(result.isSpeakerExist){
                        }else{
                            // スピーカーが抜け場合は切断処理
                            viewInstance.initIndicator();
                            sfu.stopStreamingViewing(streamingOptions);
                            waitingViewer(viewInstance);
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

// メモ：配信停止時の視聴者側の処理はまだバグが有って動かない
function waitingViewer(viewInstance){
    let isWaiting = true;
    // 配信が開始されるまで待機しされたら接続する
    const waitingInterval = setInterval(function(){
        peer.listAllPeers(function (list) {
            for (var cnt = 0; cnt < list.length; cnt++) {
                // PeerIDのPrefixで判定
                if (list[cnt].substr(0, 8) == speakerPrefix) {
                    if(~list[cnt].indexOf('_skyway_')){
                        streamingOptions.provider = 'skyway';
                    }else if(~list[cnt].indexOf('_anzu_')){
                        streamingOptions.provider = 'anzu';
                    }
                    startViewing(peer,viewInstance);
                    isWaiting = false;
                    break;
                }
            }
            if(!isWaiting){
                clearInterval(waitingInterval);
            }
        });
    },interval.viewerWaiting);
}