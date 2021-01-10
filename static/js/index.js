$(document).ready(function(){

    let imgs = [];
    let imgs_user = [];
    $('.loading').hide();
    $('#div_load_profile').hide();
    $('.content_load').hide();


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
                    put_data_post(JSON.parse(data));
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
                    put_data_user(JSON.parse(data));
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert(errorThrown);
                },
                complete: function(){
                    $('.loading').hide();
                }
            });
    });

})

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
                      <button type="button" class="btn btn-sm btn-outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
</svg></button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Открыть</button>
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
                      <button type="button" class="btn btn-sm btn-outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
</svg></button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Открыть</button>
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