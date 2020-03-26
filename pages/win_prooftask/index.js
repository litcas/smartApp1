apiready = function apiready() {
    apiready_init();
    vm.$mount('#wrap');
};


const vm = new Vue({
    el: '#wrap',
    data: {

    },
    methods: {
        onClickLeft() {
            this.closeWin()
        },
        openW(win) {
            this.openWin(win);
        },
    },
    mounted() {

    }
});
