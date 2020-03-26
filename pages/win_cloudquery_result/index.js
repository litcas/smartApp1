apiready = function apiready() {
    apiready_init();
    vm.$mount('#wrap');
    vm.pageParam = api.pageParam
};


const vm = new Vue({
    el: '#wrap',
    data: {
        list: [],
        pageParam:null
    },
    methods: {
        onClickLeft() {
            this.closeWin()
        },
        openW(win,o) {
            // this.openWin(win,o);
              this.openWin(win,this.pageParam);
        },
    },
    mounted() {
        this.list = [{
            id: 1,
            status: '完成',
            datetime:'2019/05/08 17:33'
        }, {
            id: 2,
            status: '完成',
            datetime:'2019/09/28 08:02'
        }, {
            id: 2,
            status: '完成',
            datetime:'2019/12/01 11:39'
        }]
    }
});
