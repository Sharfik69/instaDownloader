
$(document).ready(function(){

    let imgs = [];
    let imgs_user = [];
    let model_img_list = [];
    let showing = 0;

    $('.loading').hide();
    $('#div_load_profile').hide();
    $('.content_load').hide();


    var modal = document.getElementById("myModal");

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            showing = 0;
        }
    }

    $('#close_modal').click(function(){
        modal.style.display = "none";
        showing = 0;
    });

    $( "#opener" ).on( "click", function() {
        $( "#dialog" ).dialog( "open" );
    });

    $('#btn_load_post').click(function(){
        $('#btn_profile').removeClass('active');
        $('#btn_post').addClass('active');
        $('#btn_load_post').addClass('')
        $('#div_load_post').show();
        $('#div_load_profile').hide();
    });

    $('#btn_load_profile').click(function(){
        $('#btn_profile').addClass('active');
        $('#btn_post').removeClass('active');
        $('#div_load_post').hide();
        $('#div_load_profile').show();
    });

    $("#send_post_link").click(function(){
        $('.content_load').hide();
        $('.loading').show();
        $.ajax('/find_post', {
                type: 'POST',
                data: $('#post_link').val(),
                contentType: 'application/json',
                success: function(data, textStatus, jqXHR){
                    response = JSON.parse(data);
                    if (response['status'] === 'ok') {
                        put_data_post(response);
                    }
                    else {
                        alert('Не удалось найти пост');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert(errorThrown);
                },
                complete: function(){
                    $('.loading').hide();
                }
            });
    });

     $("#send_profile_link").click(function(){

        $('.content_load').hide();
        $('.loading').show();
        $.ajax('/find_profile', {
                type: 'POST',
                data: $('#profile_link').val(),
                contentType: 'application/json',
                success: function(data, textStatus, jqXHR){
                    response = JSON.parse(data);
                    console.log(response);
                    if (response['status'] === 'ok') {
                        put_data_user(response);
                    }
                    else {
                        alert('Такого пользователя нет');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert(errorThrown);
                },
                complete: function(){
                    $('.loading').hide();
                }
        });
    });
    $(".download").click(function(){
        download(imgs[$(this).val()][2]['src']);
    });
});

function download(url) {
    let link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'download.png');
    link.click();
}

function put_data_post(data) {
    set_empty();
    user_name = data['owner']['username'];
    user_photo = data['owner']['profile_pic_url'];
    user_full_name = data['owner']['full_name']
    $("#user_profile_photo").attr("src", user_photo);
    $("#user_full_name").text(user_full_name)
    imgs = data['img'];
    $('#user_name').text(user_name);
    $(".user_img").attr("src", user_photo);
    for (let i = 0; i < imgs.length; i++) {
//<svg  xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        let element = `
              <div class="col">
              <div class="card shadow-sm">
                
                 <img src="${imgs[i][0]['src']}" id="${i}" class="bd-placeholder-img card-img-top photo" />
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" onclick="download_post_photo(${i})" class="btn btn-sm btn-outline-secondary download" value="${i}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
</svg>&nbsp;Скачать</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
        $( ".user_photos" ).append( element );
        // $( ".user_photos" ).append( "<img class='photo' id='" + i + "' src='" + imgs[i][0]['src'] + "'/>" );
    }

    $('.content_load').show();
}

function put_data_user(data) {
//    console.log(data);
    set_empty();
    user_name = data['owner']['username'];
    user_photo = data['owner']['profile_pic_url'];
    user_full_name = data['owner']['full_name']
    $("#user_profile_photo").attr("src", user_photo);
    $("#user_full_name").text(user_full_name)
    $('#user_name').text(user_name);
    $(".user_img").attr("src", user_photo);
    imgs_user = data['list'];
    for (let i = 0; i < imgs_user.length; i++) {

        let element = `
              <div class="col">
              <div class="card shadow-sm">

                 <img src="${imgs_user[i]['img']}" id="${imgs_user[i]['code']}" class="bd-placeholder-img card-img-top photo" />
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" onclick="download_profile_photo(${i})" class="btn btn-sm btn-outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
</svg></button>
                      <button type="button" class="btn btn-sm btn-outline-secondary" onclick="show_all_post(${i})">Открыть</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
        $( ".user_photos" ).append( element );

//        $( ".user_photos" ).append( "<img class='photo' id='" + imgs_user[i]['code'] + "' src='" + imgs_user[i]['img'] + "'/>" );
    }
    $('.content_load').show();
}

function set_empty() {
    $('#user_name').text('');
    $(".user_img").attr("src", '');
    $( ".user_photos" ).empty();
}

function download_post_photo(id) {
    downloadResource(imgs[id][2]['src']);
}

function download_profile_photo(id) {
    downloadResource(imgs_user[id]['img']);
}

function forceDownload(blob, filename) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function downloadResource(url, filename) {
    if (!filename) filename = url.split('\\').pop().split('/').pop();
    fetch(url, {
        headers: new Headers({
            'Origin': location.origin
        }),
        mode: 'cors'
    })
        .then(response => response.blob())
        .then(blob => {
            let blobUrl = window.URL.createObjectURL(blob);
            forceDownload(blobUrl, filename);
        })
        .catch(e => console.error(e));
}

function show_all_post(id) {
    $('#modal_img').attr('src', imgs_user[id]['img']);
    $('#myModal').css("display", "block");
    model_img_list = [];
    $('#loading_while_load').show();
    $('#show_img').hide();
    showing = 0;
    $('#load_super_img').attr('onClick', 'download_by_modle(' + showing + ')');
    $.ajax('/get_all_posts', {
        type: 'POST',
        data: imgs_user[id]['code'],
        contentType: 'application/json',
        success: function(data, textStatus, jqXHR){
            response = JSON.parse(data);
            console.log(response);
            if (response['img'].length > 1) {
                $('#need_arrow').show();
            }
            else {
                $('#need_arrow').hide();
            }

            if (response['status'] === 'ok') {
                model_img_list = response['img'];
                showing = 0;
                $('#modal_img').attr('src', model_img_list[showing][2]['src']);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(errorThrown);
        },
        complete: function(){
            $('#loading_while_load').hide();
            $('#show_img').show();
        }
    });
}

function download_by_modle(id){
    downloadResource(model_img_list[id][2]['src']);
}

function changeShowing(to){
    showing += to;
    if (showing == -1) {
        showing = model_img_list.length - 1;
    }
    else if (showing == model_img_list.length) {
        showing = 0;
    }
    $('#modal_img').attr('src', model_img_list[showing][2]['src']);
    $('#load_super_img').attr('onClick', 'download_by_modle(' + showing + ')');
}
