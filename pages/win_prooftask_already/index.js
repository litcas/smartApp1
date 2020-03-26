apiready = function apiready() {
    apiready_init();
    vm.$mount('#wrap');
};


const vm = new Vue({
    el: '#wrap',
    data: {
        list: []
    },
    methods: {
        onClickLeft() {
            this.closeWin()
        },
        openW(win, o) {
            this.openWin(win, o);
        },
    },
    mounted() {
        this.list = [{
            id: 1,
            name: '任务1',
            type: '举证',
            source: '国土局',
            requiredTime: '2019/12/08 00:00',
            receiveTime: '2019/11/08 00:00'
        }]
    }
});
