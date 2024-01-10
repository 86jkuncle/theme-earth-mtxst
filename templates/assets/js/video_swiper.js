var o = $("#slide-contents")
        l = $(".homepage-skypixel-module .swiper-pagination-bullet");
        var video_swiper = new Swiper(".homepage-skypixel-module .swiper-container", {
            loop: true,
            initialSlide: 1,
            centeredSlides: true,
            observer: false,
            observeParents: true,
            // pagination: {
            //   el: '.swiper-pagination-box',
            // },
            navigation: {
                nextEl: ".homepage-skypixel-module .swiper-btn-next",
                prevEl: ".homepage-skypixel-module .swiper-btn-prev"
            },
            slidesPerView: 'auto',
            spaceBetween: 16,
            speed: 800,
            on: {
                init: function () {
                    // $("#slide-contents").find(".slide-content").eq(0).addClass("active")
                    var videos = document.querySelectorAll('video');
                    videos.forEach(function (video) {
                        video.style.display = 'none';
                    });
                    var currentSlide = this.slides[this.activeIndex];
                    var videoInCurrentSlide = currentSlide.querySelector('video');
                    if (videoInCurrentSlide) {
                        videoInCurrentSlide.style.display = 'block';
                        setTimeout(function(){videoInCurrentSlide.play();},200)
                    }
                },
                slideChange: function () {
                    var videos = document.querySelectorAll('video');
                    videos.forEach(function (video) {
                        video.pause();
                        video.style.display = 'none';
                    });
                    var currentSlide = this.slides[this.activeIndex];
                    var videoInCurrentSlide = currentSlide.querySelector('video');
                    
                    if (videoInCurrentSlide) {
                      // videoInCurrentSlide.load();
                        videoInCurrentSlide.style.display = 'block';
                        setTimeout(function(){videoInCurrentSlide.play();},200)
                        // videoInCurrentSlide.play();
                    }
                    var l =$(".homepage-skypixel-module .swiper-pagination-bullet");
                    l.removeClass("swiper-pagination-bullet-active").eq(this.realIndex).addClass("swiper-pagination-bullet-active")

                    // var e = o.find(".slide-content");
                    //         e.removeClass("active").removeClass("prev").removeClass("next")
                    //         e.attr("tabindex", -1);
                    //         var t = this.realIndex;
                    //          var a = 0 === this.realIndex ? l.length - 1 : this.realIndex - 1;
                    //          var i = this.realIndex === l.length - 1 ? 0 : this.realIndex + 1;
                    //         $(e.eq(t)).addClass("active");
                    //         $(e.eq(t)).attr("tabindex", 0);
                    //         $(e.eq(a)).addClass("prev");
                    //         $(e.eq(i)).addClass("next");
                },
            },
        });