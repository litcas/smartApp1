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
        }
    },
    mounted() {
        this.list = [{
            id: 1,
            title: '推荐'
        }, {
            id: 2,
            title: '权威解读'
        }, {
            id: 3,
            title: '基本农田'
        }, {
            id: 4,
            title: '土地综合整治'
        }]
    }
});
