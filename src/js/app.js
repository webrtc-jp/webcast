'use strict';

import utility from './utility';
import views from './views';
import sfuHelper from './sfuHelper';

const sfuOption = {
    provider: 'ANZU',
    anzuChannelId: 'BrWeoWi0N',
    anzuUpstreamToken: 'PwwjPbRvVo9PxerJy',
};

const sfu = new sfuHelper(sfuOption);

if(utility.isSpeaker()){
    console.log('speaker mode');

    sfu.startStreaming(utility.createGumOptions(640,480,15))
        .then(function(stream){
            const videoDom = $('#video')[0];
            videoDom.srcObject = stream;
            videoDom.muted = true;
        })
        .catch(function(reason){
            console.error(reason);
        });

}else{
    console.log('viewer mode');
    sfu.startViewing()
        .then(function(stream){
            const videoDom = $('#video')[0];
            videoDom.srcObject = stream;
        })
        .catch(function(reason){
            console.error(reason);
        });
}


