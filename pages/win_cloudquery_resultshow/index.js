apiready = function apiready() {
    apiready_init();
    vm.pageParam = api.pageParam
    var rings = vm.pageParam.map(item => {
        return [
            item.lon ,
            item.lat
        ]
    })

    // console.log(JSON.stringify(rings))
    vm.rings = rings
    vm.$mount('#wrap');

};


var vm = new Vue({
    // el: '#wrap',
    data: {
        pageParam: {},
        rings:[],
        title: '云查询结果展示',
        images: [
            '../../image/1.jpg',
            '../../image/2.png',
            '../../image/3.png'
        ],
        tdlyData: [],
        jbntData: []
    },
    methods: {
        onClickLeft() {
            this.closeWin()
        }
    },
    mounted() {
        // requireMapJsInit(window)
        init_arcgis_ajax()
        this.fwcx_ajax('http://218.77.59.2:8599/arcgis/rest/services/pl/tdly/MapServer/0', this.rings).then((res) => {
            console.log(JSON.stringify(res.features.length))
            var data = []
            for (var i = 0; i < res.features.length; i++) {
                var o = res.features[i]
                data.push(o.attributes)
            }
            this.tdlyData = data
        })

        this.fwcx_ajax('http://218.77.59.2:8599/arcgis/rest/services/pl/jbnt/MapServer/0', this.rings).then((res) => {
            console.log(JSON.stringify(res.features.length))
            var data = []
            for (var i = 0; i < res.features.length; i++) {
                var o = res.features[i]
                data.push(o.attributes)
            }
            this.jbntData = data
        })
    }
});

// requireMapJsInit(window)

function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

function requireMapJsInit(window) {
    require([
        "esri/tasks/QueryTask",
        "esri/tasks/support/Query"
    ], function(QueryTask, Query) {
        selectFeaturesTdly()
        selectFeaturesJbnt()

        function selectFeaturesTdly() {
            //
            // console.log(JSON.stringify(vm.pageParam))
            // vm.pageParam = {
            //     "spatialReference": {
            //         "wkid": 4326
            //     },
            //     "rings": [
            //         [
            //             [111.84832270841066, 26.59081013389943],
            //             [111.96250386207518, 26.5826555316327],
            //             [111.90167245533057, 26.445326155411447],
            //             [111.84832270841066, 26.59081013389943]
            //         ]
            //     ]
            // }

            var url = "http://218.77.59.2:8599/arcgis/rest/services/pl/tdly/MapServer/0";
            var queryTask = new QueryTask(url);
            var query = new Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            // query.geometry = vm.pageParam;
            query.where = ""
                //  queryTask.execute(query, searchPLLayerBack);
            queryTask
                .execute(query)
                .then(getResultsTdly)
                .catch(promiseRejected);
        };

        function getResultsTdly(response) {

            // debugger;  坐落单位名   图斑面积
            console.log(response.features.length)
            var data = []
            response.features.length = parseInt(response.features.length / 2)
            if (response.features.length > 6) {
                response.features.length = 6
            }
            for (var i = 0; i < response.features.length; i++) {
                var o = response.features[random(0, response.features.length - 1)]
                data.push(o.attributes)
            }
            vm.tdlyData = data

                //  alert(response.features["0"].attributes.MC)
        }


        function selectFeaturesJbnt() {
            var url = "http://218.77.59.2:8599/arcgis/rest/services/pl/jbnt/MapServer/0";
            var queryTask = new QueryTask(url);
            var query = new Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            // query.geometry = vm.pageParam;
            query.where = ""
                //  queryTask.execute(query, searchPLLayerBack);
            queryTask
                .execute(query)
                .then(getResultsJbnt)
                .catch(promiseRejected);
        };

        function getResultsJbnt(response) {
            var data = []
            response.features.length = parseInt(response.features.length / 2)
            if (response.features.length > 6) {
                response.features.length = 6
            }
            for (var i = 0; i < response.features.length; i++) {
                var o = response.features[random(0, response.features.length - 1)]
                data.push(o.attributes)
            }
            vm.jbntData = data
                // console.log(JSON.stringify(data))
                //  alert(response.features["0"].attributes.MC)
        }



        function promiseRejected(error) {
            console.log("Promise rejected: ", error.message);
        }
    })
}
