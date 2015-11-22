var FF = (function(){

    var _modules = {},
        _initialized_modules = {},
        _modules_vars = {},
        _globals = {},
        _set_global = function(name, value){
            _globals[name] = value;

            return value;
        },
        _get_global = function(name){
            return _globals[name];
        },
        _init_module = function(module_name){
            if(typeof _initialized_modules[module_name] !== 'undefined'){
                return _initialized_modules[module_name]
            }
            var module = new _modules[module_name]();
            if(!(module instanceof _modules[module_name])){
                for(var i in _modules[module_name].prototype){
                    if(!module.hasOwnProperty(i)){
                        module[i] = _modules[module_name].prototype[i];
                    }
                }
            }
            if(module.hasOwnProperty('initialize')){
                module['initialize']();
            }
            _initialized_modules[module_name] = module;
            return module;
        };

    return {
        setGlobal: _set_global,
        getGlobal: _get_global,
        setVar: function(module_name, var_name, value){
            if(typeof _modules_vars[module_name] === 'undefined'){
                _modules_vars[module_name] = {};
            }
            _modules_vars[module_name][var_name] = value;

            return value;
        },
        module: function(module_name, module){
            if(!_modules.hasOwnProperty(module_name)){
                module.prototype = (function(){
                    var _module_name = module_name;
                    return {
                        setVar: function(var_name, value){
                            if(typeof _modules_vars[_module_name] === 'undefined'){
                                _modules_vars[_module_name] = {};
                            }
                            _modules_vars[_module_name][var_name] = value;

                            return value;
                        },
                        getVar: function(var_name){
                            return _modules_vars[_module_name][var_name];
                        },
                        setGlobal: _set_global,
                        getGlobal: _get_global
                    }
                }());

                _modules[module_name] = module;
            }
        },
        run: function(){
            var args = Array.prototype.slice.call(arguments),
                callback = args.pop(),
                modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
                i, callback_args = [];

            if (!(this instanceof FF.run)) {
                return new FF.run(modules, callback);
            }
            this.setGlobal = _set_global;
            this.getGlobal = _get_global;
            this.reInitModule = function(module_name){
                delete _initialized_modules[module_name];
                return _init_module(module_name);
            };

            for (i = 0; i < modules.length; i += 1) {
                callback_args.push(_init_module(modules[i]));
            }

            callback.apply(this, callback_args);
        }
    };
}());