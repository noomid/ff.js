FF.module('Search', function(){
    var _data = ['qwe', 'asd', 'zxc', 'rtyu'],
        _show = [],
        _search_input = $('#search'),
        _result_div = $('#search_result'),
        _line_template = function(el){
            return '<span>'+el+'</span><br />';
        },
        _handle_search = function(e){
            var results = [],
                value = _search_input.val();

            _data.forEach(function(el){
                if(value !== '' && el.indexOf(value) !== -1){
                    results.push(el);
                }
            });
            _show = results;
            _render();
        }.bind(this),
        _render = function(){
            var html = '';

            _show.forEach(function(el){
                html += _line_template(el);
            });

            _result_div.html(html);
        };

    this.setData = function(data){
        _data = data;
        _handle_search();
    }.bind(this);

    this.updateData = function(){
        this.setData(this.getVar('data'));
    }.bind(this);

    this.initialize = function(){
        _search_input.on('keyup', _handle_search)
    }
});
