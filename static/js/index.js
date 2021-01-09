$(document).ready(function(){
    $('#btn_load_post').click(function(){
        $('#div_load_post').show();
        $('#div_load_profile').hide();
    });

    $('#btn_load_profile').click(function(){
        $('#div_load_post').hide();
        $('#div_load_profile').show();
    });


    $("#send_post_link").click(function(){
        $.ajax('/find_post', {
                type: 'POST',
                data: $('#post_link').val(),
                contentType: 'application/json',
                success: function(data, textStatus, jqXHR){
                    put_data(JSON.parse(data));
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert(errorThrown);
                }
            });
    });
})

function put_data(data) {
    user_name = data['user_name'];
    user_photo = data['user_pic'];
    user_photos = data['img_list'];
    $('#user_name').text(user_name)
    $(".user_img").attr("src", user_photo);
    $( ".user_photos" ).empty();
    for (let i = 0; i < user_photos.length; i++) {
        $( ".user_photos" ).append( "<img class='photo' src='" + user_photos[i] + "'/>" );
    }

    $('.content_load').show();
}