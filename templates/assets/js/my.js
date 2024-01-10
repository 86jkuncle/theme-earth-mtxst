function hiddenSearch(obj){
    // console.log(obj)
    obj.style.display = "none";
    $('#searchForm')[0].style.display = "flex"
    // $('#searchForm').style.display = "flex";
    $('.mycontainer')[0].style.maxWidth="1250px";
}
var swiper = new Swiper(".mySwiper", {
    initialSlide: 0,
    rewind: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


$(window).on("scroll", function(e){
    var t = $("#site-header");
    var e = $(document).scrollTop()
        , a = parseInt($("body").css("margin-top") || 0);
    e > a ? t.addClass("sticky-white-nav") : t.removeClass("sticky-white-nav")
    e > a ? t.find("a").addClass("nav-link1") : t.find("a").removeClass("nav-link1")

    // console.log($(document).scrollTop());
    // console.log(parseInt($("body").css("margin-top") || 0))
})