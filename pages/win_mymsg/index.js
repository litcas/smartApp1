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
        watchClick(o) {
            this.$dialog.alert({
                title: o.title,
                message: o.content
            }).then(() => {
                // on close
            });
        }
    },
    mounted() {
        this.list = [{
            id: 1,
            title: '小阿三大苏打1111',
            content: '大师傅但是',
            datetime: '2019/01/01'
        }, {
            id: 2,
            title: '决定是否',
            content: '大师傅但是',
            datetime: '2019/01/01'
        }, {
            id: 2,
            title: '吃不吃',
            content: '大师傅但是',
            datetime: '2019/01/01'
        }]
    }
});
