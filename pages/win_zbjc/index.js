apiready = function apiready() {
    apiready_init();
    vm.$mount('#wrap');
};


const vm = new Vue({
    el: '#wrap',
    data: {
        chartData: {
            columns: ['日期', '面积'],
            rows: [{
                '日期': '2016',
                '面积': 1393,
            }, {
                '日期': '2017',
                '面积': 3530,
            }, {
                '日期': '2018',
                '面积': 2923,
            }, {
                '日期': '2019',
                '面积': 1723,
            }]
        },
        zb: 0,
        zbOption: [{
            text: '耕地保有量',
            value: 0
        }, {
            text: '永久基本农田面积',
            value: 1
        }],
        dq: 0,
        dqOption: [{
            text: '株洲',
            value: 0
        }, {
            text: '湘潭',
            value: 1
        }],
    },
    methods: {
        onClickLeft() {
            this.closeWin()
        }
    },
    mounted() {

    }
});
