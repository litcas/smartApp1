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
    },
    mounted() {
        this.list = [{
            id: 1,
            name: '长沙天地图'
        }, {
            id: 2,
            name: '常德天地图'
        }, {
            id: 2,
            name: '株洲天地图'
        }]
    }
});
