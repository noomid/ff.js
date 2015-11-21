FF.run([
        'FormValidation',
        'Search',
        'FeedbackForm'
    ],
    function(
        formValidation,
        search,
        feedback
    ){

        $('#test').on('click', function(){
            search.setVar('data', ['qwe', 'qwer', 'qwert', 'qwerty']);
            search.updateData();
        });

        var test_validation = formValidation.createValidator($('#test_form'));
        test_validation.addRule($('#validation_test'), function(){
            if(!$(this).val()){
               $(this).css('border', '1px solid red');
               return false;
            }
            $(this).css('border', '');
            return true;
        }).addRule($('#validation_test2'), function(){
            if($(this).val().length < 5){
                $(this).css('border', '1px solid yellow');
                return false;
            }
            $(this).css('border', '');
            return true;
        }).watch();

        this.setGlobal('test', 'value');
});