"use strict";

var RWD = navigator.userAgent;
$('body').addClass('onload');

window.onload = function () {
  $('body').addClass('loaded');
  AOS.init({
    offset: 200,
    duration: 800,
    // values from 0 to 3000, with step 50ms
    easing: 'ease' // default easing for AOS animations

  });
};

$(function () {
  var winWidth,
      winHeight = $(window).height(),
      navNow = 0,
      // 選單是否打開，1為打開
  prodNow = 0,
      // 車型選單是否打開，1為打開
  mobile = 0,
      // 手機模式為1
  rwdWidth,
      // 以寬度判斷的rwd 1為手機
  linksHeader = $('.links-header'),
      body = $('body'),
      timeStop = true,
      nowModelMenuIndex = 0; //rwdRealWidth();
  // 選單

  if (RWD.match(/iPhone|iPad|iPod|Android|BlackBerry/i)) {
    mobile = 1;
    body.addClass("mobile");
    timeStop = false;
    menuMobile(); //$('.level-one').on('click', 'li', navLevelOne)
  } else if (RWD.match(/rv:11/i)) {
    mobile = 0;
    body.addClass("desktop ie");
    menuDesktop(); //$('.level-one').on('mouseover', 'li', navLevelOne);
  } else {
    mobile = 0;
    body.addClass("desktop");
    menuDesktop(); //$('.level-one').on('mouseover', 'li', navLevelOne);
  } //產品選單


  var mouseLength = 0,
      pdNav = $('#pd-cat-nav'),
      pdRoll = $('#pd-cat-roll'),
      nowDirection,
      timeGap = 500,
      nowIndex = 0,
      temp; //navSize = pdNav[0].childElementCount - 1;

  $('.select-style').select2({
    minimumResultsForSearch: Infinity
  }); // console.log(navSize);
  // console.log(pdNav);
  // $('#pd-cat-nav a').on('click', function() {
  //     var nownow = $(this).index();
  //     if (nownow < navSize) {
  //         nowIndex = nownow;
  //         pdRoll.find('.pd-cat-item').eq(nownow).addClass('active').siblings().removeClass('active');
  //         pdNav.find('a').eq(nownow).addClass('active').siblings().removeClass('active');
  //     }
  //     //console.log(nownow); 
  //     return false;
  // });
  // document.oncontextmenu = function() {
  //     window.event.returnValue = false; //將滑鼠右鍵事件取消
  // }

  function menuMobile() {
    console.log('是手機');
    $('.menu-second').on('click', 'a', function (e) {
      body.addClass('show-third');
      var nowClick = e.currentTarget.attributes[1].nodeValue;
      console.log(e.currentTarget.attributes[1].nodeValue);
      $('#' + nowClick).addClass('active').siblings('.menu-third').removeClass('active');
      return false;
    });
    $('.back-to-second').on('click', function (e) {
      body.removeClass('show-third');
      $('.menu-third').removeClass('active');
      return false;
    });
    $('.back-to-one').on('click', function (e) {
      body.removeClass('show-sub-nav show-third');
      $('.menu-second a').removeClass('active');
      $('.menu-third').removeClass('active');
      return false;
    });
  }

  function menuDesktop() {
    $('.menu-second').on('mouseover', 'a', function (e) {
      var nowHover = e.currentTarget.attributes[1].nodeValue;
      $(this).addClass('active').siblings('a').removeClass('active');
      $('#' + nowHover).addClass('active').siblings('.menu-third').removeClass('active');
      console.log(e.currentTarget.attributes[1].nodeValue);
    });
  }

  function rollPdNav(e) {
    nowIndex = nowIndex + e; //console.log('送進來了' + nowIndex)

    pdRoll.find('.pd-cat-item').eq(nowIndex).addClass('active').siblings().removeClass('active');
    pdNav.find('a').eq(nowIndex).addClass('active').siblings().removeClass('active');
  }

  pdRoll.on('wheel', function (e) {
    if (timeStop) {
      if (e.originalEvent.deltaY > 0) {
        //nowDirection = +1
        if (nowIndex < navSize - 1) {
          //nowIndex++;
          rollPdNav(1);
        }

        timeStop = false;
      } else {
        if (nowIndex > 0) {
          //nowIndex--;
          rollPdNav(-1);
        } // nowDirection = -1;
        // nowIndex--;


        timeStop = false;
      } //console.log('計時開始');
      //console.log('現在是' + nowIndex)


      setTimeout(function () {
        timeStop = true;
      }, timeGap);
    } else {//console.log('======')
    }
  }); //============================
  //console.log($('.idx-service').offset())

  $('.scrolldown').on('click', function () {
    $('html,body').stop(true, false).animate({
      scrollTop: winHeight
    }, 600);
    return false;
  }); // $('.idx-thinking .btn-scrolldown').on('click', function() {
  //     $('html,body').stop(true, false).animate({
  //             scrollTop: $('.idx-service').offset().top
  //         },
  //         600
  //     );
  //     return false;
  // })

  $('.gotop').on('click', function () {
    $('html,body').stop(true, false).animate({
      scrollTop: 0
    }, 600);
    return false;
  }); //video
  // var videoStrBefore = 'https://www.youtube.com/embed/',
  //     videoItem;

  var videoStrBefore = '<div class="video-wrap"><span class="video-close">close</span><div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/',
      videoStrAfter = '?autoplay=1&mute=0" class="superembed-ignore" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>',
      videoItem;
  $('.btn-play').on('click', function (e) {
    //videoItem = $('.video-wrap iframe');
    var videoID = $(e.target).attr('data-video'),
        videoStr = videoStrBefore + videoID + videoStrAfter; //startPlay = videoStr + '?autoplay=1&mute=0';
    //console.log(videoStr);
    //videoItem.attr('src', startPlay)

    body.append(videoStr);
    body.addClass('video-show');
    setTimeout(function () {
      $('.video-wrap').on('click', '.video-close', function () {
        //console.log('有按到嗎')
        body.removeClass('video-show');
        setTimeout(function () {
          $('.video-wrap').remove();
        }, 300);
      });
    }, 300);
    return false;
  }); // function videoMask(e) {
  //     var e = $(e),
  //         mask = e.find('.playmask'),
  //         videoItem = e.find('.video-wrap iframe'),
  //         startPlay = videoItem[0].src + "&autoplay=1";
  //     mask.on('click', function() {
  //         $(this).fadeOut(700);
  //         videoItem.attr('src', startPlay)
  //         return false
  //     })
  // }
  // $('.backNav').on('click', function() {
  //     $(this).parents('.nav-item').removeClass('active');
  // });

  $('.btn-product-toggle').on('click', function (e) {
    var $this = $(this);

    if ($(e.currentTarget).hasClass('active')) {
      $this.removeClass('active');
      setTimeout(function () {
        pdRoll.find('.pd-cat-item').removeClass('active');
        pdNav.find('a').removeClass('active');
      }, 300);
    } else {
      $this.addClass('active');
      pdNav.find('a').eq(0).addClass('active').siblings().removeClass('active');
      setTimeout(function () {
        pdRoll.find('.pd-cat-item').eq(0).addClass('active').siblings().removeClass('active');
      }, 200);
    }

    body.toggleClass('product-open');
    body.removeClass('nav-open');
    $('#nav-change-text').html('menu');
    navNow = 0;
    return false;
  });
  $('#go-pd-nav').on('click', function () {
    body.addClass('pdsub-open');
    body.removeClass('nav-open product-open');
    return false;
  });
  $('#goback-pd-nav').on('click', function () {
    body.addClass('product-open');
    body.removeClass('nav-open pdsub-open');
    return false;
  });
  $('#btn-nav-toggle').on('click', function () {
    body.toggleClass('nav-open');
    body.removeClass('product-open'); //console.log(navNow);

    if (navNow === 0) {
      //$('#nav-change-text').html('close');
      navNow = 1;
    } else {
      //$('#nav-change-text').html('menu');
      body.removeClass('show-sub-nav');
      navNow = 0;
    }

    return false;
  });
  $('.btn-close-nav-inside').on('click', function () {
    body.removeClass('nav-open');
    body.removeClass('show-sub-nav');
    $('.menu-second a').removeClass('active');
    $('.menu-third').removeClass('active');
    return false;
  }); // 次選單

  $('.js-hassub').on('click', function () {
    body.toggleClass('show-sub-nav');
    return false;
  });
  $('.app').on('click', function () {
    body.toggleClass('show-app');
    return false;
  });
  $('.close-popup').on('click', function () {
    body.removeClass('show-app');
    return false;
  }); //表單

  $('input, textarea').blur(function () {
    var inputValue = $(this).val();

    if (inputValue == "") {
      $(this).removeClass('valid');
    } else {
      $(this).addClass('valid');
    }
  });
  var heroSwiper = new Swiper('.hero-slide', {
    speed: 5000,
    //loop: true,
    autoplay: {
      delay: 5000,
      waitForTransition: false,
      disableOnInteraction: true
    },
    // effect: 'fade',
    // fadeEffect: {
    //     crossFade: true
    // },
    navigation: {
      nextEl: '.hero-next',
      prevEl: '.hero-prev'
    },
    pagination: {
      el: ".page-hero",
      type: 'bullets',
      clickable: true
    },
    //watchSlidesProgress: true,
    virtualTranslate: true,
    on: {
      init: function init() {
        $('.swiper-sum-hero').html(this.slides.length);
        $('.loader-line').addClass('active');
      },
      transitionStart: function transitionStart() {
        //console.log('transitionStart');
        $('.swiper-count-hero').html(this.activeIndex + 1);
      },
      transitionEnd: function transitionEnd() {
        //console.log('transitionEnd');
        $('.swiper-count-hero').html(this.activeIndex + 1);
      },
      slideChange: function slideChange() {//console.log('slideChange');
      },
      slideChangeTransitionStart: function slideChangeTransitionStart() {//console.log('slideChangeTransitionStart');
      },
      slideChangeTransitionEnd: function slideChangeTransitionEnd() {//console.log('slideChangeTransitionEnd');
      },
      autoplay: function autoplay() {
        //console.log('autoplay===================');
        $('.loader-line').toggleClass('active'); //$('.loader-line').addClass('active');
      },
      autoplayStop: function autoplayStop() {
        var _this = this;

        //console.log('autoplayStop');
        setTimeout(function () {
          _this.autoplay.start(); //console.log('重來')


          $('.loader-line').toggleClass('active');
        }, 100);
      }
    }
  }); // 首頁產業應用

  var idxDoctorSwiper = new Swiper('.idx-doctor-slide', {
    speed: 800,
    effect: "fade",
    autoHeight: true,
    loop: true,
    autoplay: {
      delay: 6000,
      waitForTransition: false,
      disableOnInteraction: true
    },
    pagination: {
      el: ".page-idx-doctor",
      type: 'bullets',
      clickable: true
    },
    slidesPerView: 1,
    navigation: {
      nextEl: '.idx-d-next',
      prevEl: '.idx-d-prev'
    },
    on: {
      init: function init() {
        $('.swiper-sum-idxd').html(this.slides.length - 2); //$('.loader-line').addClass('active');
      },
      transitionStart: function transitionStart() {
        //console.log('transitionStart');
        $('.swiper-count-idxd').html(this.realIndex + 1);
      },
      transitionEnd: function transitionEnd() {
        //console.log('transitionEnd');
        $('.swiper-count-idxd').html(this.realIndex + 1);
      }
    } // Responsive breakpoints

  }); // $(window).resize(function() {
  //     applicationSwiper.reInit();
  // })

  var newsSwiper = new Swiper('.news-slide', {
    speed: 1000,
    //loop: true,
    autoplay: {
      delay: 6000,
      waitForTransition: false,
      disableOnInteraction: true
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: '.btn-next-news',
      prevEl: '.btn-prev-news'
    },
    pagination: {
      el: ".page-news",
      type: 'bullets',
      clickable: true
    },
    //watchSlidesProgress: true,
    //virtualTranslate: true,
    on: {
      init: function init() {
        $('.swiper-sum-news').html('0' + this.slides.length);
        $('.loader-line').addClass('active');
      },
      transitionStart: function transitionStart() {
        //console.log('transitionStart');
        $('.swiper-count-news').html(this.activeIndex + 1);
      },
      transitionEnd: function transitionEnd() {
        //console.log('transitionEnd');
        $('.swiper-count-news').html(this.activeIndex + 1);
      },
      slideChange: function slideChange() {//console.log('slideChange');
      },
      slideChangeTransitionStart: function slideChangeTransitionStart() {//console.log('slideChangeTransitionStart');
      },
      slideChangeTransitionEnd: function slideChangeTransitionEnd() {//console.log('slideChangeTransitionEnd');
      },
      autoplay: function autoplay() {
        //console.log('autoplay===================');
        $('.loader-line').toggleClass('active'); //$('.loader-line').addClass('active');
      },
      autoplayStop: function autoplayStop() {
        var _this2 = this;

        //console.log('autoplayStop');
        setTimeout(function () {
          _this2.autoplay.start(); //console.log('重來')


          $('.loader-line').toggleClass('active');
        }, 100);
      }
    }
  }); // banner版型

  var bannerSwiper = new Swiper('.banner-slide', {
    speed: 600,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: ".page-banner",
      type: 'bullets',
      clickable: true
    },
    on: {}
  }); // 關於我們-紀事沿革(這邊建議要做成可重複利用的function)

  var yearNumbers = new Swiper('.year-slide', {
    spaceBetween: 10,
    slidesPerView: 1,
    //freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideThumbActiveClass: 'year-active',
    breakpoints: {
      720: {
        slidesPerView: 4
      }
    },
    navigation: {
      nextEl: '.year-next',
      prevEl: '.year-prev'
    },
    thumbs: {
      swiper: yearContents
    }
  });
  var yearContents = new Swiper('.year-content-slide', {
    speed: 1000,
    navigation: {
      nextEl: '.year-content-next',
      prevEl: '.year-content-prev'
    },
    thumbs: {
      swiper: yearNumbers
    }
  }); // YES-醫師列表 

  var doctorSlide = new Swiper('.doctor-slide', {
    speed: 600,
    slidesPerView: 1,
    loop: true,
    breakpoints: {
      740: {
        slidesPerView: 3,
        centeredSlides: true,
        loop: true
      }
    },
    navigation: {
      nextEl: '.doctor-next',
      prevEl: '.doctor-prev'
    },
    on: {
      init: function init() {
        $('.swiper-sum-doct').html(this.slides.length - 2);
      },
      transitionStart: function transitionStart() {
        //console.log('transitionStart');
        $('.swiper-count-doct').html(this.realIndex + 1);
      },
      transitionEnd: function transitionEnd() {
        //console.log('transitionEnd');
        $('.swiper-count-doct').html(this.realIndex + 1);
      }
    }
  });
  var dgSwiper = {};
  $(".dg-slide").each(function (index, element) {
    var $this = $(this);
    var nowIndex;
    $this.addClass("dg-" + index);
    $this.find(".swiper-pagination").addClass("page-dg-" + index);
    dgSwiper[index] = new Swiper(".dg-" + index, {
      speed: 600,
      slidesPerView: 1,
      loop: true,
      //init: false,
      breakpoints: {
        740: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        1300: {
          slidesPerView: 4,
          spaceBetween: 30
        },
        1700: {
          slidesPerView: 5,
          spaceBetween: 50
        }
      },
      pagination: {
        el: ".page-dg-" + index,
        type: 'bullets',
        clickable: true
      }
    });
  });
  var hpSwiper = {};
  $(".hp-slide").each(function (index, element) {
    var $this = $(this);
    var nowIndex;
    $this.addClass("hp-" + index);
    $this.find(".swiper-pagination").addClass("page-hp-" + index);
    hpSwiper[index] = new Swiper(".hp-" + index, {
      speed: 600,
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: ".page-hp-" + index,
        type: 'bullets',
        clickable: true
      }
    });
  });
  $('.doctor-info').on('click', '.di-toggle', function () {
    // $(this).parents('.di-header').siblings('.di-body').slideToggle("normal", function() {
    //     setTimeout(function() {
    //         //doctorGallerySlide.init();
    //     }, 1000)
    //     console.log("有嗎")
    // });
    $(this).parents('.di-header').toggleClass('open');
    $(this).parents('.doctor-info').toggleClass('open');
  });
  $('.btn-close-di').on('click', function () {
    $(this).parents('.di-body').siblings('.di-header').removeClass('open');
    $(this).parents('.doctor-info').removeClass('open');
  });
  $('.hp-header').on('click', '.hp-toggle', function () {
    //$(this).parents('.hp-header').siblings('.hp-body').slideToggle();
    $(this).parents('.hp-header').toggleClass('open');
    $(this).parents('.hp-item').toggleClass('active');
  });
  $('.btn-close-hp').on('click', function () {
    $(this).parents('.hp-body').siblings('.hp-header').removeClass('open');
    $(this).parents('.hp-item').removeClass('active');
  });
  $('.video-slide').on('click', '.swiper-slide', function (e) {
    var strBefore = "<iframe width=\"560\" height=\"315\" class=\"superembed-force\" src=\"https://www.youtube.com/embed/",
        strAfter = "\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
        url,
        fullStr;
    var ytID = $(e.currentTarget).attr('data-id');
    url = "https://www.youtube.com/embed/" + ytID;
    fullStr = strBefore + ytID + strAfter;
    $('#ytvideo').attr('src', url);
    $(this).addClass('active').siblings().removeClass('active');
    console.log(ytID);
    return false;
  }); // 關於我們-關於我們-經營核心 

  var coreThumbs = new Swiper('.core-slide', {
    spaceBetween: 10,
    slidesPerView: 1,
    //freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideThumbActiveClass: 'core-active',
    breakpoints: {
      740: {
        slidesPerView: 3,
        spaceBetween: 50
      },
      1300: {
        slidesPerView: 4,
        spaceBetween: 60
      }
    },
    navigation: {
      nextEl: '.core-next',
      prevEl: '.core-prev'
    },
    thumbs: {
      swiper: coreContents
    }
  });
  var coreContents = new Swiper('.core-content-slide', {
    speed: 1000,
    navigation: {
      nextEl: '.core-content-next',
      prevEl: '.core-content-prev'
    },
    thumbs: {
      swiper: coreThumbs
    }
  }); // YES 關於我們

  var aboutSlide = new Swiper('.about-slide', {
    speed: 400,
    slidesPerView: 1,
    navigation: {
      nextEl: '.about-next',
      prevEl: '.about-prev'
    },
    pagination: {
      el: ".page-about",
      type: 'bullets',
      clickable: true
    },
    thumbs: {
      swiper: aboutTextSlide
    }
  });
  var aboutTextSlide = new Swiper('.about-text-slide', {
    speed: 400,
    slidesPerView: 1,
    navigation: {
      nextEl: '.about-next',
      prevEl: '.about-prev'
    },
    pagination: {
      el: ".page-about",
      type: 'bullets',
      clickable: true
    },
    thumbs: {
      swiper: aboutSlide
    }
  }); // 關於我們-CSR
  // var idxNewsThumb = new Swiper('.idx-nt-slide', {
  //     speed: 600,
  //     slidesPerView: 1,
  //     // watchSlidesVisibility: true,
  //     // watchSlidesProgress: true,
  //     thumbs: {
  //         swiper: idxNewsContents
  //     }
  // });

  var idxNewsContents = new Swiper('.idx-news-slide', {
    speed: 600,
    pagination: {
      el: ".page-idx-news",
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.idx-news-next',
      prevEl: '.idx-news-prev'
    },
    breakpoints: {
      980: {
        slidesPerView: 2
      },
      1400: {
        slidesPerView: 3
      }
    }
  });
  $('.idx-news-slide').on('mouseenter', '.swiper-slide', function (e) {
    var nowHover = e.currentTarget.dataset.id - 1;
    $('.idx-nt .img-holder').eq(nowHover).addClass('active').siblings().removeClass('active');
  }); //特色

  var fs = [];
  $(".feature-slide").each(function (index, element) {
    var $this = $(this);
    $this.addClass("fs-" + index);
    $this.parents('.popup-content-wrap').find(".fs-prev").addClass("fs-prev" + index);
    $this.parents('.popup-content-wrap').find(".fs-next").addClass("fs-next" + index);
    fs[index] = new Swiper(".fs-" + index, {
      slidesPerView: 1,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.fs-next' + index,
        prevEl: '.fs-prev' + index
      }
    });
  }); //相片簿

  var swiperCsrThumbs = [];
  var swiperCsrGallery = [];
  $(".csr-gallery-thumb").each(function (index, element) {
    var $this = $(this);
    $this.addClass("csr-t-" + index);
    $this.find(".swiper-button-prev").addClass("csr-t-prev-" + index);
    $this.find(".swiper-button-next").addClass("csr-t-next" + index);
    swiperCsrThumbs[index] = new Swiper(".csr-t-" + index, {
      speed: 1000,
      spaceBetween: 10,
      navigation: {
        nextEl: '.csr-next',
        prevEl: '.csr-prev'
      },
      breakpoints: {
        740: {
          slidesPerView: 3
        },
        1100: {
          slidesPerView: 4
        },
        1300: {
          slidesPerView: 4
        },
        1600: {
          slidesPerView: 5
        }
      },
      thumbs: {
        swiper: swiperCsrGallery[index]
      }
    });
  }); //console.log(swiperCsrThumbs);

  $(".csr-gallery").each(function (index, element) {
    var $this = $(this);
    $this.addClass("csr-g-" + index);
    $this.find(".swiper-button-prev").addClass("csr-g-prev" + index);
    $this.find(".swiper-button-next").addClass("csr-g-next" + index);
    swiperCsrGallery[index] = new Swiper(".csr-g-" + index, {
      slidesPerView: 1,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      slideThumbActiveClass: 'csr-active',
      thumbs: {
        swiper: swiperCsrThumbs[index]
      }
    });
  }); //article-slide
  // banner 

  var articleSwiper = new Swiper('.article-slide', {
    speed: 600,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: ".page-article",
      type: 'bullets',
      clickable: true
    },
    on: {}
  });
  var pdRelSlide = new Swiper('.pd-rel-slide', {
    speed: 400,
    spaceBetween: 40,
    slidesPerView: 3,
    pagination: {
      el: ".page-rel",
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      // when window width is >= 480px
      300: {
        slidesPerView: '1',
        spaceBetween: 40
      },
      740: {
        slidesPerView: '3',
        spaceBetween: 40
      }
    }
  });
  var brandSlide = new Swiper('.idx-icon-slide', {
    speed: 400,
    slidesPerView: 2,
    spaceBetween: 40,
    // pagination: {
    //     el: ".page-rel",
    //     type: 'bullets',
    //     clickable: true,
    // },
    breakpoints: {
      // when window width is >= 480px
      740: {
        slidesPerView: 3
      },
      980: {
        slidesPerView: 5
      },
      1100: {
        slidesPerView: 5
      }
    }
  });
  var historySwiper = new Swiper('.history-slide', {
    speed: 400,
    slidesPerView: 'auto',
    spaceBetween: 30,
    freeMode: true,
    scrollbar: {
      el: '.scrollbar-history',
      draggable: true
    },
    breakpoints: {
      // when window width is >= 480px
      740: {
        spaceBetween: 40
      },
      // when window width is >= 640px
      1300: {
        spaceBetween: 50
      },
      1580: {
        spaceBetween: 60
      }
    }
  }); // qrcode

  var qrcodeHTML_before = "<div class=\"popup popup-qrcode\"><div class=\"qrcode-wrap\"><span class=\"close-popup\">關閉</span><div class=\"content\">",
      qrcodeHTML_after = "</div></div></div>",
      qrcodeSTR = "";
  $('.show-qrcode').on('click', function (e) {
    var dataQR = e.currentTarget.dataset,
        linkStr,
        nameStr;

    if ($(this).hasClass('official')) {
      nameStr = "<h5 class=\"name official\"><strong>";
    } else {
      nameStr = "<h5 class=\"name\"><strong>";
    }

    if (dataQR.link) {
      linkStr = "<a href=\"" + dataQR.link + "\" class=\"btn flex\">醫師資訊</a>";
    } else {
      linkStr = "";
    }

    // qrcodeSTR = qrcodeHTML_before + "<div class=\"doctor\"><img src=\"" + dataQR.img + "\"></div>" + nameStr + dataQR.name + "</strong> <span>醫師</span></h5>" + "<div class=\"qrcode\"> <img src=\"" + dataQR.qrcode + "\"></div>" + linkStr + qrcodeHTML_after;
    qrcodeSTR = qrcodeHTML_before + "<div class=\"doctor\"><img src=\"" + dataQR.img + "\"></div>" + '<table><tbody><tr><td><h5 class="name official"><strong>惠文診所</strong> <span>醫師</span></h5></td><td><h5 class="name official"><strong>中科診所</strong> <span>醫師</span></h5></td></tr><tr><td><div class="qrcode"> <a href="https://lin.ee/1Urt1Mk" target="_blank"><img src="images/demo/qrcode2.png"></a></div></td><td><div class="qrcode"> <a href="https://lin.ee/hN2XZOHH" target="_blank"><img src="images/demo/qrcode1.png"></a></div></td></tr></tbody></table>';
    $('.pages').after(qrcodeSTR);
    $('body').addClass("show-popup-qrcode");
    $('.close-popup').on('click', function () {
      $('body').removeClass('show-popup-qrcode');
      setTimeout(function () {
        $('.popup-qrcode').remove();
      }, 500);
      return false;
    });
    return false;
  });
  var swiperInstances = {};
  $(".normal-slide").each(function (index, element) {
    var $this = $(this);
    var nowIndex;
    $this.addClass("instance-n-" + index);
    $this.find(".swiper-button-prev").addClass("btn-prev-n-" + index);
    $this.find(".swiper-button-next").addClass("btn-next-n-" + index);
    $this.find(".swiper-idx-sum").addClass("swiper-sum-n-" + index);
    $this.find(".swiper-idx-count").addClass("swiper-count-n-" + index);
    $this.find(".loader").addClass("loader-n-" + index);
    $this.find(".swiper-pagination").addClass("page-n-" + index);
    swiperInstances[index] = new Swiper(".instance-n-" + index, {
      // your settings ...
      speed: 600,
      autoplay: {
        delay: 6000,
        disableOnInteraction: true
      },
      effect: 'fade',
      // navigation: {
      //     nextEl: ".btn-next-" + index,
      //     prevEl: ".btn-prev-" + index,
      // },
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: ".page-n-" + index,
        type: 'bullets',
        clickable: true
      },
      on: {
        init: function init() {
          //console.log('swiper initialized');
          // console.log($(this.el));
          $('.swiper-sum-n-' + index).html('0' + this.slides.length);
          $('.loader-n-' + index).addClass('active'); //$('.loader-' + index).addClass('active');
          //$this.addClass('line-animation');
          // nowClick = this;
          // console.log(nowClick);
        },
        transitionStart: function transitionStart() {
          //console.log('transitionStart');
          $('.swiper-count-n-' + index).html(this.activeIndex + 1); ////('物件' + index + '---transitionStart');
        },
        transitionEnd: function transitionEnd() {
          //console.log('transitionEnd');
          $('.loader-n-' + index).addClass('active');
          $('.swiper-count-n-' + index).html(this.activeIndex + 1);
          $this.removeClass('line-animation');
        },
        slideChange: function slideChange() {
          //console.log('transitionEnd');
          $('.loader-n-' + index).removeClass('active');
          $this.addClass('line-animation');
        },
        autoplay: function autoplay() {//console.log('autoplay');
        },
        autoplayStop: function autoplayStop() {
          //console.log('autoplayStop');
          setTimeout(function () {
            swiperInstances[index].autoplay.start(); //console.log('重來')
          }, 500);
        }
      }
    });
  });
  var swiperNavInstances = {};
  $(".nav-prd-slide").each(function (index, element) {
    var $this = $(this);
    $this.addClass("instance-p-" + index);
    $this.find(".swiper-button-prev").addClass("btn-prev-p-" + index);
    $this.find(".swiper-button-next").addClass("btn-next-p-" + index);
    $this.find(".swiper-idx-sum").addClass("swiper-sum-p-" + index);
    $this.find(".swiper-idx-count").addClass("swiper-count-p-" + index);
    $this.find(".loader").addClass("loader-p-" + index);
    $this.find(".swiper-pagination").addClass("page-p-" + index);
    swiperNavInstances[index] = new Swiper(".instance-p-" + index, {
      // your settings ...
      speed: 600,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      effect: 'fade',
      // navigation: {
      //     nextEl: ".btn-next-" + index,
      //     prevEl: ".btn-prev-" + index,
      // },
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: ".page-p-" + index,
        type: 'bullets',
        clickable: true
      },
      on: {
        init: function init() {
          //console.log('swiper initialized');
          // console.log($(this.el));
          $('.swiper-sum-p-' + index).html('0' + this.slides.length);
          $('.loader-p-' + index).addClass('active'); //$this.addClass('line-animation');
          // nowClick = this;
          // console.log(nowClick);
        },
        transitionStart: function transitionStart() {
          $('.swiper-count-p-' + index).html(this.activeIndex + 1); //console.log('物件' + index + '---transitionStart');
        },
        transitionEnd: function transitionEnd() {
          // console.log(this.el);
          //console.log('物件' + index + '---transitionEnd');
          $('.loader-p-' + index).addClass('active');
          $('.swiper-count-p-' + index).html(this.activeIndex + 1);
          $this.removeClass('line-animation');
        },
        slideChange: function slideChange() {
          //console.log(this);
          //console.log('slideChange start');
          //console.log('物件' + index + '---slideChange');
          $('.loader-p-' + index).removeClass('active');
          $this.addClass('line-animation');
        } // autoplayStop: function() {
        // },
        // autoplay: function() {
        // }

      }
    });
  }); // bind change event to select

  $('#langChange').on('change', function () {
    var url = $(this).val(); // get selected value

    if (url) {
      // require a URL
      window.location = url; // redirect
    }

    return false;
  }); // $('.accordion-item').on('click', '.accordion-btn', function() {
  //     $(this).siblings('.accordion-content').slideToggle();
  //     $(this).parents('.accordion-item').toggleClass('open');
  //     $(this).parents('.accordion-item').siblings('li').find('.accordion-content').slideUp();
  // })

  var controller = new ScrollMagic.Controller();
  var scene = new ScrollMagic.Scene({
    triggerElement: ".page",
    //triggerHook: .6,
    duration: 100
  }).setClassToggle(".dyh", "release") // add class toggle
  .addTo(controller);
  $('.pd-item').each(function () {
    var scene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: "onEnter"
    }).setClassToggle(this, "fadein") // add class toggle
    .addTo(controller);
  });
  $('.dist-item').on('click', '.dist-header', function () {
    $(this).parents('.dist-item').toggleClass('active');
  }); // section區塊

  if (mobile !== 1) {
    $(".section").each(function (i) {
      var $this = $(this); //console.log($this);

      var tls = new TimelineMax().add([TweenMax.fromTo($this.find('.content-wrap'), 1, {
        opacity: 0,
        x: 40
      }, {
        opacity: 1,
        x: 0,
        ease: Power2.easeInOut
      }), TweenMax.fromTo($this.find('.controller'), 1.1, {
        opacity: 0,
        x: 30
      }, {
        opacity: 1,
        x: 0,
        delay: 1,
        ease: Power2.easeInOut
      }), // TweenMax.fromTo($this.find('.text'), 1.1, {
      //     opacity: 0,
      //     x: 30
      // }, {
      //     opacity: 1,
      //     x: 0,
      //     delay: 1.2,
      //     ease: Power2.easeOut
      // }),
      TweenMax.fromTo($this.find('.history-slide'), 1.1, {
        opacity: 0,
        x: 30
      }, {
        opacity: 1,
        x: 0,
        delay: 1.2,
        ease: Power2.easeOut
      })]);
      i++;
      var scene = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: .8 //duration: 200

      }).setClassToggle(this, "loaded") // add class toggle
      .setTween(tls).addTo(controller);
    });
  } //about


  if ($('.about-num')) {
    //console.log('有');
    var aboutScene = new ScrollMagic.Scene({
      triggerElement: ".about-num",
      //triggerHook: .6,
      duration: 300
    }).setTween(".about-num .canvas", {
      y: "-8%"
    }).setClassToggle(this, "animation") // add class toggle
    .addTo(controller);
    aboutScene.on("enter", function (event) {
      //console.log("開始計算");
      $('.num-count').each(function (index, element) {
        // 切換年度後，countup 動畫
        var count = $(this).data('count'),
            myid = $(this).data('id'),
            duration = $(this).data('time');
        animateValue(myid, 0, count, duration);
      });
    });
  } else {//console.log('沒有')
  }
});

