FF.module('FormValidation', function(){

    this.initialize = function(){
        console.log('form validation initialize');
    };
    this.createValidator = function(form){
        return (function(){
            var _form = $(form),
                _rules = [];

            return {
                addRule: function(input, callback){
                    _rules.push({
                        input: $(input),
                        callback: callback
                    });

                    return this;
                },
                validate: function(){
                    var is_valid = true;
                    _rules.forEach(function(rule){
                         if(!rule.callback.call(rule.input)){
                             is_valid = false;
                         }
                    });

                    return is_valid;
                },
                watch: function(){
                    _form.on('submit', function(e){
                        if(!this.validate()){
                            e.preventDefault();
                            return false;
                        }
                    }.bind(this));
                }
            }
        }());
    };
});