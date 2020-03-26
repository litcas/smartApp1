apiready = function apiready() {
    apiready_init();
    vm.$mount('#wrap');
    vm.pageParam = api.pageParam

};


const vm = new Vue({
    el: '#wrap',
    data: {
        pageParam: {},
        images: [
            '../../image/1.jpg',
            '../../image/2.png',
            '../../image/3.png'
        ],
        xzdk: 0,
        xzdkOption: [{
            text: '1',
            value: 0
        }, {
            text: '2',
            value: 1
        }],
        sfjz: 0,
        sfjzOption: [{
            text: '否',
            value: 0
        }, {
            text: '是',
            value: 1
        }],
        message: '',
        bglx: 0,
        bglxOption: [{
            text: '新增耕地',
            value: 0
        }, {
            text: '新增建设用地',
            value: 1
        }, {
            text: '遥感监测图斑',
            value: 2
        }, {
            text: '农变未',
            value: 3
        }, {
            text: '大棚房',
            value: 4
        }],
        bghdl: 0,
        bghdlOption: [{
            text: '水田',
            value: 0
        }, {
            text: '林地',
            value: 1
        }, {
            text: '建设用地',
            value: 2
        }, {
            text: '草地',
            value: 3
        }, {
            text: '园地',
            value: 4
        }],
        qjFileList: [{
                url: 'https://img.yzcdn.cn/vant/leaf.jpg'
            },
            // Uploader 根据文件后缀来判断是否为图片文件
            // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
            {
                url: 'https://cloud-image',
                isImage: true
            }
        ],
        jzFileList: [{
                url: 'https://img.yzcdn.cn/vant/leaf.jpg'
            },
            {
                url: 'https://cloud-image',
                isImage: true
            }
        ]
    },
    methods: {
        onClickLeft() {
            this.closeWin()
        },
    },
    mounted() {

    }
});
