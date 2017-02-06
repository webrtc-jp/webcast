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
    sfu.startStreamingForSkyWay({video:true,audio:true})
        .then(function(stream){
            const videoDom = $('#video')[0];
            videoDom.srcObject = stream;
            videoDom.muted = true;
            console.log(stream);
        })
        .catch(function(reason){
            console.error(reason);
        });

}else{
    console.log('viewer mode');
    const videoDom = $('#video')[0];
    sfu.startViewingForSkyWay()
        .then(function(stream){
            videoDom.srcObject = stream;
            console.log(stream);
        })
        .catch(function(reason){
            console.error(reason);
        });
}
