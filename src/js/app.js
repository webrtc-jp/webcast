'use strict';

import utility from './utility';
import views from './views';
import sfuHelper from './sfuHelper';

const sfuOption = {
    provider: 'SKYWAY',
    anzuChannelId: '',
    anzuUpstreamToken: '',
    skywayAPIKey: 'f1507a0e-d2ae-44cb-8fff-2db63fc89e1e',
    skywayRoomName: 'skeo3fgvoldp22',
};

const sfu = new sfuHelper(sfuOption);

if(utility.isSpeaker()){
    console.log('speaker mode');
    sfu.startStreamingForSkyWay({video:true,audio:true},function(stream){
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
