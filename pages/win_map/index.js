apiready = function apiready() {
    api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        api.toLauncher();
    });
    api.hideProgress();
    apiready_init();
    vm.aMap = api.require('aMap');


    vm.$mount('#wrap');

};


var vm = new Vue({
    // el: '#wrap',
    data: {
        aMap: null,
        searchValue: '',
        mapHeaderHeight: '',
        pois: [],
        overlayIds: [],
        fwcxing: false,
        fwcxPoint: [],
    },
    watch: {
        searchValue(v) {
            if (v === '') {
                this.removeAnnotations()
            }
        }
    },
    methods: {
        init() {
            this.aMap.open({
                rect: {
                    x: 0,
                    y: this.mapHeaderHeight,
                    w: 'auto',
                    h: 'auto'
                },
                showUserLocation: true,
                zoomLevel: 11,
                center: {
                    lon: 111.66211712479296,
                    lat: 26.12246530334488
                },
                fixedOn: api.frameName,
                fixed: true
            }, (ret, err) => {
                if (ret.status) {
                    //  alert(JSON.stringify(ret));
                    this.aMap.setMapAttr({
                        type: 'standard',
                        trafficOn: false,
                        zoomEnable: true,
                        scrollEnable: true,
                        overlookEnabled: false,
                        rotateEnabled: false
                    });

                    this.aMap.showUserLocation({
                        isShow: true
                    });

                    this.getLocation()





                } else {
                    //  alert(JSON.stringify(err));
                }
            });
        },
        setMapAttr(s) {
            this.aMap.setMapAttr({
                type: s,
                trafficOn: false,
                zoomEnable: true,
                scrollEnable: true,
                overlookEnabled: false,
                rotateEnabled: false
            });
        },
        getLocation() {
            this.aMap.getLocation((ret, err) => {
                if (ret.status) {
                    this.aMap.setCenter({
                        coords: {
                            lon: ret.lon,
                            lat: ret.lat
                        },
                        animation: false
                    });
                } else {
                    alert(JSON.stringify(err));
                }
            });
        },
        openDrawerPane() {
            api.openDrawerPane({
                type: 'left'
            });
        },
        removeAnnotations() {
            this.aMap.removeAnnotations({
                ids: null
            });
        },
        onSearch() {
            this.removeAnnotations()
            this.aMap.searchInCity({
                city: '长沙',
                keyword: this.searchValue,
                offset: 8,
                page: 1,
                sortrule: 0
            }, ret => {
                if (ret.status) {
                    let pois = ret.pois
                    pois = pois.map((item) => {
                        const o = {
                            id: item.uid,
                            lon: item.lon,
                            lat: item.lat,

                            draggable: false,
                            w: 100,
                            h: 100,
                            name: item.name
                        }

                        return o
                    })
                    this.pois = pois
                    // console.log(JSON.stringify(pois))

                    if (pois.length > 0) {
                        this.aMap.setCenter({
                            coords: {
                                lon: pois[0].lon,
                                lat: pois[0].lat
                            },
                            animation: false
                        });
                        this.aMap.setZoomLevel({
                            level: 18,
                            animation: false
                        });
                        this.addAnnotations(pois)
                    }

                }
            });
        },
        addAnnotations(pois) {
            this.aMap.addAnnotations({
                annotations: pois,
                // icons: ['../../image/map-marker.png']
            }, ret => {
                if (ret.eventType == 'click') {
                    const id = ret.id
                }
            });
            setTimeout(() => {
                this.setBubble(pois)
            }, 1500)
        },
        setBubble(pois) {
            pois.map(item => {
                this.aMap.annotationExist({
                    id: item.id
                }, ret => {
                    if (ret.status) {
                        this.aMap.setBubble({
                            id: item.id,
                            content: {
                                title: item.name,
                            },
                            styles: {
                                titleColor: '#000',
                                titleSize: 10,
                                subTitleColor: '#000',
                                subTitleSize: 10,
                                illusAlign: 'left'
                            }
                        }, ret => {
                            if (ret) {
                                this.aMap.closeBubble({
                                    id: ret.id
                                });
                            }
                        });
                    }
                });
            })

        },
        onClear() {
            this.removeAnnotations()
        },
        clearYwtc() {
            this.aMap.removeOverlay({
                ids: this.overlayIds
            });
            this.overlayIds = []
        },
        ywtcSumit() {
            //先清除所有
            this.clearYwtc()

            var ywtcResult = api.getGlobalData({
                key: 'ywtcResult'
            });
            // console.log(ywtcResult)

            var url = ywtcResult.accesspoint+'/'+ywtcResult.title;
            this.ywtc_ajax(url).then((response) => {
              var features = response.features
              for (var i = 0; i < features.length; i++) {
                  var o = features[i]
                  var rings = o.geometry.rings
                  for (var j = 0; j < rings.length; j++) {
                      var t = rings[j]

                      var points = t.map(item => {
                          return {
                              lon: item[0],
                              lat: item[1]
                          }
                      })
                      // console.log(JSON.stringify(points.length))
                      this.aMap.addPolygon({
                          id: o.uid,
                          styles: {
                              borderColor: '#FF0000',
                              borderWidth: 3,
                              lineDash: false,
                              fillColor: '#ff0'
                          },
                          points: points
                      });
                      this.overlayIds.push(o.uid)
                  }

              }
            })

            api.showProgress({
                title: '加载图层中...',
                modal: true
            });
            setTimeout(() => {
                api.hideProgress();
            }, 1500)

        },
        fwcxCLick() {
            this.fwcxing = true
            this.aMap.setRect({
                rect: {
                    x: 0,
                    y: 80,
                    w: 'auto',
                    h: 'auto'
                }
            });
            this.aMap.addEventListener({
                name: 'click'
            }, ret => {
                if (ret.status) {
                    this.fwcxPoint.push({
                        lon: ret.lon,
                        lat: ret.lat
                    })
                    this.aMap.addCircle({
                        id: 'point-' + this.fwcxPoint.length,
                        center: {
                            lon: ret.lon,
                            lat: ret.lat,
                        },
                        radius: 120,
                        styles: {
                            borderColor: '#FF0000',
                            borderWidth: 5,
                            lineDash: false,
                            fillColor: '#FF0000'
                        }
                    });
                    if (this.fwcxPoint.length > 1) {
                        this.aMap.addLine({
                            id: 'line-' + this.fwcxPoint.length - 1,
                            styles: {
                                type: 'arrow',
                                borderColor: '#FF0000',
                                borderWidth: 8,
                                lineDash: false,
                            },
                            points: [this.fwcxPoint[this.fwcxPoint.length - 2], this.fwcxPoint[this.fwcxPoint.length - 1]]
                        });
                    }
                }
            });
        },
        fwcxComplete() {
            if (this.fwcxPoint.length > 2) {
                this.fwcxPoint.push(this.fwcxPoint[0])
                this.aMap.addLine({
                    id: 'line-' + this.fwcxPoint.length - 1,
                    styles: {
                        type: 'arrow',
                        borderColor: '#FF0000',
                        borderWidth: 8,
                        lineDash: false,
                    },
                    points: [this.fwcxPoint[this.fwcxPoint.length - 2], this.fwcxPoint[this.fwcxPoint.length - 1]]
                });
                setTimeout(()=>{
                  this.openWin('win_cloudquery_resultshow',this.fwcxPoint)
                },100)
            } else {
                this.$notify({
                    type: 'warning',
                    message: '最少请绘制3个坐标点'
                });
            }
        },
        fwcxCancal() {
            this.fwcxing = false
            this.fwcxPoint = []
            this.aMap.setRect({
                rect: {
                    x: 0,
                    y: this.mapHeaderHeight,
                    w: 'auto',
                    h: 'auto'
                }
            });
            this.aMap.removeEventListener({
                name: 'click'
            });
            this.removeAnnotations()
        },
        fwcxClear() {
            this.removeAnnotations()
            this.fwcxPoint = []
        }
    },
    mounted() {
        this.mapHeaderHeight = $api.fixTabBar($api.byId('map-header'));
        this.init()
        init_arcgis_ajax()

    }
});
