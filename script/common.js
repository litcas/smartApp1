! function() {
    if (typeof Vue === "function") {
        Vue.mixin({
            methods: {
              setStatusWhite:function(style){
                if(api.systemType === 'android'){
                  if(style==='dark'){
                    api.setStatusBarStyle({
                        style: 'dark',
                        color: '#fff'
                    });
                  }else if (style==='home') {
                    api.setStatusBarStyle({
                        style: 'light',
                        color: '#3e70e3'
                    });
                  }else if (style==='light') {
                    api.setStatusBarStyle({
                        style: 'light',
                        color: '#000'
                    });
                  }
                }
              },
                closeWin: function closeWin(n) {
                    if (n) {
                        api.closeWin({
                            name: n
                        });
                    } else {
                        api.closeWin();
                    }
                },
                closeFrame: function closeFrame(name) {
                    if (name) {
                        api.closeFrame({
                            name: name
                        });
                    } else {
                        api.closeFrame({});
                    }
                },
                openWin: function openWin(name, pageParam, singleInstance) {
                    var animation_duration = api.systemType === 'ios' ? 300 : 800

                    if (name.endWith("_nav")) {
                        var winNameIsLoad = api.getGlobalData({
                            key: name
                        });
                        if (winNameIsLoad) {
                            animation_duration = 200
                        } else {
                            animation_duration = 1200
                        }
                    }

                    singleInstance = singleInstance || false
                    api.openWin({
                        slidBackEnabled: false,
                        useWKWebView: true,
                        singleInstance: singleInstance,
                        animation: {
                            type: "fade",
                            // subType:"from_right",
                            duration: animation_duration
                        },
                        name: name,
                        url: "../" + name + "/index.html",
                        pageParam: pageParam
                    });
                },
                getFormatDate: function getFormatDate(dateString) {
                    var date = new Date(dateString);
                    var seperator1 = "-";
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var strDate = date.getDate();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    var currentdate = year + seperator1 + month + seperator1 + strDate;
                    return currentdate;
                }
            }
        });
        Vue.filter('h_m', function(value) {
            function p(s) {
                return s < 10 ? '0' + s : s;
            }
            if (value) {
                var date = new Date(value.replace(/-/g, '/'));
                var h = date.getHours();
                var m = date.getMinutes();
                return p(h) + ':' + p(m);
            } else {
                return '';
            }
        })
    }

    if (typeof Object.assign != 'function') {
        (function() {
            Object.assign = function(target) {
                'use strict';
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        })();
    }
    Promise.prototype.finally = function(callback) {
        var P = this.constructor;
        return this.then(
            function(value) {
                P.resolve(callback()).then(function() {
                    if (value)
                        return value;
                });
            },
            function(reason) {
                P.resolve(callback()).then(function() {
                    if (reason)
                        throw reason;
                });
            }
        );
    };

    String.prototype.endWith = function(endStr) {
        var d = this.length - endStr.length;
        return (d >= 0 && this.lastIndexOf(endStr) == d);
    }
}()

function apiready_init() {
    api.parseTapmode();
    api.addEventListener({
            name: "longpress"
        },
        function(ret, err) {}
    );

    var winName = api.winName;
    if (winName.endWith("_nav")) {
      api.setGlobalData({
          key: winName,
          value: true
      });
    }

    if (typeof Vue === "function") {
        var auth_menus = api.getGlobalData({
            key: 'auth_menus'
        });
        Vue.set(vm.$data, 'auth_menus', auth_menus)

        var auth_elements = api.getGlobalData({
            key: 'auth_elements'
        });
        // console.log(JSON.stringify(auth_elements))
        Vue.set(vm.$data, 'auth_elements', auth_elements)
    }

    initAxiox()

}

function initAxiox(){

      var baseURL = 'http://218.77.59.2:8600'

      var instance = axios.create({
          baseURL: baseURL,
          timeout: 10000
      });

      instance.interceptors.request.use(
          function(request) {
              var token = api.getGlobalData({
                  key: 'token'
              });
              if (token) {
                  request.headers.Authorization = token;
              }
              // console.log(JSON.stringify(request))
              return request;
          },
          function(error) {
              console.log(error)
              return Promise.reject(error);
          }
      );
      instance.interceptors.response.use(
          function(response) {
            // console.log(JSON.stringify(response));
              return response;
          },
          function(error) {

              console.log(JSON.stringify(error));
              if (!error.response) {
                  api.toast({
                      msg: "服务超时"
                  });
                  var response = {
                      data: {
                          status: -1,
                          data: "服务超时"
                      }
                  };
                  error.response = response;
              }
              var errCode = error.response.status;
              if (errCode === 401) {
                  api.toast({
                      msg: "登录信息已过期，请重新登录！",
                      duration: 3000
                  });
                  setTimeout(function() {
                      api.rebootApp();
                  }, 2500);
              } else if (errCode === 500) {
                  console.log(error.response.config.url)
                  api.toast({
                      msg: "服务异常",
                      duration: 3000
                  });
              }
              return Promise.reject(error.response);
          }
      );
      if (typeof Vue === "function") {
          Vue.prototype.$ajax = instance;
      }
      window.$ajax = instance;
}

function debounce(fn, delay) {
    var timer = null;

    return function() {
        var context = this;
        var args = arguments;

        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    };
}

function throttle(func, delay) {
    var prev = Date.now();
    return function() {
        var context = this;
        var args = arguments;
        var now = Date.now();
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
        }
    };
}

