'use strict';

class viewController {

    constructor(param) {
        this.options = param;
        this.status = {
            isSkyWayBroadcasting: false,
            isAnzuBroadcasting: false,
            isRecording: false
        };
    }

    createView(onClickCb,errorCb) {
        const self = this;
        const result = {
            selected: '',
            status: ''
        };
        if(self.options.mode == 'speaker'){
            $('#skyway-broadcast').show();
            $('#anzu-broadcast').show();
            $('#skyway-broadcast').click(function(){
                result.selected = 'skyway';
                if(!self.status.isSkyWayBroadcasting){
                    $('#anzu-broadcast').prop("disabled", true);
                    $('#skyway-broadcast').text('配信を停止');
                    $('#skyway-broadcast').addClass('btn-warning');
                    self.status.isSkyWayBroadcasting = true;
                    result.status = 'start';
                    onClickCb(result);
                }else{
                    $('#anzu-broadcast').prop("disabled", false);
                    $('#skyway-broadcast').text('SkyWayで配信');
                    $('#skyway-broadcast').removeClass('btn-warning');
                    self.status.isSkyWayBroadcasting = false;
                    result.status = 'stop';
                    onClickCb(result);
                }
            });
            $('#anzu-broadcast').click(function(){
                result.selected = 'anzu';
                if(!self.status.isAnzuBroadcasting){
                    $('#skyway-broadcast').prop("disabled", true);
                    $('#anzu-broadcast').text('配信を停止');
                    $('#anzu-broadcast').addClass('btn-warning');
                    self.status.isAnzuBroadcasting = true;
                    result.status = 'start';
                    onClickCb(result);
                }else{
                    $('#skyway-broadcast').prop("disabled", false);
                    $('#anzu-broadcast').text('Anzuで配信');
                    $('#anzu-broadcast').removeClass('btn-warning');
                    self.status.isAnzuBroadcasting = false;
                    result.status = 'stop';
                    onClickCb(result);
                }
            });

            $('#indicators').html('配信者モードで起動中<BR>配信に使用するSFUを選択して下さい');

        }else if(self.options.mode == 'viewer'){
            $('#recording').show();
            $('#recording').click(function(){
                self.status.isRecording = true;
                onClickCb('recording');
            });

            $('#indicators').html('視聴者モードで起動中<BR>配信が開始させるまでお待ち下さい');
        }else{
            errorCb('unknown view mode');
        }
    };

    updateIndicatorToBroadcastingMode(count){
        let indicators_text = '';
        if(this.options.mode == 'speaker'){
            if(this.status.isSkyWayBroadcasting){
                indicators_text = '<span class="glyphicon glyphicon-facetime-video" aria-hidden="true"></span> SkyWayで配信中 / ' +
                    '視聴者数: ' + count + '</span>';
            }else if(this.status.isAnzuBroadcasting){
                indicators_text = '<span class="glyphicon glyphicon-facetime-video" aria-hidden="true"></span> Anzuで配信中 / ' +
                    '視聴者数: ' + count + '</span>';
            }
        }
        else if(this.options.mode == 'viewer'){
            indicators_text = '<span class="glyphicon glyphicon-play" aria-hidden="true"></span> 視聴中 / ' +
                '視聴者数: ' + count + '</span>';
        }

        $('#indicators').html(indicators_text);

    }

    initIndicator(){
        let indicators_text = '';
        if(this.options.mode == 'speaker'){
            indicators_text = '配信者モードで起動中<BR>配信に使用するSFUを選択して下さい';
        }else {
            indicators_text = '視聴者モードで起動中<BR>配信が開始させるまでお待ち下さい';
        }

        $('#indicators').html(indicators_text);

    }

}

export default viewController;