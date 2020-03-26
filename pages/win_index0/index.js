apiready = function apiready() {

    api.showProgress({
        title: '加载地图中...',
        modal: false
    });
    setTimeout(() => {
        api.hideProgress();
    }, 5000)
    apiready_init();
    // vm.aMapLBS = api.require('aMapLBS');
    // vm.aMap = api.require('aMap');
    // vm.getYwtcList()
        //  vm.$mount('#wrap');
};


var vm = new Vue({
    el: '#wrap',
    data: {
        searchValue: '',
        mapShowPicker: false,
        mapColumnsDefault: '0',
        mapColumns: [{
            text: '矢量地图',
            value: 'sldt',
            key: '0'
        }, {
            text: '卫星地图',
            value: 'yxdt',
            key: '1'
        }, {
            text: '地形地图',
            value: 'dxdt',
            key: '2'
        }],
        fwcxing: false,
        aMapLBS: null,
        aMap: null,
        timeoutStamp: null,
        ro: {},
        ywtcShowPicker: false,
        ywtcColumnsDefault: '0',
        ywtcColumns: [],
        ywtcResult: []
    },
    methods: {
        onClickLeft() {
            this.closeWin()
        },
        openW(win) {
            this.openWin(win, window.geometry_pageParam);
        },
        fwcxCLick() {
            this.fwcxing = true
            window.userCustomObj.fwcxClick()
        },
        fwcxComplete() {
            window.userCustomObj.sketchViewModel.complete()
        },
        fwcxCancal() {
            window.userCustomObj.sketchViewModel.cancel()
            this.fwcxing = false
        },


        onClear() {
            window.userCustomObj.clearMarker()
        },



    },
    mounted() {

    }
});
