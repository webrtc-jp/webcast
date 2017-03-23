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
    sfu.startStreamingForSkyWay({video:true,audio:false},function(stream){
        let videoDom = $('#video')[0];
        videoDom.srcObject = stream;
        videoDom.muted = true;
    },function(){
        console.error(reason);
    });

}else{
    console.log('viewer mode');
    sfu.startViewingForSkyWay(function(stream){
        let videoDom = $('#video')[0];
        videoDom.srcObject = stream;
    },function(reason){
        console.error(reason);
    });
}
