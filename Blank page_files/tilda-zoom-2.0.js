function t_initZoom() {
    // for debug
    $('body').append(
        '<style>' +
        '.t-zoomer_animated-tranform {' +
            '-webkit-transition: transform ease-in-out .3s;' +
            '-moz-transition: transform ease-in-out .3s;' +
            '-o-transition: transform ease-in-out .3s;' +
            'transition: transform ease-in-out .3s' +
        '}' +
        '.t-zoomer_animated-opacity {' +
            '-webkit-transition: opacity ease-in-out .3s;' +
            '-moz-transition: opacity ease-in-out .3s;' +
            '-o-transition: opacity ease-in-out .3s;' +
            'transition: opacity ease-in-out .3s' +
        '}' +
        '</style>'
    );
    // ---

    if ($('[data-zoomable="yes"]').length) {
        window.tzoominited = true;
        $('[data-zoomable="yes"]:not(.t-slds__thumbs_gallery)').addClass("t-zoomable");
        $("body").append('<div class="t-zoomer__wrapper">\
            <div class="t-zoomer__container">\
            </div>\
            <div class="t-zoomer__bg"></div>\
            <div class="t-zoomer__close">\
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">\
                    <path d="M1.41421 -0.000151038L0 1.41406L21.2132 22.6273L22.6274 21.2131L1.41421 -0.000151038Z" fill="black"/>\
                    <path d="M22.6291 1.41421L21.2148 0L0.00164068 21.2132L1.41585 22.6274L22.6291 1.41421Z" fill="black"/>\
                </svg>\
            </div>\
            </div>');
        if (!window.isMobile) {
            $('.t-zoomer__wrapper').append('<div class="t-zoomer__scale showed">\
            <svg class="icon-increase" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
                <path d="M22.832 22L17.8592 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/>\
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.58591 3.7511C0.917768 7.41924 0.917768 13.367 4.58591 17.0352C8.25405 20.7033 14.2019 20.7033 17.87 17.0352C21.5381 13.367 21.5381 7.41924 17.87 3.7511C14.2019 0.0829653 8.25405 0.0829653 4.58591 3.7511Z" stroke="black" stroke-width="2"/>\
                <path d="M6.25781 10.3931H16.2035" stroke="black" stroke-width="2"/>\
                <path d="M11.2305 15.3662V5.42053" stroke="black" stroke-width="2"/>\
            </svg>\
            <svg class="icon-decrease" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
                <path d="M21.9961 22L17.0233 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/>\
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.74997 3.7511C0.0818308 7.41924 0.0818308 13.367 3.74997 17.0352C7.41811 20.7033 13.3659 20.7033 17.0341 17.0352C20.7022 13.367 20.7022 7.41924 17.0341 3.7511C13.3659 0.0829653 7.41811 0.0829653 3.74997 3.7511Z" stroke="black" stroke-width="2"/>\
                <path d="M5.41797 10.3931H15.3637" stroke="black" stroke-width="2"/>\
            </svg>\
        </div>');
        }
        $('.t-records').on('click', '.t-zoomable', t_zoomHandler);
        $('.t-records').on('click', '.t-slds__thumbs_gallery', t_zoomHandler);
        $('.t-zoomer__close, .t-zoomer__bg').click(t_zoom_closeHandler);
    }
}

function t_zoom_scrollImages(distance, percentage, ret) {
    if (distance < 0) {
        return;
    }

    if (ret) {
        $('.t-carousel__zoomer__img').addClass('t-zoomer_animated-tranform');

        $('.t-carousel__zoomer__control_left').addClass('t-zoomer_animated-tranform');
        $('.t-carousel__zoomer__control_right').addClass('t-zoomer_animated-tranform');

        $('.t-zoomer__scale').addClass('t-zoomer_animated-tranform');
        $('.t-zoomer__close').addClass('t-zoomer_animated-tranform');

        $('.t-zoomer__bg').addClass('t-zoomer_animated-opacity');
    }
    var k = Math.abs(percentage / 100) // k is a movement factor
    var dist = 200;         // max distance in pixels

    $('.t-carousel__zoomer__control_left').css('transform', 'translateX(' + -k * dist + 'px)');
    $('.t-carousel__zoomer__control_right').css('transform', 'translateX(' + k * dist + 'px)');
    
    $('.t-zoomer__close').css('transform', 'translateX(' + k * dist + 'px)');
    $('.t-zoomer__scale').css('transform', 'translateX(' + k * dist + 'px)');

    $(".t-carousel__zoomer__img").css('transform', "translateY(" + distance + "px)");

    $(".t-zoomer__bg").css('opacity', 100 - k * 100 + '%');

    if (ret) {
        setTimeout(function() {
            $(".t-carousel__zoomer__img").removeClass('t-zoomer_animated-tranform');
            
            $('.t-carousel__zoomer__control_left').removeClass('t-zoomer_animated-tranform');
            $('.t-carousel__zoomer__control_right').removeClass('t-zoomer_animated-tranform');

            $('.t-zoomer__scale').removeClass('t-zoomer_animated-tranform');
            $('.t-zoomer__close').removeClass('t-zoomer_animated-tranform');

            $('.t-zoomer__bg').removeClass('t-zoomer_animated-opacity');
        }, 300);
    }
}

function t_zoom_swipeClose(hammer, el) {
    t_zoom_scrollImages($(window).innerHeight(), 100, true);

    el.data('swipeClose', 'y');

    $('.t-zoomer__close').css('transform', 'translateX(0px)');
    $('.t-zoomer__scale').css('transform', 'translateX(0px)');

    $('.t-carousel__zoomer__control_left').css('transform', 'translateX(0px)');
    $('.t-carousel__zoomer__control_right').css('transform', 'translateX(0px)');

    $(".t-zoomer__bg").css('opacity', '100%');

    hammer.off('pan');
    hammer.off('panend');

    t_zoom_close();
}

function t_zoom_initZoomerSwipe() {
    delete Hammer.defaults.cssProps.userSelect;
        
    var el = $('.t-carousel__zoomer__item.active').find('.t-carousel__zoomer__img');
    var hammer = new Hammer(el[0], {inputClass: Hammer.TouchInput});
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    hammer.on('pan', function(event) {
        var distance = event.deltaY,
            percentage = 100 * event.deltaY / $(window).innerHeight(),
            sensitivity = 40;

        t_zoom_scrollImages(distance, percentage);
        if (event.isFinal) {
            if (event.velocityY > 0.4) {
                t_zoom_swipeClose(hammer, el);
            } else {
                if (percentage <= -sensitivity) {
                    t_zoom_swipeClose(hammer, el);
                }
            }
        }
    });

    hammer.on('panend', function() {
        if (el.data('swipeClose') !== 'y') {
            el.data('swipeClose', 'n');
            t_zoom_scrollImages(0, 0, true);      // return to initial state
        }
    });
}


function t_zoom_slideMove(rec, withoutNewInterval, sliderOptions) {
    var el = typeof rec === 'object' ? rec : $('#rec' + rec),
        sliderWrapper = el.find('.t-container'),
        zoomerHeight = el.find('.t-container').height(),
        sliderTransition = parseFloat(sliderWrapper.attr('data-slider-transition'), 10) || 100;

    sliderWrapper.css({
        transform: 'translateY(-' + zoomerHeight + 'px)'
    });

    setTimeout(function() {
        sliderWrapper.css({
            transform: 'translateY(-' + zoomerHeight + 'px)'
        });
    }, sliderTransition);
}


function t_zoom_closeHandler() {
    t_zoom_close();
    var isPopupShown = $(document).find('.t-popup_show').length != 0;
    if (isPopupShown) {
        $(document).keydown(function (e) {
            if (e.keyCode == 27) {
                if (window.t_store_closePopup !== undefined) {
                    t_store_closePopup(false);
                }
            }
        });
    }
}

function t_zoom_scaleHandler(e) {
    var isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
        return;
    }

    var zoomedImage = $('.t-carousel__zoomer__item.active .t-carousel__zoomer__img');
    var zoomedWrapper = $('.t-zoomer__wrapper');
    var zoomerInner = $('.t-carousel__zoomer__inner');

    if (zoomedWrapper.hasClass('scale-active')) {
        t_zoom_unscale();
    } else {
        zoomedWrapper.addClass('scale-active');
        zoomerInner.addClass('scale-active');
        t_zoom_cursor_out();

        var leftCoordinate = ($(window).width() - zoomedImage.width()) / 2;
        var topCoordinate = ($(window).height() - zoomedImage.height()) / 2;

        zoomedImage.css('left', leftCoordinate);
        zoomedImage.css('top', topCoordinate);

        var clientYpercent;
        var imageYpx;
        var clientXpercent;
        var imageXpx;

        if ($(window).width() < zoomedImage[0].naturalWidth) {
            clientXpercent = (e.clientX * 100) / $(window).width();
            imageXpx = -(clientXpercent * (zoomedImage.width() - $(window).width())) / 100;
            zoomedImage.css('left', imageXpx + 'px');
            zoomedImage.on(window.isMobile ? 'touchmove' : 'mousemove', function (e) {
                clientXpercent = (e.originalEvent.touches !== undefined ? e.originalEvent.touches[0].clientX : e.clientX) * 100 / $(window).width();
                imageXpx = -(clientXpercent * (zoomedImage.width() - $(window).width())) / 100;
                zoomedImage.css('left', imageXpx + 'px');
            });
        }

        if ($(window).height() < zoomedImage[0].naturalHeight) {
            clientYpercent = (e.clientY * 100) / $(window).height();
            imageYpx = -(clientYpercent * (zoomedImage.height() - $(window).height())) / 100;
            zoomedImage.css('top', imageYpx + 'px');
            zoomedImage.on(window.isMobile ? 'touchmove' : 'mousemove', function (e) {
                clientYpercent = (e.originalEvent.touches !== undefined ? e.originalEvent.touches[0].clientY : e.clientY) * 100 / $(window).height();
                imageYpx = -(clientYpercent * (zoomedImage.height() - $(window).height())) / 100;
                zoomedImage.css('top', imageYpx + 'px');
            });
        }
    }
}


