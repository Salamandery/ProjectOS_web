$(document).ready(function(){
    $(".messagebox").fadeOut(7000);
    $('#emp').change(function(){
        get_oficina_to_select();
        get_setor_to_select();
    });
    $('#st').change(function(){
        var setor = $('#st').val();
        get_localizacao_to_select(setor);
    });
});
function get_oficina_to_select() {
    $.ajax({
        url: '/get_oficina_to_select?emp='+$('#emp').val(),
        method: 'get',
        success: function(data) {
        var html = data;
            html = $.parseHTML(html);
            $('#of').html(html);
        }
    });
}
function get_func_to_select() {
    $.ajax({
        url: '/get_func_to_select',
        method: 'get',
        success: function(data) {
        var html = data;
            html = $.parseHTML(html);
            $('#func').html(html);
        }
    });
}
function get_servico_to_select() {
    $.ajax({
        url: '/get_servico_to_select',
        method: 'get',
        success: function(data) {
        var html = data;
            html = $.parseHTML(html);
            $('#serv').html(html);
        }
    });
}
function get_setor_to_select() {
    $.ajax({
        url: '/get_setor_to_select?emp='+$('#emp').val(),
        method: 'get',
        success: function(data) {
        var html = data;
            html = $.parseHTML(html);
            $('#st').html(html);
        }
    });
}
function get_localizacao_to_select(setor) {
    $.ajax({
        url: '/get_localizacao_to_select?st='+setor+'&emp='+$('#emp').val(),
        method: 'get',
        success: function(data) {
        var html = data;
            html = $.parseHTML(html);
            $('#loc').html(html);
        }
    });
}
function get_toners_to_select() {
    $.ajax({
        url: '/get_toners_to_select',
        method: 'get',
        success: function(data) {
        var html = data;
            html = $.parseHTML(html);
            $('#ton').html(html);
        }
    });
}
function carregaNavBar(){
    $.ajax({
        url: '/nav',
        method: 'get',
        success: function(data) {
        var html = '';
            html = data.home;
            html += data.user;
            html = $.parseHTML(html);
            $('#navbar').html(html);
        }
    });
    //$("#icon_menu").innerHTML = "<img src='/img/default/menu_icon.png' class='mark'>";
}
function carregaMenuBar(){
    $.ajax({
        url: '/menu',
        method: 'get',
        success: function(data) {
            var html = '';
            if (data.forms.length > 0) {
                for (var i = 0; i < data.forms.length; i++) {
                    html += data.forms[i];
                }
            }
            html = $.parseHTML(html);
            $('#menubar').html(html);
        }
    });
}
function contentPG(pg) {
    let name = document.getElementById('menubar').className;

    if (name == "menubar menu-enabled") {
        openMenu();
    }
    $("#content").load(pg);

    /*if (window.location.pathname != '/portal') {
        window.location.replace('/portal');
    }*/
}
function openMenu() {
    $('#menubar').toggleClass('menu-enabled');
    $('#content').toggleClass('contentDesc');
}
function getHour_Minute() {
    let d = new Date();
    let hr = d.getHours();
    let min = d.getMinutes();
    let hour = '';
    if (hr <= 9) {
        hr = '0'+hr;
    } 
    if (min <= 9) {
        min = '0'+min;
    }

    hour = hr+':'+min;
    return hour;
}
function refreshPG(id) {
    let tb = setTimeout(function(){
        if (document.getElementById(id) != null) {
            contentPG('/pnl/pnl_os');
        } else {
            clearTimeout(tb);
        }
    }, 30000);
}
function refreshTb(id) {
    let tb = setTimeout(function(){
        if (document.getElementById(id) != null) {
            push_tb_os();
            refreshTb(id);
        } else {
            clearTimeout(tb);
        }
    }, 30000);
}
function editTable() {
    $(document).ready(function () {
        $('#tableEdit tbody tr').each(function (i) {
            $(this).children('td.rowInEdit').each(function (p) {

                $(this).dblclick(function () {
                    var conteudoOriginal = $(this).text();
                    var novoElemento = $('<input/>', { type:'text', value:conteudoOriginal });
                    $(this).html(novoElemento.blur(function () {
                        var conteudoNovo = $(this).val();
                        //var posicao = p + 1;
                        var posicao2 = i + 1;
                        //alert(posicao);
                        //alert(posicao2);

                        if (conteudoNovo == "") {
                            //alert('novo');
                            //alert(conteudoNovo);
                            //alert('original');
                            //alert(conteudoOriginal);
                            $(this).parent().html(conteudoOriginal);
                        }
                         else {
                            $(this).parent()
                            .html(conteudoNovo)
                            .parents('tr')
                            .next()
                            .children('td:nth-child(' + posicao2 + ')')
                            .trigger('dbclick');
                        }                                               
                    }
                    ));
                    $(this).children().select();
                })
            })
        })
    })
}
function tablesearch(id, sort, nPage) {
	if (nPage == null || nPage == 0 || nPage == undefined || nPage == '') nPage = 15;
    $(id).fancyTable({
        sortable: sort,
        pagination: true,
        searchable: true,
        globalSearch: true,
        paginationClass: "btn btn-primary",
        paginationClassActive: "active",
        pagClosest: 3,
        perPage: nPage,
        inputStyle: "form-control",
        inputPlaceholder: "Procurar...",
    });
}
function inputMask(id, mask){
    $(id).mask(mask);
}
function get_modulo_to_select() {
    $.ajax({
        url: '/get_modulo_to_select',
        method: 'get',
        success: function(data) {
        var html = data;
            html = $.parseHTML(html);
            $('#mod').html(html);
        }
    });
}
function get_form_to_select() {
    $.ajax({
        url: '/get_form_to_select',
        method: 'get',
        success: function(data) {
        var html = data;
            html = $.parseHTML(html);
            $('#form').html(html);
        }
    });
}
function get_user_to_select() {
    $.ajax({
        url: '/get_user_to_select',
        method: 'get',
        success: function(data) {
        var html = data;
            html = $.parseHTML(html);
            $('#user').html(html);
        }
    });
}
function get_papel_to_select() {
    $.ajax({
        url: '/get_papel_to_select',
        method: 'get',
        success: function(data) {
        var html = data;
            html = $.parseHTML(html);
            $('#papel').html(html);
        }
    });
}
function update_rec_os() {
    
    $("#rec_os").submit(function(event){
        var request;
        event.preventDefault();
    
        if (request) {
            request.abort();
        }
        let cdos = $("#cdos").val();
        let ds = $("#ds").val();
        let dt = $("#dt").val();
        let resp = $("#resp").val();

        $.ajax({
            url: '/rec_os',
            method: 'POST',
            data: {
                cdos: cdos,
                ds: ds,
                dt: dt,
                resp: resp,
            },
            beforeSend: function(){
                //
            }

        })
        .done(function(msg){
            //
            push_rec_os();
            document.getElementById("rec_os").reset();
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });
    });
}
function update_trans_os() {
    
    $("#trans_os").submit(function(event){
        var request;
        event.preventDefault();
    
        if (request) {
            request.abort();
        }
        let cdos = $("#cdos").val();
        let ds = $("#ds").val();
        let dt = $("#dt").val();
        let resp = $("#resp").val();

        $.ajax({
            url: '/trans_os',
            method: 'POST',
            data: {
                cdos: cdos,
                ds: ds,
                dt: dt,
                resp: resp,
            },
            beforeSend: function(){
                //
            }

        })
        .done(function(msg){
            //
            push_trans_os();
            document.getElementById("trans_os").reset();
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });
    });
}
function insert_notes() {
    
    $("#ins_note").submit(function(event){
        var request;
        event.preventDefault();
    
        if (request) {
            request.abort();
        }
        let cdos = $("#cd").val();
        let ds = $("#ds").val();
        let title = $("#title").val();
        let ordem = $("#ordem").val();

        $.ajax({
            url: '/ins_notas',
            method: 'POST',
            data: {
                cd: cdos,
                ds: ds,
                title: title,
                ordem: ordem,
            },
            beforeSend: function(){
                //
            }

        })
        .done(function(msg){
            //
            push_notes();
            document.getElementById("ins_note").reset();
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });
    });
}
function insert_papel() {
    
    $("#ins_papel").submit(function(event){

        var request;

        event.preventDefault();

        if (request) {
            request.abort();
        }
        let cdos = $("#cd").val();
        let ds = $("#ds").val();

        $.ajax({
            url: '/ins_papel',
            method: 'POST',
            data: {
                cd: cdos,
                ds: ds,
            },
            beforeSend: function(){
                //
            }

        })
        .done(function(msg){
            //
            push_gen_papel();
            document.getElementById("ins_papel").reset();
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });
    });
}
function insert_form() {
    $("#ins_form").submit(function(event){
        var request;
        event.preventDefault();
    
        if (request) {
            request.abort();
        }
        let cdos = $("#cd").val();
        let ds = $("#ds").val();

        $.ajax({
            url: '/ins_form',
            method: 'POST',
            data: {
                cd: cdos,
                ds: ds,
            },
            beforeSend: function(){
                //
            }

        })
        .done(function(msg){
            //
            push_gen_papel();
            document.getElementById("ins_papel").reset();
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });
    });
}
function insert_mod() {
    
    $("#ins_mod").submit(function(event){
        var request;
        event.preventDefault();
    
        if (request) {
            request.abort();
        }
        let cdos = $("#cd").val();
        let ds = $("#ds").val();
        let title = $("#label").val();

        $.ajax({
            url: '/ins_mod',
            method: 'POST',
            data: {
                cd: cdos,
                ds: ds,
                label: label,
            },
            beforeSend: function(){
                //
            }

        })
        .done(function(msg){
            //
            push_gen_mod();
            document.getElementById("ins_mod").reset();
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });
    });
}
function insert_users() {
    
    $("#ins_user_papel").submit(function(event){

        var request;
        event.preventDefault();
    
        if (request) {
            request.abort();
        }
        let user = $("#user").val();
        let papel = $("#papel").val();

        $.ajax({
            url: '/ins_user_papel',
            method: 'POST',
            data: {
                user: user,
                papel: papel,
            },
            beforeSend: function(){
                //
            }

        })
        .done(function(msg){
            //
            push_gen_users();
            document.getElementById("ins_user_papel").reset();
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });
    });
}
function insert_cad_user_set_unid_int() {
    
    $("#ins_cad_user_set_unid_int").submit(function(event){

        var request;

        event.preventDefault();

        if (request) {
            request.abort();
        }
        let user = $("#solic").val();

        $.ajax({
            url: '/ins_cad_user_set_unid_int',
            method: 'POST',
            data: {
                solic: user,
            },
            beforeSend: function(){
                //
            }

        })
        .done(function(msg){
            //
            document.getElementById('tbody').innerHTML="";
            document.getElementById("ins_cad_user_set_unid_int").reset();
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });
    });
}
function insert_sol_os_intra() {
    
    $("#cria_os").submit(function(event){
        var request;
        event.preventDefault();
        if (request) {
            request.abort();
        }
        let solic = $("#solic").val();
        let emp = $("#emp").val();
        let of = $("#of").val();
        let ds = $("#ds").val();
        let st = $("#st").val();
        let loc = $("#loc").val();

        $.ajax({
            url: '/cria_os',
            method: 'POST',
            data: {
                solic: solic,
                emp, emp,
                of, of,
                ds: ds,
                st: st,
                loc: loc,
            },
            beforeSend: function(){
                //
            }

        })
        .done(function(msg){
            //
            push_sol_os();
            socketServer('sol_os');
            document.getElementById("cria_os").reset();
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });
    });
}
function insert_ramais() {
    
    $("#cria_os").submit(function(event){
        var request;
        event.preventDefault();
        if (request) {
            request.abort();
        }
        let cd = $("#cd").val();
        let id = $("#id").val();
        let ds = $("#ds").val();

        $.ajax({
            url: '/ins_ramal',
            method: 'POST',
            data: {
                cd: cd,
                id, id,
                ds, ds,
            },
            beforeSend: function(){
                //
            }

        })
        .done(function(msg){
            //
            push_ramais();
            document.getElementById("ins_ramal").reset();
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });
    });
}
function insert_sol_os() {
    
    $("#sol_os").submit(function(event){
        var request;
        event.preventDefault();
        if (request) {
            request.abort();
        }
        let solic = $("#solic").val();
        let emp = $("#emp").val();
        let of = $("#of").val();
        let ds = $("#ds").val();
        let st = $("#st").val();
        let loc = $("#loc").val();

        $.ajax({
            url: '/cria_os_resp',
            method: 'POST',
            data: {
                solic: solic,
                emp, emp,
                of, of,
                ds: ds,
                st: st,
                loc: loc,
            },
            beforeSend: function(){
                //
            }

        })
        .done(function(msg){
            //
            push_sol_os();
            document.getElementById("sol_os").reset();
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });
    });
}
function push_tb_sol_os_hj() {
    $.ajax({
        url: '/push_tb_sol_os_hj',
        method: 'get',
        success: function(data) {
        var html = '';
            for (var i = 0; i < data.rows.length; i++) {
                html += "<tr id='trRow' class='table-default'>";						
                html += "<td class=''>"+data.rows[i].CD+"</td>";
                html += "<td class=''>"+data.rows[i].DATA+"</td>";
                html += "<td class=''>"+data.rows[i].DS+"</td>";
                if (data.rows[i].RES == null) {
                    html += "<td class=''></td>";
                } else {
                    html += "<td class=''>"+data.rows[i].RES+"</td>";
                }
                html += "</tr>";
            }
            html = $.parseHTML(html);

            $('#tpnlos').html(html);
        }
    });
}
function push_tb_sol_os() {
    $.ajax({
        url: '/push_tb_sol_os',
        method: 'get',
        success: function(data) {
        var html = '';
            for (var i = 0; i < data.rows.length; i++) {
                html += "<tr id='trRow' class='table-default'>";						
                html += "<td class=''>"+data.rows[i].CD+"</td>";
                html += "<td class=''>"+data.rows[i].DS+"</td>";
                html += "</tr>";
            }
            html = $.parseHTML(html);

            $('#tpnlos_all').html(html);
        }
    });
}
function push_tb_sol_os_no_avalia() {
    $.ajax({
        url: '/push_tb_sol_os_no_avalia',
        method: 'get',
        success: function(data) {
        var html = '';
            for (var i = 0; i < data.rows.length; i++) {
                html += "<div class='row'>";						
                html += "<div class='cod'>"+data.rows[i].cd_os+"</div>";
                if (data.rows[i].cd_responsavel == null) {
                    html += "<div class='responsavel'></div>";
                } else {
                    html += "<div class='responsavel'>"+data.rows[i].cd_responsavel+"</div>";
                }
                html += "<div class='avalia'><a href='#'>Avaliar</a></div>";
                html += "</div>";
            }
            html = $.parseHTML(html);

            $('#avaliadiv').html(html);
        }
    });
}
function push_tb_os() {
    $.ajax({
        url: '/push_tb_os',
        method: 'get',
        success: function(data) {
        var html = '';
            for (var i = 0; i < data.rows.length; i++) {
                html += "<tr id='trRow' class='table-default'>";						
                html += "<td class=''>"+data.rows[i].CD+"</td>";
                html += "<td class=''>"+data.rows[i].DATA+"</td>";
                html += "<td class=''>"+data.rows[i].DS+"</td>";
                html += "<td class=''>"+data.rows[i].SOL+"</td>";
                html += "<td class=''>"+data.rows[i].SETOR+"</td>";
                if (data.rows[i].RES == null) {
                    html += "<td class=''></td>";
                } else {
                    html += "<td class=''>"+data.rows[i].RES+"</td>";
                }
                html += "</tr>";
            }
            html = $.parseHTML(html);

            $('#tpnlos').html(html);
        }
    });
}
function push_ramais() {
    $.ajax({
        url: '/push_ramais',
        method: 'get',
        success: function(data) {
        var html = '';
        console.log(data);
            for (var i = 0; i < data.rowCount; i++) {
                html += "<tr id='trRow' class='table-default'>";						
                html += "<td class='cd_ramal'>"+data.rows[i].cd_ramal+"</td>";
                html += "<td class='ds_ramal'>"+data.rows[i].ds_ramal+"</td>";
                html += "<td class='id_ramal'>"+data.rows[i].id_ramal+"</td>";
                html += "<td class='sn_ativo'>"+data.rows[i].sn_ativo+"</td>";
                html += "</tr>";
            }
            html = $.parseHTML(html);

            $('#tbody').html(html);
        }
    });
}
function push_rec_os() {
    $.ajax({
        url: '/push_rec_os',
        method: 'get',
        success: function(data) {
        var html = '';
            for (var i = 0; i < data.rows.length; i++) {
                html += "<tr id='trRow' class='table-default'>";						
                html += "<td class='CD'>"+data.rows[i].CD+"</td>";
                html += "<td class='DATA'>"+data.rows[i].DATA+"</td>";
                html += "<td class='DESCR'>"+data.rows[i].DESCR+"</td>";
                html += "</tr>";
            }
            html = $.parseHTML(html);

            $('#tbody').html(html);
        }
    });
}
function push_trans_os() {
    $.ajax({
        url: '/push_trans_os',
        method: 'get',
        success: function(data) {
        var html = '';
            for (var i = 0; i < data.rows.length; i++) {
                html += "<tr id='trRow' class='table-default'>";						
                html += "<td class='CD'>"+data.rows[i].CD+"</td>";
                html += "<td class='DATA'>"+data.rows[i].DATA+"</td>";
                html += "<td class='DESCR'>"+data.rows[i].DESCR+"</td>";
                html += "<td class='RESP'>"+data.rows[i].RESP+"</td>";
                html += "</tr>";
            }
            html = $.parseHTML(html);

            $('#tbody').html(html);
        }
    });
}
function push_notes() {
    $.ajax({
        url: '/push_notes',
        method: 'get',
        success: function(data) {
        var html = '';
            for (var i = 0; i < data.rows.length; i++) {
                html += "<tr id='trRow' class='table-default'>";						
                html += "<td class='cd'>"+data.rows[i].cd_note+"</td>";
                html += "<td class='title'>"+data.rows[i].title+"</td>";
                html += "<td class='ds'>"+data.rows[i].description+"</td>";
                html += "<td class='ordem'>"+data.rows[i].ordem+"</td>";
                html += "<td class='sn_ativo'>"+data.rows[i].sn_ativo+"</td>";
                html += "</tr>";
            }
            html = $.parseHTML(html);

            $('#tbody').html(html);
        }
    });
}
function push_gen_mod() {
    $.ajax({
        url: '/push_gen_mod',
        method: 'get',
        success: function(data) {
        var html = '';
            for (var i = 0; i < data.rows.length; i++) {
                html += "<tr id='trRow' class='table-default'>";						
                html += "<td class='cd'>"+data.rows[i].cd_modulo+"</td>";
                html += "<td class='ds'>"+data.rows[i].nm_modulo+"</td>";
                html += "<td class='label'>"+data.rows[i].label+"</td>";
                html += "<td class='sn_ativo'>"+data.rows[i].sn_ativo+"</td>";
                html += "</tr>";
            }
            html = $.parseHTML(html);

            $('#tbody').html(html);
        }
    });
}
function push_gen_papel() {
    $.ajax({
        url: '/push_gen_papel',
        method: 'get',
        success: function(data) {
        var html = '';
            for (var i = 0; i < data.rows.length; i++) {
                html += "<tr id='trRow' class='table-default'>";						
                html += "<td class='cd'>"+data.rows[i].cd_papel+"</td>";
                html += "<td class='ds'>"+data.rows[i].ds_papel+"</td>";
                html += "<td class='sn_ativo'>"+data.rows[i].sn_ativo+"</td>";
                html += "</tr>";
            }
            html = $.parseHTML(html);

            $('#tbody').html(html);
        }
    });
}
function push_gen_users() {
    $.ajax({
        url: '/push_gen_users',
        method: 'get',
        success: function(data) {
        var html = '';
            for (var i = 0; i < data.rows.length; i++) {
                html += "<tr id='trRow' class='table-default'>";						
                html += "<td class='cd_user'>"+data.rows[i].cd_usuario+"</td>";
                html += "<td class='cd_papel'>"+data.rows[i].cd_papel+"</td>";
                html += "<td class='ds_papel'>"+data.rows[i].ds_papel+"</td>";
                html += "</tr>";
            }
            html = $.parseHTML(html);

            $('#tbody').html(html);
        }
    });
}
function push_gen_user_set_unid_int() {
    $("#solic").focusout(function(){
        $.ajax({
            url: '/push_gen_cad_user_set_unid_int?solic='+document.getElementById('solic').value,
            method: 'get',
            success: function(data) {
            var html = '';
                for (var i = 0; i < data.rows.length; i++) {
                    html += "<tr id='trRow' class='table-default'>";						
                    html += "<td class='cd_user'>"+$('#solic').val().toUpperCase()+"</td>";
                    html += "<td class='cd_papel'>"+data.rows[i].CD_SETOR+"</td>";
                    html += "<td class='ds_papel'>"+data.rows[i].CD_UNID_INT+"</td>";
                    html += "</tr>";
                }
                html = $.parseHTML(html);

                $('#tbody').html(html);
            }
        });
    });
}
function push_sol_os() {
    $.ajax({
        url: '/push_sol_os',
        method: 'get',
        success: function(data) {
        var html = '';
            for (var i = 0; i < data.rows.length; i++) {
                html += "<tr id='trRow' class='table-default'>";						
                html += "<td class=''>"+data.rows[i].CD_OS+"</td>";
                html += "<td class=''>"+data.rows[i].DATA+"</td>";
                html += "<td class=''>"+data.rows[i].TP+"</td>";
                html += "<td class=''>"+data.rows[i].NM_SOLICITANTE+"</td>";
                html += "<td class=''>"+data.rows[i].DS_SERVICO+"</td>";
                html += "<td class=''>"+data.rows[i].CD_RESPONSAVEL+"</td>";
                html += "<td class=''>"+data.rows[i].EMP+"</td>";
                html += "</tr>";
            }
            html = $.parseHTML(html);

            $('#tbody').html(html);
        }
    });
}
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function getNote() {
    $.ajax({
        url: '/get_notes',
        method: 'get',
        success: function(data) {
        var html = '';
            if (data != 'null') {
                for (var i = 0; i < data.rows.length; i++) {
                    html += "<div id='noteContainer'><div id='note' class='Notedefault'><div class='noteTitle'>"+data.rows[i].title+"</div><div class='noteContent'><p>"+data.rows[i].description+"</p></div></div></div>"
                }
                html = $.parseHTML(html);
                $('#noteContainer').html(html);
            } else {
                var element = document.getElementById('noteCtr');
                element.remove();
                return false;
            }
        }
    });
}
function mascoteIntranet() {
    $(document).ready(function(){
        var pop = $("#popperintra");
        var ref = $("#ballomHelperintra");
        pop.hide();
        var popper = new Popper(ref, pop, {
            placement: 'top',
            onCreate: function(){
                setTimeout(ref.click(), 5000);
            },
            modifiers: {
                preventOverflow: {
                    boundariesElement: pop,
                },
            },
        });
        var text = "Olá, eu preciso de um nome! Você pode me ajudar??";
        ref.click(function() {
            var aux = '';
            var i = 0;
            pop.show();
            document.getElementById('ballomHelperintra').src='/img/mascotetalk.gif';
            var loop = setInterval(function(){
                if (i == text.length-1) {
                    clearInterval(loop);
                    document.getElementById('ballomHelperintra').src='/img/mascotewink.gif';
                }
                aux += text[i];
                pop.html(aux);
                i++;
            },20);
        });
    });
}
function mascoteMensage(msg) {
    var pop = $("#popperintra");
    var aux = '';
    var i = 0;
    pop.show();
    document.getElementById('ballomHelperintra').src='/img/mascotetalk.gif';
    var loop = setInterval(function(){
        if (i == msg.length-1) {
            clearInterval(loop);
            document.getElementById('ballomHelperintra').src='/img/mascotewink.gif';
        }
        aux += msg[i];
        pop.html(aux);
        i++;
    },20);
}
function socketServer(type) {
    switch(type) {
        case 'genlei':
            $(function() {
                function getLei() {
                    //socketio.emit('reloadLei', 'reload');
                    setTimeout(function(){getLei();}, 2000);
                }
                $(document).ready(function(e){
                    //e.preventDefault(); // not page reloading
                    getLei();
                    return false;
                });
                socketio.on('reloadLei', function(msg){
                    $('#divLeito').append($('<li>').text(msg));
                });
            });
        break;
        case 'mascote_intra':
            $(function() {
                socketio.on('ola', function(msg){
                    document.getElementById('ballomHelperintra').src='/img/mascoteses.png';
                });
                socketio.on('solled_os', function(msg){
                    document.getElementById('ballomHelperintra').src='/img/mascoteses.png';
                    mascoteMensage("Uma nova O.S. foi solicitada e necessita de atenção...");
                });
            });
        break;
        case 'sol_os':
            $(function() {
                const socketio = io(); 
                socketio.emit('sol_os', 'solicitado');
            });
        break;
    }
}