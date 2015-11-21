FF.module('FeedbackForm', function(){
    var _form = $('#feedback_form'),
        _user_name_input = _form.find('.user_name');

    this.initialize = function(){
        FF.run('FormValidation', function(validation){
            //this.reInitModule('FormValidation');
            var validator = validation.createValidator(_form);
            validator.addRule(_user_name_input, function(){
                if(!$(this).val()){
                    $(this).css('border', '1px solid red');
                    return false;
                }
                return true;
            }).watch();
        });
    };
});