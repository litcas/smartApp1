apiready=function(){apiready_init(),vm.winHeight=api.winHeight,vm.$mount("#wrap")};var vm=new Vue({data:{winHeight:0,form:{employee:{office:{officeCode:"",officeName:""}},xzq:"",gzdw:"",loginCode:"",password:"",userName:"",phone:"",regValidCode:"1234"},btnDisabled:!1,sumitAllow:!0,time:12e4,timeFlag:!1,xzjbShowPicker:!1,xzjbColumns:["国家级","省级","市级","县级"],xzqShowPicker:!1,areaList:areaList_json},methods:{onClickLeft:function(){this.closeWin()},getCode:function(){this.timeFlag=!0},finished:function(){this.timeFlag=!1},xzjbOnConfirm:function(e){this.form.employee.office.officeCode=e,this.xzjbShowPicker=!1},xzqOnConfirm:function(e){var o=[];e.forEach(function(e){o.push(e.name)}),this.form.employee.office.officeName=o.join("-"),this.xzqShowPicker=!1},register:debounce(function(){var t=this;if(this.sumitAllow)if(this.form.loginCode)if(this.form.userName){if(this.form.password)return this.btnDisabled=!0,api.showProgress({title:"注册中...",modal:!1}),new Promise(function(o,e){var i={regValidCode:t.form.regValidCode,loginCode:t.form.loginCode,userName:t.form.userName,password:t.form.password,"employee.office.officeCode":"4301001","employee.office.officeName":"长沙市"};t.$ajax({url:"/pl/app/saveRegByValidCode",method:"post",data:i,transformRequest:[function(e){var o="";for(var i in e)o+=encodeURIComponent(i)+"="+encodeURIComponent(e[i])+"&";return o}]}).then(function(e){"false"!==e.data.result?(api.toast({msg:"恭喜您，注册成功",duration:3e3}),o(e.data),setTimeout(function(){t.closeWin()},3e3)):api.toast({msg:e.data.message,duration:5e3})}).catch(function(e){api.toast({msg:"未知错误",duration:3e3})}).finally(function(){api.hideProgress(),t.btnDisabled=!1})});api.toast({msg:"密码不能为空",duration:3e3})}else api.toast({msg:"用户姓名不能为空",duration:3e3});else api.toast({msg:"登陆账号不能为空",duration:3e3})},400)},mounted:function(){}});