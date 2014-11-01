/**
 * @author Dennis Hernández <djhv92@hotmail.com>
 * extensions: TODO
 */

(function ($) {
    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        flat: false
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initData = BootstrapTable.prototype.initData;

    BootstrapTable.prototype.initData = function () {
	
        _initData.apply(this, Array.prototype.slice.apply(arguments));
		var that = this;
		
		if(that.options.flat) {
			that.options.data = sd.flatHelper(that.options.data);
		}
    };
	
	var sd = {
			flat: function(element) {
				var result = {};
				function recurse (cur, prop) {
					if (Object(cur) !== cur) {
						result[prop] = cur;
					} else if (Array.isArray(cur)) {
						for(var i = 0, l = cur.length; i < l; i++) {
							recurse(cur[i], prop ? prop+"."+i : ""+i);
							if (l == 0) {
								result[prop] = [];
							}
						}
					} else {
						var isEmpty = true;
						for (var p in cur) {
							isEmpty = false;
							recurse(cur[p], prop ? prop+"."+p : p);
						}
						if (isEmpty) {
							result[prop] = {};
						}
					}
				}
				recurse(element, "");
				return result;
			},
			
			flatHelper: function (data) {
				var flatArray = [];
				$.each(data, function(i, element) {
					flatArray.push(sd.flat(element));
				});
				return flatArray;
			}
		};
})(jQuery);