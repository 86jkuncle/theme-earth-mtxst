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

        // 修复视频 src 问题
$(document).ready(function() {
    // 等待 Swiper 初始化完成
    setTimeout(function() {
        // 修复所有视频的 src（从 source 标签获取）
        $('.homepage-skypixel-module video').each(function() {
            var source = $(this).find('source')[0];
            if (source && !this.src) {
                this.src = source.src;
            }
        });
        
        // 播放第一个视频
        var firstVideo = $('.homepage-skypixel-module .swiper-slide-active video')[0];
        if (firstVideo) {
            firstVideo.play();
        }
    }, 500);
});

// 在 $(document).ready 内，Swiper 初始化代码之后添加

// 自定义视频控制条
function initVideoControls() {
    // 移除原生控制条
    $('.homepage-skypixel-module video').removeAttr('controls');
    
    // 添加自定义控制
    $('.homepage-skypixel-module .swiper-slide').each(function() {
        if ($(this).find('.video-controls').length > 0) return;
        
        $(this).append(`
            <div class="video-controls">
                <button class="ctrl-play">⏸️</button>
                <button class="ctrl-mute">🔇</button>
                <input class="ctrl-progress" type="range" min="0" max="100" value="0">
                <span class="ctrl-time">0:00 / 0:00</span>
            </div>
        `);
    });
}

// 时间格式化
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 初始化控制条
setTimeout(initVideoControls, 1000);

// 播放/暂停
$(document).on('click', '.ctrl-play', function(e) {
    e.stopPropagation();
    e.preventDefault();
    let video = $(this).closest('.swiper-slide').find('video')[0];
    if (video.paused) {
        video.play();
        $(this).text('⏸️');
    } else {
        video.pause();
        $(this).text('▶️');
    }
});

// 静音控制
$(document).on('click', '.ctrl-mute', function(e) {
    e.stopPropagation();
    e.preventDefault();
    let video = $(this).closest('.swiper-slide').find('video')[0];
    video.muted = !video.muted;
    $(this).text(video.muted ? '🔇' : '🔊');
});

// 进度条
$(document).on('input', '.ctrl-progress', function(e) {
    e.stopPropagation();
    let video = $(this).closest('.swiper-slide').find('video')[0];
    video.currentTime = (this.value / 100) * video.duration;
});

// 阻止冒泡
$(document).on('click', '.video-controls', function(e) {
    e.stopPropagation();
    e.preventDefault();
});

// 更新进度
setInterval(function() {
    $('.homepage-skypixel-module .swiper-slide-active').each(function() {
        let video = $(this).find('video')[0];
        if (!video) return;
        
        let progress = (video.currentTime / video.duration) * 100 || 0;
        $(this).find('.ctrl-progress').val(progress);
        
        let currentTime = formatTime(video.currentTime || 0);
        let duration = formatTime(video.duration || 0);
        $(this).find('.ctrl-time').text(`${currentTime} / ${duration}`);
        
        $(this).find('.ctrl-play').text(video.paused ? '▶️' : '⏸️');
    });
}, 100);