function t_zoomHandler() {
    $('body').addClass('t-zoomer__show');
    $('.t-zoomer__container').html('\
    <div class="t-carousel__zoomed">\
        <div class="t-carousel__zoomer__slides">\
        <div class="t-carousel__zoomer__inner">\
        </div>\
        <div class="t-carousel__zoomer__control t-carousel__zoomer__control_left" data-zoomer-slide="prev">\
            <div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_left">\
            <div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_left t-carousel__zoomer__arrow_small"></div>\
            </div>\
        </div>\
        <div class="t-carousel__zoomer__control t-carousel__zoomer__control_right" data-zoomer-slide="next">\
            <div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_right">\
            <div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_right t-carousel__zoomer__arrow_small"></div>\
            </div>\
        </div>\
        </div>\
    </div>');

    var id = $(this).closest('.r').attr('id');
    var images = $('#' + id).find('.t-zoomable:not(.t-slds__thumbs_gallery)');
    if ($('#' + id).find('.t-slds').length) {
        var slider = $(this).closest('.t-slds');
        if (slider.length) {
            images = slider.find('.t-zoomable:not(.t-slds__thumbs_gallery)');
        }
    }

    images.each(function (i, image) {
        var imgtitle = '';
        var imgdescr = '';
        var titlebody = '';
        var descrbody = '';
        var images_urls = $(image).attr('data-img-zoom-url').split(',');

        if ($(image).is('img') || $(image).is('div')) {
            imgtitle = $(image).attr('title') || '';
            imgdescr = $(image).attr('data-img-zoom-descr') || '';
        }

        if (imgtitle !== '') {
            titlebody = '<div class="t-zoomer__title t-name t-descr_xxs">' + imgtitle + '</div>';
        }

        if (imgdescr !== '') {
            descrbody = '<div class="t-zoomer__descr t-descr t-descr_xxs">' + imgdescr + '</div>';
        }

        $('.t-carousel__zoomer__inner').append('\
        <div class="t-carousel__zoomer__item">\
        <div class="t-carousel__zoomer__wrapper">\
            <img class="t-carousel__zoomer__img" src="' + images_urls + '"></div>\
            <div class="t-zoomer__comments">' + titlebody + descrbody + '</div>\
        </div>');
    });

    var image_descr = $('.t-carousel__zoomer__item');
    image_descr.each(function (i, image) {
        $(image).css('display', 'block');
        var zoomerComments = $(image).find('.t-zoomer__comments');
        var zoomerTitle = zoomerComments.find('.t-zoomer__title');
        var zoomerDescr = zoomerComments.find('.t-zoomer__descr');
        if (zoomerTitle === '' && zoomerDescr === '') {
            zoomerComments.css('padding', '0');
        }
        var height = zoomerComments.innerHeight();
        $(image).css('display', '');
        var image_active = $(image).find('.t-carousel__zoomer__wrapper');
        image_active.css('bottom', height);
    });

    var target_url = $(this).attr('data-img-zoom-url');
    var target_img = $('.t-carousel__zoomer__img[src="' + target_url + '"]');
    var slideItem = $('.t-carousel__zoomer__item');
    target_img.closest(slideItem).addClass('active');

    slideItem.each(function (index, item) {
        $(item).attr('data-zoomer-slide-number', index);
    });

    var pos = parseInt($('.t-carousel__zoomer__item:visible').attr('data-zoomer-slide-number'), 10);
    $('.t-carousel__zoomer__control_right').click(function () {
        t_zoom_unscale()

        pos = (pos + 1) % slideItem.length;
        slideItem.removeClass('active').eq(pos).addClass('active');
        t_zoom_checkForScale();
    });

    $('.t-carousel__zoomer__control_left').click(function () {
        t_zoom_unscale()

        pos = (pos - 1) % slideItem.length;
        slideItem.removeClass('active').eq(pos).addClass('active');
        t_zoom_checkForScale();
    });

    $(document).unbind('keydown');
    $(document).keydown(function (e) {
        if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 27) {
            t_zoom_unscale();

            var key = {
                37: (pos - 1),
                39: (pos + 1),
            }

            pos = key[e.keyCode] % slideItem.length;

            slideItem.removeClass('active').eq(pos).addClass('active');
            t_zoom_checkForScale();
        }

        if (e.keyCode == 27) {
            t_zoom_close();
            var isPopupShown = $(document).find('.t-popup_show').length > 0;
            if (isPopupShown) {
                $(document).keydown(function (e) {
                    if (e.keyCode == 27) {
                        t_store_closePopup(false);
                    }
                });
            }
        }
    });

    var slides_count = $('.t-carousel__zoomer__item').size();
    $('body').addClass('t-zoomer__show_fixed');
    if (slides_count == 1) {
        $('.t-carousel__zoomer__control').css('display', 'none');
    }

    $('.t-carousel__zoomer__inner').click(function () {
        if ($(this).hasClass('scale-active')) {
            t_zoom_cursor_in();
            t_zoom_unscale();
        } else if ($('.t-zoomer__scale').attr('data-zoom-scaled') === 'y') {
            $('.t-zoomer__scale').trigger('click');
        }
         else {
            t_zoom_close();
        } 
    });

    t_zoom_checkForScale();
}

