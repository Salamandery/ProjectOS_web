function toner() {
    $( "#ton2" ).focus(function() {
        var resultDropdown = $(this).siblings(".result");
            $.get("/qry_ton", {ton2: ""}).done(function(data){
                resultDropdown.html(data);
            });
    });
    $('#ton2').on("keyup input", function(){
        var inputTon2 = $(this).val();
        var resultDropdown = $(this).siblings(".result");
        var res = '';
        if(inputTon2.length){
            $.get("/qry_ton", {ton2: inputTon2}).done(function(data){
                for (var i = 0; i < data.item.length; i++) {
                    res += data.item[i];
                }
                resultDropdown.html(res);
            });
        } else{
            resultDropdown.empty();
        }
    });
    $(document).on("click", "div", function(){
        $(this).parent(".result").empty();
    });
    $(document).on("click", ".result p", function(){
        text = $(this).text();
        let str = text.split('-');
        $(this).parents(".form-group").find('#ton2').val(str[0]);
        $(this).parents(".form-group").find('#cd').val(str[1]);
        $(this).parents(".form-group").find(".result").empty();
    });
}