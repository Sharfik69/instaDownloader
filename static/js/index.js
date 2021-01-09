document.addEventListener("DOMContentLoaded", () => {
    let btn_load_post = document.getElementById("btn_load_post");
    let btn_load_profile = document.getElementById("btn_load_profile");

    let div_load_post = document.getElementById("div_load_post");
    let div_load_profile = document.getElementById("div_load_profile");

    btn_load_post.onclick = () => {
        div_load_post.style.visibility = "visible";
        div_load_profile.style.visibility = "hidden";
    }
    btn_load_profile.onclick = () => {
        div_load_post.style.visibility = "hidden";
        div_load_profile.style.visibility = "visible";
    }
});