function t_zoom_checkForScale() {
    var eventAdded = false;
    var zoomedImage = $('.t-carousel__zoomer__item.active .t-carousel__zoomer__img:not(.loaded)');

    if (!zoomedImage.length) {
        return;
    }

    // on first gallery open wait image load
    zoomedImage.load(function () {
        if (eventAdded) {
            return;
        }
        if ($(window).width() < zoomedImage[0].naturalWidth || $(window).height() < zoomedImage[0].naturalHeight) {
            zoomedImage.addClass('loaded');
            t_zoom_scale_init();
            return;
        }
    });

    // on second gallery open
    if (zoomedImage[0].complete && !eventAdded) {
        eventAdded = true;

        if ($(window).width() < zoomedImage[0].naturalWidth) {
            t_zoom_scale_init();
            return;
        } else {
            t_zoom_cursor_out();

            $('.t-zoomer__scale').css('display', '');
            $('.t-zoomer__scale').attr('data-zoom-scaled', 'n');
        }

        if ($(window).height() < zoomedImage[0].naturalHeight) {
            t_zoom_scale_init();
            return;
        } else {
            t_zoom_cursor_out();

            $('.t-zoomer__scale').css('display', '');
            $('.t-zoomer__scale').attr('data-zoom-scaled', 'n');
        }
    }
}

