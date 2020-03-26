apiready = function apiready() {
  apiready_init();
  vm.$mount('#wrap');
};

const vm = new Vue({
    el: '#wrap',
    data: {
      form:{
        pwd:'',
        newpwd:'',
        cnewpwd:'',
      },
      btnDisabled: false,
      sumitAllow: true,
    },
    methods: {
      onClickLeft() {
        this.closeWin()
      },
      updatepwd: debounce(function() {
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
          } else if (!this.quyu) {
              api.toast({
                  msg: '请选择区域',
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
                  username: _this.username,
                  password: _this.pwd
              };
              _this.$ajax({
                  url: '/api/auth/jwt/token',
                  method: 'post',
                  data: data
              }).then(function(response) {
                  // console.log(JSON.stringify(response));
                  api.setPrefs({
                      key: 'username',
                      value: _this.username
                  });
                  api.setPrefs({
                      key: 'pwd',
                      value: _this.pwd
                  });

                  api.setGlobalData({
                      key: 'token',
                      value: response.data.data
                  });


                  var tokenObj = JSON.parse(FormatJWT(response.data.data));

                  api.setGlobalData({
                      key: 'userId',
                      value: tokenObj.userId
                  });

                  //获取权限
                  _this.getAuth()
                      //获取机构
                  _this.getOrgan()


                  resolve(response.data);
                  _this.openWin('win_nav');
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
    mounted(){

    }
});
