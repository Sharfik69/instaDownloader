$(document).ready(function(){

    let imgs = [];
    let imgs_user = [];
    $('.loading').hide();
    $('#div_load_profile').hide();
    $('.content_load').hide();
    $('#btn_load_post').click(function(){
        $('#div_load_post').show();
        $('#div_load_profile').hide();
    });

    $('#btn_load_profile').click(function(){
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
    imgs = data['img'];
    $('#user_name').text(user_name);
    $(".user_img").attr("src", user_photo);
    for (let i = 0; i < imgs.length; i++) {
        $( ".user_photos" ).append( "<img class='photo' id='" + i + "' src='" + imgs[i][0]['src'] + "'/>" );
    }

    $('.content_load').show();
}

function put_data_user(data) {
//    console.log(data);
    set_empty();
    user_name = data['owner']['username'];
    user_photo = data['owner']['profile_pic_url'];
    $('#user_name').text(user_name);
    $(".user_img").attr("src", user_photo);
    imgs_user = data['list'];
    for (let i = 0; i < imgs_user.length; i++) {
        $( ".user_photos" ).append( "<img class='photo' id='" + imgs_user[i]['code'] + "' src='" + imgs_user[i]['img'] + "'/>" );
    }
    $('.content_load').show();
}

function set_empty() {
    $('#user_name').text('');
    $(".user_img").attr("src", '');
    $( ".user_photos" ).empty();
}