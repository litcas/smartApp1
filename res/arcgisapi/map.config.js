/* --------------------------------地图初始信息配置-------------------------------- */
function MapConfig() { }
MapConfig.mapInitParams = {
    fullExtent: {//全图范围
        xmin: 108.797402,
        ymin: 24.642208,
        xmax: 114.267743,
        ymax: 30.132388
    },
    extent: {//初始化范围  102.524,24.8927,125.956,31.55
      xmin: 111.66211712479296,
      ymin: 26.12246530334488,
      xmax: 112.1701932704081,
      ymax: 26.820718176097024,
    },
    center:[113, 28],
    initZoom:13,
    spatialReference: {//地图空间参考坐标系
        wkid: 4326
        //wkid: 4490
    },
    lods: [//针对瓦片的地图服务的,用来控制瓦片级别的显示，有时候切片级别太多的话，可以只显示部分的级别地图
           //resolution scale这些值的获取参照发布的切片地图服务详情
//         { "level": 0, "resolution": 0.3515625, "scale": 1.47914677727283E8 },
//         { "level": 1, "resolution": 0.17578125, "scale": 7.39573388636414E7 },
//         { "level": 2, "resolution": 0.087890625, "scale": 3.69786694318207E7 },
           { "level": 3, "resolution": 0.0439453125, "scale": 1.84893347159103E7 },
           { "level": 4, "resolution": 0.02199732549012637, "scale": 9244667.35795517 },
           { "level": 5, "resolution": 0.010998662745063196, "scale": 4622333.67897759 },
           { "level": 6, "resolution": 0.005499331372531586, "scale": 2311166.83948879 },
           { "level": 7, "resolution": 0.002749665686265805, "scale": 1155583.4197444 },
           { "level": 8, "resolution": 0.0013748328431328976, "scale": 577791.709872198 },
           { "level": 9, "resolution": 6.874164215664488E-4, "scale": 288895.854936099 },
           { "level": 10, "resolution": 3.4370821078322564E-4, "scale": 144447.92746805 },
           { "level": 11, "resolution": 1.7185410539161233E-4, "scale": 72223.9637340248 },
           { "level": 12, "resolution": 8.592705269580617E-5, "scale": 36111.9818670124 },
           { "level": 13, "resolution": 4.296352634790308E-5, "scale": 18055.9909335062 },
           { "level": 14, "resolution": 2.14576721191406E-5, "scale": 9027.9954667531 },
           { "level": 15, "resolution": 1.07288360595703E-5, "scale": 4513.99773337655 },
           { "level": 16, "resolution": 5.36441802978516E-6, "scale": 2256.99886668827 }
    ]
}



MapConfig.yxdt = "http://218.77.59.2:65002/Services/BasemapService.svc/rest/services/tianditu_satellite_test/MapServer";
MapConfig.dxdt = "http://218.77.59.2:65002/Services/BasemapService.svc/rest/services/tianditu_dx_test/MapServer";
MapConfig.sldt = "http://218.77.59.2:65002/Services/BasemapService.svc/rest/services/tianditu_vector_test/MapServer";
