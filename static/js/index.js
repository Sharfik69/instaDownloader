$(document).ready(function(){

    let imgs = []
    $('.loading').hide();
    $('#btn_load_post').click(function(){
        $('#div_load_post').show();
        $('#div_load_profile').hide();
    });

    $('#btn_load_profile').click(function(){
        $('#div_load_post').hide();
        $('#div_load_profile').show();
    });


    $("#send_post_link").click(function(){
        $('.loading').show();
        $.ajax('/find_post', {
                type: 'POST',
                data: $('#post_link').val(),
                contentType: 'application/json',
                success: function(data, textStatus, jqXHR){
                    put_data(JSON.parse(data));
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

function put_data(data) {
    user_name = data['owner']['username'];
    user_photo = data['owner']['profile_pic_url'];
    imgs = data['img'];
    $('#user_name').text(user_name)
    $(".user_img").attr("src", user_photo);
    $( ".user_photos" ).empty();
    for (let i = 0; i < imgs.length; i++) {
        $( ".user_photos" ).append( "<img class='photo' id='" + i + "' src='" + imgs[i][0]['src'] + "'/>" );
    }

    $('.content_load').show();
}