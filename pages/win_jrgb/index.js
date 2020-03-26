apiready = function apiready() {
    apiready_init();
    vm.$mount('#wrap');
};


const vm = new Vue({
    el: '#wrap',
    data: {
        list: [],
         active: 0
    },
    methods: {
        onClickLeft() {
            this.closeWin()
        }
    },
    mounted() {
        this.list = [{
            id: 1,
            title: '头条'
        }, {
            id: 2,
            title: '国土'
        }, {
            id: 3,
            title: '耕保'
        }, {
            id: 4,
            title: '基本农田'
        }, {
            id: 5,
            title: '土地综合治理'
        }]
    }
});