function t_zoom_scale_init() {
    t_zoom_initZoomerSwipe();

    $('.t-zoomer__scale').css('display', 'block');

    t_zoom_cursor_in();

    $('.t-zoomer__scale').attr('data-zoom-scaled', 'y');
    if ($('.t-zoomer__scale').attr('data-zoom-scale-init') !== 'y') {
        $('.t-zoomer__scale').attr('data-zoom-scale-init', 'y');
        $('.t-zoomer__wrapper').on('click', '.t-zoomer__scale', t_zoom_scaleHandler);
    }
}

function t_zoom_close() {
    t_zoom_unscale();
    $('body').removeClass('t-zoomer__show t-zoomer__show_fixed');
    $(document).unbind('keydown');
}

function t_zoom_unscale() {
    $('.t-zoomer__wrapper.scale-active, .t-carousel__zoomer__inner').removeClass('scale-active');
    var zoomedImage = $('.t-carousel__zoomer__item.active .t-carousel__zoomer__img');
    zoomedImage.off('mousemove touchmove').css('left', '').css('top', '');
}

function t_zoom_cursor_in() {
    $('.t-zoomer__bg').css('cursor', 'zoom-in');
    $('.t-carousel__zoomer__img').css('cursor', 'zoom-in');
    $('.t-carousel__zoomer__inner').css('cursor', 'zoom-in');
}

function t_zoom_cursor_out() {
    $('.t-zoomer__bg').css('cursor', 'zoom-out');
    $('.t-carousel__zoomer__img').css('cursor', 'zoom-out');
    $('.t-carousel__zoomer__inner').css('cursor', 'zoom-out');
}

$(document).ready(function () {
    t_initZoom();
});