function animateValue(id, start, end, duration) {
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.getElementById(id);
  var timer = setInterval(function () {
    current += increment;
    obj.innerHTML = current;

    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
} //tabShow($('.tabshow'));


function tabShow(e) {
  var e = $(e),
      tabNow = 0,
      tabNav = e.find('.tabshow-nav'),
      tavContent = e.find('.tabshow-content'),
      activeItem = tabNav.find('.active'),
      activePos = activeItem.offset().left; //tabNav.scrollLeft(activePos);
  //activePos
  //console.log(activePos);

  tabNav.on('click', '.tab', function () {
    //console.log($(this).index());
    var nowClick = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    tavContent.find('.tab').eq(nowClick).addClass('active').siblings().removeClass('active'); //tavContent.find('.tab').eq(nowClick).find('.superembed-ignore').removeClass('superembed-ignore');
    //tabContentSwiper.slideTo(nowClick);
    // setTimeout(function() {
    //     superEmbed();
    //     console.log('fire again')
    // }, 2000);

    tabNow = nowClick;
    return false;
  });
} //服務項目


(function () {
  'use strict'; // breakpoint where swiper will be destroyed
  // and switches to a dual-column layout

  var breakpoint = window.matchMedia('(min-width:576px)'); // keep track of swiper instances to destroy later

  var mySwiper; //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  var breakpointChecker = function breakpointChecker() {
    // if larger viewport and multi-row layout needed
    if (breakpoint.matches === true) {
      // clean up old instances and inline styles when available
      if (mySwiper !== undefined) mySwiper.destroy(true, true); // or/and do nothing

      return; // else if a small viewport and single column layout needed
    } else if (breakpoint.matches === false) {
      // fire small viewport version of swiper
      return enableSwiper();
    }
  }; //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////


  var enableSwiper = function enableSwiper() {
    mySwiper = new Swiper('.service-slide', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      a11y: true,
      keyboardControl: true,
      grabCursor: true,
      // pagination
      pagination: {
        el: ".page-service",
        type: 'bullets',
        clickable: true
      },
      paginationClickable: true
    });
  }; //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  // keep an eye on viewport size changes


  breakpoint.addListener(breakpointChecker); // kickstart

  breakpointChecker();
})();
/* IIFE end */
// Vanilla version of FitVids
// Still licencened under WTFPL
//
// Not as robust and fault tolerant as the jQuery version.
// It's BYOCSS.
// And also, I don't support this at all whatsoever.


(function (window, document, undefined) {
  "use strict"; // List of Video Vendors embeds you want to support

  var players = ['iframe[class="superembed-ignore"]']; // Select videos

  var fitVids = document.querySelectorAll(players.join(",")); // If there are videos on the page...

  if (fitVids.length) {
    // Loop through videos
    for (var i = 0; i < fitVids.length; i++) {
      // Get Video Information
      var fitVid = fitVids[i];
      var width = fitVid.getAttribute("width");
      var height = fitVid.getAttribute("height");
      var aspectRatio = height / width;
      var parentDiv = fitVid.parentNode; // Wrap it in a DIV

      var div = document.createElement("div");
      div.className = "fitVids-wrapper";
      div.style.paddingBottom = aspectRatio * 100 + "%";
      parentDiv.insertBefore(div, fitVid);
      fitVid.remove();
      div.appendChild(fitVid); // Clear height/width from fitVid

      fitVid.removeAttribute("height");
      fitVid.removeAttribute("width");
    }
  }
})(window, document);