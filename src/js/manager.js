'use strict';

class manager {

    constructor(peer) {
        this.peer = peer;
    }

    /**
     * 視聴者の数をカウントする
     */
    getViewersCount(speakerPrefix,dummyPrefix){
        const self = this;
        return new Promise(function(resolve,reject){
            self.peer.listAllPeers(function (list) {
                let isSpeakerExist = false;
                let dummyPeerCounter = 0;
                for (let cnt = 0; cnt < list.length; cnt++) {
                    // PeerIDのPrefixで判定
                    if (list[cnt].substr(0, speakerPrefix.length) == speakerPrefix) {
                        isSpeakerExist = true;
                        break;
                    }

                    if (list[cnt].substr(0, dummyPrefix.length) == dummyPrefix) {
                        dummyPeerCounter ++;
                    }
                }
                // 配信者分は除きカウントする
                resolve({count:list.length - 1 - dummyPeerCounter,isSpeakerExist: isSpeakerExist});
            });
        });
    }

}

export default manager;