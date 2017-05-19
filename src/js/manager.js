'use strict';

class manager {

    constructor(peer) {
        this.peer = peer;
    }

    /**
     * 視聴者の数をカウントする
     */
    getViewersCount(speakerPrefix){
        const self = this;
        return new Promise(function(resolve,reject){
            self.peer.listAllPeers(function (list) {
                let isSpeakerExist = false;
                for (var cnt = 0; cnt < list.length; cnt++) {
                    // PeerIDのPrefixで判定
                    if (list[cnt].substr(0, 8) == speakerPrefix) {
                        isSpeakerExist = true;
                        break;
                    }
                }
                // 配信者分は除きカウントする
                resolve(list.length - 1,isSpeakerExist);
            });
        });
    }

}

export default manager;