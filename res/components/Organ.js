Vue.component("v-organ", {
    template: '<div class="v-organ">' +
        '<van-tree-select :items="items" :main-active-index="mainActiveIndex" :active-id="activeId" @navclick="onNavClick" @itemclick="onItemClick" />' +
        '</div>',
    data: function() {
        return {
            items: [
                //   {
                //     // 导航名称
                //     text: '湖南',
                //     // 该导航下所有的可选项
                //     children: [{
                //         // 名称
                //         text: '长沙',
                //         // id，作为匹配选中状态的标识
                //         id: 1,
                //     }, {
                //         text: '株洲',
                //         id: 2
                //     }]
                // }
            ],
            mainActiveIndex: 0,
            activeId: 1
        }
    },
    props: {
        selectFirst: {  
            type: Boolean,
            default: true
        },
    },
    methods: {
        onNavClick: function(index) {
            this.mainActiveIndex = index;
        },
        onItemClick: function(data) {
            this.activeId = data.id;
            this.$emit('select-organ', data)
        },
        selectFirstFunc: function() {
            if (this.items && this.items.length > 0 && this.items[0].children && this.items[0].children.length > 0) {
                var data = this.items[0].children[0]
                this.activeId = data.id;
                this.$emit('select-organ', data)
            }
        },
        selectItemFunc: function(o) {
            for (var i = 0; i < this.items.length; i++) {
                var parent = this.items[i]
                if (parent.children && parent.children.length > 0) {
                    var childrenArr = parent.children
                    for (var j = 0; j < childrenArr.length; j++) {
                        var child = childrenArr[j]
                        if (child.id === o.id) {
                            this.activeId = child.id;
                            this.$emit('select-organ', child)
                            return
                        }
                    }
                }
            }
        },
        getOrgan: function() {
            var vm = this;
            var organ = api.getGlobalData({
                key: 'organ'
            });
            new Promise(function(resolve,reject){
              if (organ){
                resolve(JSON.parse(organ))
              }else{
                vm.$ajax.get('/api/admin/depart/getZhgdDepartTree').then(function(response) {
                  // console.log(JSON.stringify(response.data.data))
                  api.setGlobalData({
                      key: 'organ',
                      value: JSON.stringify(response.data.data)
                  });
                  resolve(response.data.data)
                })
              }
            })
            .then(function(data){
              vm.items = data;
              if (vm.selectFirst) {
                  vm.selectFirstFunc()
              }
              vm.$emit('organdata-mounted')
            })
        }
    },
    mounted: function() {
          this.getOrgan()
    }

});
