apiready=function(){api.addEventListener({name:"keyback"},function(t,o){api.toLauncher()}),api.showProgress({title:"加载地图中...",modal:!1}),setTimeout(function(){api.hideProgress()},5e3),apiready_init(),vm.aMapLBS=api.require("aMapLBS"),vm.aMap=api.require("aMap"),vm.getYwtcList()};var vm=new Vue({el:"#wrap",data:{searchValue:"",mapShowPicker:!1,mapColumnsDefault:"0",mapColumns:[{text:"矢量地图",value:"sldt",key:"0"},{text:"卫星地图",value:"yxdt",key:"1"},{text:"地形地图",value:"dxdt",key:"2"}],fwcxing:!1,aMapLBS:null,aMap:null,timeoutStamp:null,ro:{},ywtcShowPicker:!1,ywtcColumnsDefault:"0",ywtcColumns:[],ywtcResult:[]},methods:{onClickLeft:function(){this.closeWin()},openW:function(t){this.openWin(t,window.geometry_pageParam)},fwcxCLick:function(){this.fwcxing=!0,window.userCustomObj.fwcxClick()},fwcxComplete:function(){window.userCustomObj.sketchViewModel.complete()},fwcxCancal:function(){window.userCustomObj.sketchViewModel.cancel(),this.fwcxing=!1},changeMapOnConfirm:function(t){window.userCustomObj.changeMap(t.value),this.mapColumnsDefault=t.key,this.mapShowPicker=!1},changeMapClick:function(){this.mapShowPicker=!0},drawLocation:function(){var e=this.aMapLBS,i=this;e&&(i.timeoutStamp?window.userCustomObj.centerAt(i.ro.lon,i.ro.lat):(api.showProgress({text:"努力定位中...",modal:!1}),e.configManager({accuracy:"best",filter:1},function(t,o){t.status&&e.singleLocation({timeout:6},function(t,o){if(t.status){var e=window._coordinate(t.lat,t.lon);i.ro=e,window.userCustomObj.drawLocation(e.lon,e.lat),window.userCustomObj.centerAt(e.lon,e.lat)}i.refreshLocation(),api.hideProgress()})})))},refreshLocation:function(){var a=this;a.timeoutStamp=window.setTimeout(function i(){a.aMapLBS.singleLocation({timeout:6},function(t,o){if(t.status){window.userCustomObj.clearUpSelection();var e=window._coordinate(t.lat,t.lon);a.ro=e,window.userCustomObj.drawLocation(e.lon,e.lat),a.timeoutStamp=window.setTimeout(i,8e3)}else a.timeoutStamp=window.setTimeout(i,8e3)})},8e3)},onSearch:function(){window.userCustomObj.clearMarker();var t=window.userCustomObj.getCenterPoint(),i=this;this.aMap.getNameFromCoords({lon:t.lon,lat:t.lat},function(t,o){t.status?i.aMap.getCoordsFromName({city:t.city,address:i.searchValue},function(t,o){if(t.status){var e=window._coordinate(t.lat,t.lon);window.userCustomObj.addMarker(e.lon,e.lat),window.userCustomObj.centerAt(e.lon,e.lat)}else i.$toast.fail("未查询到结果")}):i.$toast.fail("未查询到结果")})},onClear:function(){window.userCustomObj.clearMarker()},ywtcClick:function(){this.ywtcShowPicker=!0},ywtcSumit:function(){var t=this;for(var o in window.userCustomObj.ywtcHide(this.ywtcColumns),this.ywtcResult)window.userCustomObj.ywtcShow(this.ywtcResult[o]);api.showProgress({title:"加载图层中...",modal:!0}),setTimeout(function(){api.hideProgress(),t.ywtcShowPicker=!1},2500)},getYwtcList:function(){var o=this;this.$ajax({url:"/pl/app/layerList",method:"get"}).then(function(t){o.ywtcColumns=t.data}).catch(function(t,o){})}},mounted:function(){}});