function FormatJWT(jwt) {
    var segments = jwt.split('.');
    if (jwt === "") {
        return "";
    }
    if (segments.length !== 3) {
        throw "JWT is required to have three segments";
    }
    var header = Base64URLDecode(segments[0]);
    var content = Base64URLDecode(segments[1]);
    return content
}

function Base64URLDecode(base64UrlEncodedValue) {
    var result;
    var newValue = base64UrlEncodedValue.replace("-", "+").replace("_", "/");
    try {
        result = decodeURIComponent(escape(window.atob(newValue)));
    } catch (e) {
        throw "Base64URL decode of JWT segment failed";
    }
    return result;
}

function preloadImg(srcArr) {
    if (srcArr instanceof Array) {
        for (var i = 0; i < srcArr.length; i++) {
            var oImg = new Image();
            oImg.src = srcArr[i];
        }
    }
}

function pxToRemToPx(px) {
    var baseFontSize = 100
    var htmlFontSize = parseFloat(document.documentElement.style.fontSize)
    return parseInt(px / baseFontSize * htmlFontSize)
}

function init_arcgis_ajax() {
    require([
        "esri/tasks/QueryTask",
        "esri/tasks/support/Query",
        "esri/Graphic"
    ], function(QueryTask, Query, Graphic) {
        vm.fwcx_ajax = function(url, rings) {
            return new Promise(function(resolve, reject) {
                var polygon = {
                    type: "polygon", // autocasts as new Polygon()
                    rings: rings
                };
                var fillSymbol = {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [227, 139, 79, 0.8],
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 1
                    }
                };
                var polygonGraphic = new Graphic({
                    geometry: polygon,
                    symbol: fillSymbol
                });
                var queryTask = new QueryTask(url);
                var query = new Query();
                query.returnGeometry = true;
                query.outFields = ["*"];
                query.geometry = polygonGraphic.geometry;
                query.where = "";
                queryTask
                    .execute(query)
                    .then(function(response) {
                        resolve(response)
                    })
                    .catch(promiseRejected);
            })
        }

        vm.ywtc_ajax = function(url) {
            return new Promise(function(resolve, reject) {
              var queryTask = new QueryTask(url);
              var query = new Query();
              query.returnGeometry = true;
              query.outFields = ["*"];
              query.where = ""
              queryTask
                  .execute(query)
                    .then(function(response) {
                        resolve(response)
                    })
                    .catch(promiseRejected);
            })
        }


        function promiseRejected(error) {
            console.error("Promise rejected: ", error.message);
        }

    })
}
