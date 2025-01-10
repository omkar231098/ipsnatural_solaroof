$(function() {
    $("a.close-btn").on("click", function() {
        $(this).parent().hide(), $(".right-fixed").css("max-width", "auto!important")
    }), $(".hero-slider > ul").slick({
        infinite: !0,
        slidesToShow: 1,
        lazyLoad: 'ondemand',
        slidesToScroll: 1,
        dots: !1,
        speed: 1e3,
        fade: !0,
        autoplay: !0,
        arrows: !0,
        responsive: [{
            breakpoint: 414,
            settings: {
                arrows: !1,
                dots: !0,
                slidesToShow: 1
            }
        }]
    }), $(".success-story-slider > ul").slick({
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: !1,
        speed: 500,
        arrows: !0
    }), $(".collapse").collapse(), AOS.init(), $(".fancybox").fancybox({
        hideOnContentClick: !0,
        beforeShow: function() {
            $(".slider-cont").css("display", "block")
        },
        afterClose: function() {
            $(".slider-cont").css("display", "block")
        }
    }), $(document).on("click", 'a[href^="#"]', function(s) {
        s.preventDefault(), $("html, body").animate({
            scrollTop: $($.attr(this, "href")).offset().top
        }, 1e3)
    }), $(" .slider-cont").matchHeight()
});


$('.choose-need-slider1 ul').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    speed: 500,
    responsive: [{
            breakpoint: 990,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        }
    ]

});