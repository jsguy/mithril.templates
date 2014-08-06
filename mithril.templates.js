//	Mithril templates.
//	Copyright (C) 2014 jsguy (Mikkel Bergmann)
//	MIT licensed
(function(context){
	context.m = context.m || {};

	context.m.templates = {};

	//	Returns a template from either a function or string
	//	Note: use 'data' as the variable for the data
	context.m.template = function(tmpl, data){
		try{
			var isFunc = (typeof tmpl == 'function'), t, f, result;
			if(isFunc) {
				result = tmpl(data);
			} else {
				t = document.getElementById(tmpl);
				t = t? t.innerHTML: tmpl;

				//	Use sugar tags if they are available
				f = (m.sugarTags? 
					new Function("data", 'with(m.sugarTags) {return(' + t + ')};'):
					new Function("data", 'return(' + t + ')'));
				result = f(data);
			}

			return result;
		} catch(e){
			var msg = e.message;
			return "Mithril template error: " + msg + ".";
		}
	};

	//	Returns an ajax loadable template
	context.m.template.load = function(url){
		return m.request({
			method: "GET",
			url: url,
			deserialize: function(value) {
				return value;
			}
		});
	};

	//	Defines a template for later use
	context.m.template.define = function(name, tmpl){
		context.m.templates[name] = tmpl;
	};


	//	Compiles a defined template
	context.m.template.compile = function(name, data){
		return context.m.template(context.m.templates[name], data);
	};

}(window));