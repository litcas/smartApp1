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
        }, {
            id: 2,
            name: '任务2',
            type: '举证',
            source: '国土局',
            requiredTime: '2019/11/28 00:00',
            receiveTime: '2019/09/18 00:00'
        }, {
            id: 3,
            name: '任务3',
            type: '举证',
            source: '国土局',
            requiredTime: '2019/06/22 00:00',
            receiveTime: '2019/08/01 00:00'
        }, {
            id: 4,
            name: '任务4',
            type: '举证',
            source: '国土局',
            requiredTime: '2019/07/28 00:00',
            receiveTime: '2019/09/01 00:00'
        }]
    }
});
