/** @language chinese
 * <p>LConvolutionFilter 类应用矩阵盘绕滤镜效果。卷积将输入图像的像素与相邻的像素合并以生成图像。通过卷积，可以实现大量的图像效果，包括模糊、边缘检测、锐化、浮雕和斜角。您可以将滤镜应用于任何显示对象（即，从 LDisplayObject 类继承的对象）</p>
 * <p>・要对影片剪辑、文本字段、按钮应用滤镜，请使用 filters 属性（继承自 LDisplayObject）。设置对象的 filters 属性不会修改相应的对象，而清除 filters 属性可以删除相应的滤镜。</p>
 * <p>・要对 LBitmapData 对象应用滤镜，请使用 LBitmapData.applyFilter() 方法。对 LBitmapData 对象调用 applyFilter() 会取得源 LBitmapData 对象和滤镜对象，并最终生成一个过滤图像。</p>
 * <p>如果对显示对象应用滤镜，则会自动调用该对象的 cacheAsBitmap(true) 。如果清除所有滤镜，将恢复 cacheAsBitmap(false)。</p>
 * @class LConvolutionFilter
 * @extends LObject
 * @constructor
 * @param {int} matrixX 矩阵的 x 维度（矩阵中列的数目）。默认值为 0。
 * @param {int} matrixY 矩阵的 y 维度（矩阵中行的数目）。默认值为 0。
 * @param {Array} matrix 用于矩阵转换的值的数组。数组中的项数必须等于 matrixX * matrixY。
 * @param {int} divisor 矩阵转换中使用的除数。默认值为 1。
 * @param {int} bias 要添加到矩阵转换结果的偏差。默认值为 0。
 * @example
 * 	var bitmapdata = new LBitmapData(event.target);  
 * 	var bitmap = new LBitmap(bitmapdata);
 * 	addChild(bitmap);
 * 	var shadow = new LDropShadowFilter(5,45,"#000000");
 * 	bitmap.filters = [shadow];
 * @examplelink <p><a href="../../../api/LDropShadowFilter/index.html" target="_blank">测试链接</a></p>
 * @since 1.9.11
 * @public
 */
var LConvolutionFilter = (function () {
	function LConvolutionFilter (matrixX, matrixY, matrix, divisor, bias, preserveAlpha, clamp, color, alpha) {
		var s = this;
		LExtends(s, LBitmapFilter, []);
		s.type = "LConvolutionFilter";
		s.matrixX = matrixX ? matrixX : 0;
		s.matrixY = matrixY ? matrixY : 0;
		s.matrix = matrix;
		if (!divisor) {
			divisor = matrix.reduce(function(a, b) {return a + b;}) || 1;
		}
		s.divisor = divisor;
		s.bias = bias ? bias : 0;

	}
	var p = {
		ll_show : function (displayObject) {
			var s = this, c = LGlobal.canvas, d = displayObject, bitmapData;
			if(d.constructor.name == "LBitmap"){
				bitmapData = d.bitmapData;
			}else{
				if(!d._ll_cacheAsBitmap){
					d.cacheAsBitmap(true);
				}
				bitmapData = d._ll_cacheAsBitmap.bitmapData;
			}
			bitmapData.applyFilter(bitmapData, new LRectangle(0,0,bitmapData.width,bitmapData.height), new LPoint(0,0), s);
		},
		filter : function(){
			
		}
	};
	for (var k in p) {
		LConvolutionFilter.prototype[k] = p[k];
	}
	return LConvolutionFilter;
})();