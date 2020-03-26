apiready = function apiready() {
    apiready_init();
    vm.$mount('#wrap');
    vm.getYwtcList()
};


const vm = new Vue({
    el: '#wrap',
    data: {
        user: {
            id: '1',
            username: '王小虎'
        },
        mapShowPicker: false,
        mapColumnsDefault: '0',
        mapColumns: [{
            text: '标准地图',
            value: 'standard',
            key: '0'
        }, {
            text: '卫星地图',
            value: 'satellite',
            key: '1'
        }, {
            text: '夜间模式',
            value: 'night',
            key: '2'
        }],
        ywtcShowPicker: false,
        ywtcColumnsDefault: '0',
        ywtcColumns: [],
        ywtcResult: {}
    },
    methods: {
        changeMapClick(s) {
            this.mapShowPicker = true
        },
        openW(win) {
            this.openWin(win);
        },
        fwcxCLick() {
          var jsfun = "vm.fwcxCLick()";
          api.execScript({
              name: 'win_map',
              script: jsfun
          });
          api.closeDrawerPane();
        },
        changeMapOnConfirm(o) {
            this.mapColumnsDefault = o.key
            this.mapShowPicker = false
            var jsfun = "vm.setMapAttr('" + o.value + "')";
            api.execScript({
                name: 'win_map',
                script: jsfun
            });
            api.closeDrawerPane();
        },
        changeYwtcOnConfirm(o) {
            //
            // if(this.ywtcResult.id === o.id){
            //   this.ywtcShowPicker = false
            //   api.closeDrawerPane();
            //   return
            // }

            this.ywtcShowPicker = false
            this.ywtcResult = o

            api.setGlobalData({
                key: 'ywtcResult',
                value: o
            });

            var jsfun = 'vm.ywtcSumit();';
            api.execScript({
                name: 'win_map',
                script: jsfun
            });
            api.closeDrawerPane();
        },
        ywtcClick() {
            this.ywtcShowPicker = true
        },
        ywtcClear(){
          this.ywtcShowPicker = false
          this.ywtcResult = null
          api.closeDrawerPane();
          var jsfun = 'vm.clearYwtc();';
          api.execScript({
              name: 'win_map',
              script: jsfun
          });
        },
        ywtcSumit() {

            //加载
            // for (const obj in this.ywtcResult) {
            //     window.userCustomObj.ywtcShow2(this.ywtcResult[obj])
            // }

            this.ywtcShowPicker = false

            var ywtcResultString = JSON.stringify(this.ywtcResult)

            api.setGlobalData({
                key: 'ywtcResult',
                value: ywtcResultString
            });

            var jsfun = 'vm.ywtcSumit();';
            api.execScript({
                name: 'win_map',
                script: jsfun
            });

        },
        getYwtcList() {
            this.$ajax({
                url: '/pl/app/layerList',
                method: 'get'
            }).then(response => {
                this.ywtcColumns = response.data
            }).catch(function(error, data) {
                // console.log(JSON.stringify(error))
            });
        }
    },
    mounted() {

    }
});
