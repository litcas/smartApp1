apiready = function apiready() {
    apiready_init();
    vm.$mount('#wrap');
};


const vm = new Vue({
    el: '#wrap',
    data: {
        user: {
            id: '1',
            username: '王小虎',
            address: '长沙市芙蓉区'
        }
    },
    methods: {
        onClickLeft() {
            this.closeWin()
        },
        openW(win) {
            this.openWin(win);
        },
        logout() {
            var that = this
            api.confirm({
                title: '提示',
                msg: '您好，确认退出当前帐号?',
                buttons: ['确定', '取消']
            }, function(ret, err) {
                var index = ret.buttonIndex;
                if (index === 1) {
                    var token = api.getGlobalData({
                        key: 'token'
                    });
                    var data = {
                        _ajax: 'json',
                        __sid: token
                    };
                    that.$ajax({
                        url: '/pl/a/logout',
                        method: 'get',
                        params: data
                    }).then(function(response) {
                        api.removePrefs({
                            key: 'uesrname'
                        });
                        api.removePrefs({
                            key: 'pwd'
                        });
                        $api.clearStorage();
                        api.clearCache(function() {
                            api.toast({
                                msg: '清除完成'
                            });
                            api.rebootApp();
                        });
                    })
                }
            });
        }
    },
    mounted() {

    }
});
