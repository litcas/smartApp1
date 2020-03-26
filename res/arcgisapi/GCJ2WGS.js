//圆周率 GCJ_02_To_WGS_84
(function(){
	var PI = 3.14159265358979324;
	/**
	 * @author 作者:
	 * 方法描述:方法可以将高德地图SDK获取到的GPS经纬度转换为真实的经纬度，可以用于解决安卓系统使用高德SDK获取经纬度的转换问题。
	 * @param 需要转换的经纬度
	 * @return 转换为真实GPS坐标后的经纬度
	 * @throws <异常类型> {@inheritDoc} 异常描述
	 */
	function delta(lat, lon) { 
		var a = 6378245.0; //克拉索夫斯基椭球参数长半轴a
		var ee = 0.00669342162296594323; //克拉索夫斯基椭球参数第一偏心率平方
		var dLat = transformLat(lon - 105.0, lat - 35.0);
		var dLon = transformLon(lon - 105.0, lat - 35.0);
		var radLat = lat / 180.0 * PI;
		var magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		var sqrtMagic = Math.sqrt(magic);
		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
		dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
		var res={
			"lat":lat - dLat,
			"lon":lon - dLon
		}
		return res;
	}
	//转换经度
	function transformLon(x, y) {
		var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
		return ret;
	}
	//转换纬度
	function transformLat(x, y) {
		var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
		return ret;
	}

	window._coordinate = delta
})()
