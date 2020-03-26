apiready = function apiready() {
    apiready_init();
    vm.winHeight = api.winHeight;
    vm.$mount('#wrap');
};

const vm = new Vue({
    // el: '#wrap',
    data: {
        winHeight: 0,
        form: {
            employee: {
                office: {
                    officeCode: '',
                    officeName: ''
                }
            },
            xzq: '',
            gzdw: '',
            loginCode: '',
            password: '',
            userName: '',
            phone: '',
            regValidCode: '1234',
        },
        btnDisabled: false,
        sumitAllow: true,
        time: 120 * 1000,
        timeFlag: false,
        xzjbShowPicker: false,
        xzjbColumns: ['国家级', '省级', '市级', '县级'],
        xzqShowPicker: false,
        areaList: areaList_json
    },
    methods: {
        onClickLeft() {
            this.closeWin()
        },
        getCode() {
            this.timeFlag = true
        },
        finished() {
            this.timeFlag = false
        },
        xzjbOnConfirm(value) {
            this.form.employee.office.officeCode = value;
            this.xzjbShowPicker = false;
        },
        xzqOnConfirm(value) {
            const arr = []
            value.forEach((item) => {
                arr.push(item.name)
            })
            this.form.employee.office.officeName = arr.join('-');
            this.xzqShowPicker = false;
        },
        register: debounce(function() {
            var _this = this;
            if (!this.sumitAllow) {
                return;
            } else if (!this.form.loginCode) {
                api.toast({
                    msg: '登陆账号不能为空',
                    duration: 3000
                });
                return;
            } else if (!this.form.userName) {
                api.toast({
                    msg: '用户姓名不能为空',
                    duration: 3000
                });
                return;
            } else if (!this.form.password) {
                api.toast({
                    msg: '密码不能为空',
                    duration: 3000
                });
                return;
            }
            this.btnDisabled = true;
            api.showProgress({
                title: '注册中...',
                modal: false
            });
            var p = new Promise(function(resolve, reject) {
                var postData = {
                    "regValidCode": _this.form.regValidCode,
                    "loginCode": _this.form.loginCode,
                    "userName": _this.form.userName,
                    "password": _this.form.password,
                    "employee.office.officeCode": '4301001',
                    "employee.office.officeName": '长沙市'
                };
                _this.$ajax({
                    url: '/pl/app/saveRegByValidCode',
                    method: 'post',
                    data: postData,
                    transformRequest: [function(data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }]
                }).then(function(response) {
                    if (response.data.result === 'false') {
                        api.toast({
                            msg: response.data.message,
                            duration: 5000
                        });
                        return
                    }

                    api.toast({
                        msg: '恭喜您，注册成功',
                        duration: 3000
                    });

                    resolve(response.data);
                    setTimeout(() => {
                        _this.closeWin()
                    }, 3000)
                }).catch(function(error) {
                    api.toast({
                        msg: '未知错误',
                        duration: 3000
                    });

                }).finally(function() {
                    api.hideProgress();
                    _this.btnDisabled = false;
                });
            });
            return p;
        }, 400)
    },
    mounted() {

    }
});
