apiready = function apiready() {
    apiready_init();
    // api.removePrefs({
    //     key: 'lat'
    // });
    // api.removePrefs({
    //     key: 'lon'
    // });
    //定位
    aMapLBS = api.require('aMapLBS');
    if (aMapLBS) {
        aMapLBS.configManager({
            accuracy: 'best',
            filter: 1
        }, function(ret, err) {
            if (ret.status) {
                aMapLBS.singleLocation({
                    timeout: 10
                }, function(ret, err) {
                    if (ret.status) {
                        api.setGlobalData({
                            key: 'lat',
                            value: ret.lat
                        });
                        api.setGlobalData({
                            key: 'lon',
                            value: ret.lon
                        });
                    }
                });
            }
        });
    }

    api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        api.toLauncher();
    });

    api.removePrefs({
        key: 'token'
    });


    var uesrname = api.getPrefs({
        sync: true,
        key: 'username'
    });
    var pwd = api.getPrefs({
        sync: true,
        key: 'pwd'
    });

    var uesrname = false
    var pwd = false
    if (uesrname && pwd) {
        vm.username = uesrname;
        vm.pwd = pwd;
        vm.login()
    } else {
        vm.winHeight = api.winHeight;
        if (!vm._isMounted) {
            vm.$mount('#wrap');
        }
    }
};


var aMapLBS = null;
var vm = new Vue({
    // el: '#wrap',
    data: {
        username: 'test1',
        pwd: '123456',
        sumitAllow: true,
        winHeight: 0,
        btnDisabled: false,
    },
    methods: {
        openFindpwd() {
            this.openWin('win_findpwd');
        },
        openRegister() {
            this.openWin('win_register');
        },
        getOrgan() {
            var vm = this;
            vm.$ajax.get('/api/admin/depart/getZhgdDepartTree').then(function(response) {
                // console.log(JSON.stringify(response.data.data))
                api.setGlobalData({
                    key: 'organ',
                    value: JSON.stringify(response.data.data)
                });

            }).catch(function(error, data) {
                // console.log(JSON.stringify(error))
            });
        },
        getAuth() {
            var _this = this;
            _this.$ajax({
                url: '/api/admin/user/front/appinfo',
                method: 'get'
            }).then(function(response) {
                var data = response.data
                    // console.log(JSON.stringify(response))
                var menus = {}
                for (var i = 0; i < data.menus.length; i++) {
                    menus[data.menus[i].code] = true
                }
                var elements = {}
                for (var i = 0; i < data.elements.length; i++) {
                    elements[data.elements[i].code] = true
                }
                api.setGlobalData({
                    key: 'auth_menus',
                    value: menus
                });

                api.setGlobalData({
                    key: 'auth_elements',
                    value: elements
                });

                // console.log(JSON.stringify(menus))
                // console.log(JSON.stringify(elements))
            })
        },
        login: debounce(function() {
            var _this = this;
            if (!this.sumitAllow) {
                return;
            } else if (!this.username) {
                api.toast({
                    msg: '用户名不能为空',
                    duration: 3000
                });
                return;
            } else if (!this.pwd) {
                api.toast({
                    msg: '密码不能为空',
                    duration: 3000
                });
                return;
            }
            this.btnDisabled = true;
            api.showProgress({
                title: '登录中...',
                modal: false
            });
            var p = new Promise(function(resolve, reject) {
                var data = {
                    __login: true,
                    _ajax: 'json',
                    username: _this.username,
                    password: _this.pwd
                };
                _this.$ajax({
                    url: '/pl/a/login',
                    method: 'get',
                    params: data
                }).then(function(response) {
                    // console.log(JSON.stringify(response));
                    if (response.data.result === 'false') {
                        api.toast({
                            msg: response.data.message,
                            duration: 5000
                        });
                        return
                    }

                    api.setPrefs({
                        key: 'username',
                        value: _this.username
                    });
                    api.setPrefs({
                        key: 'pwd',
                        value: _this.pwd
                    });
                    //
                    api.setGlobalData({
                        key: 'token',
                        value: response.data.sessionid
                    });
                    //
                    //
                    // var tokenObj = JSON.parse(FormatJWT(response.data.data));
                    //
                    // api.setGlobalData({
                    //     key: 'userId',
                    //     value: tokenObj.userId
                    // });
                    //
                    // //获取权限
                    // _this.getAuth()
                    //     //获取机构
                    // _this.getOrgan()
                    //
                    //
                    // resolve(response.data);

                    // _this.openWin('win_index');
                    api.openDrawerLayout({
                        edge:30,
                        name: 'win_map',
                        url: '../win_map/index.html',
                        animation: {
                            type: 'none'
                        },
                        leftPane: {
                            name: 'win_leftpane',
                            url: '../win_leftpane/index.html',
                            bgColor:'rgba(0,0,0,0.5)'
                        }
                    });



                }).catch(function(error) {
                    // console.log(JSON.stringify(error))
                    api.removePrefs({
                        key: 'uesrname'
                    });
                    api.removePrefs({
                        key: 'pwd'
                    });

                    $api.clearStorage();

                    if (error.status === 400) {
                        api.toast({
                            msg: error.data.message,
                            duration: 3000
                        });
                        return
                    } else if (error.status === 500) {
                        return
                    } else {
                        setTimeout(function() {
                            api.clearCache(function() {
                                api.rebootApp();
                            });
                        }, 2500);
                    }

                }).finally(function() {
                    api.hideProgress();
                    _this.btnDisabled = false;
                });
            });
            return p;
        }, 400)
    },
    mounted() {
        // this.$notify('提示文案');

    }
});
