'use strict';

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
    startStreaming(gUNOptions){
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

    startViewing(){
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

}

export default sfuHelper;