(function(win){

	function compilePage(page){
		var elements = win.document.getElementsByClassName("vx");
		for(var i = 0; i < elements.length; i++){
			compileElement(page, elements[i]);
		}

		elements = win.document.getElementsByTagName("vx");
		for(var i = 0; i < elements.length; i++){
			compileElement(page, elements[i]);
		}
	};

	function compileElement(page, that){
		var element = win.$(that), tagName = that.tagName.toUpperCase();
		var vx = element.data().vx;
		if(vx == null) element.data().vx = vx = {};

		win.$.each(that.attribute, function(){
			var attr = that;
			if(attr.specified){
				if(attr.name.substr(0,3) == "vx-"){
					var attrName = attr.name.substr(3);
					var expressions = attr.value.match(/\{\{([^\}]*)\}\}/g) || [];
					expressions.forEach(function(expression, i){
						var dataKeys = [];
						expression = expression.replace(/(?:([a-zA-Z]\w*))|(?:\"[^\"]*\")|(?:\'[^\"]*\')/g, function(a0,a1){
							if(a1){
								dataKeys.push(a1);
								return "page.data." + a1;
							} else return a0;
						});
						expression = win.eval("(function(page){ return " + expression + "})");
						var vxSetFunc = function(){
							var attrValue = expression(page);
							element.attr(attrName, attrValue);
						};

						dataKeys.forEach(function(dataKey, i){
							var vxSetFuncs = vx["vx-data-"+dataKey];
							if(vxSetFuncs == null){
								vx["vx-data-"+dataKey] = vxSetFuncs = [];
								element.addClass("vx-data-"+dataKey);
							};

							vxSetFuncs.push(vxSetFunc);
						});
						vxSetFunc();
					});
				}
			}
		});

		if(tagName == "VX"){
			if(vx.content == null) vx.content = win.$.trim(that.innerText);
			if(vx.content.substr(0,2) == "{{" && vx.content.substr(vx.content.length-2) == "}}"){
				var dataKeys = [];
				var expression = vx.content.substr(2,vx.content.length-4).replace(/(?:([a-zA-Z]\w*))|(?:\"[^\"]*\")|(?:\'[^\"]*\')/g, function(a0,a1){
					if(a1){
						dataKeys.push(a1);
						return "page.data." + a1;
					} else return a0;
				});
				expression = win.eval("(function(page){ return " + expression + "})");
				var vxSetFunc = function(){
					that.innerText = expression(page);
				};

				dataKeys.forEach(function(dataKey, i){
					var vxSetFuncs = vx["vx-data-"+dataKey];
					if(vxSetFuncs == null){
						vx["vx-data-"+dataKey] = vxSetFuncs = [];
						element.addClass("vx-data-"+dataKey);
					};

					vxSetFuncs.push(vxSetFunc);
				});

				vxSetFunc();
			}
		}

		element.removeClass("vx");
	}

	function setSingleData(page, key, data){
		page.data[key] = data;
		var vxDataKey = "vx-data-" + key;
		var elements = win.document.getElementsByClassName(vxDataKey);
		win.$.each(elements, function(){
			var element = win.$(this);
			var vx = element.data().vx || {};
			var vxSetFuncs = vx[vxDataKey] || [];
			for(var i = 0; i < vxSetFuncs.length; i++){
				vxSetFuncs[i]();
			}
		});
	};

	function Page(o){
		this.data = {};
		win.$.extend(this,o);
	};

	//把字符串的第一个字母转换成大写
	//var toFirstUpper = function(name){
	//	return name.substr(0,1).toUpperCase() + name.substr(1);
	//}

	Page.prototype = {
		setData:function(a0, a1){
			switch(arguments.length){
				case 1:
					for(var key in a0) setSingleData(this, key, a0[key]);
					break;
				case 2:
					setSingleData(this, a0, a1);
					break;
			}
		}
	};

	win.Page = function(o){
		var onShow = o.onShow || function(){}
		var onHide = o.onHide || function(){}
		o.onShow = function(){
			if (o.servicePath != null) win.require("/api/service.js").set(o.servicePath, this)
			onShow.call(this)
		}
		o.onHide = function(){
			if (o.servicePath != null) win.require("/api/service.js").set(o.servicePath, null)
			onHide.call(this)
		}

		var page = new Page(o);
		win.$(win.document).ready(function(){
			compilePage(page);
			if (page.onLoad) page.onLoad();
			if (page.onShow) page.onShow();
		});
	}

})(window);