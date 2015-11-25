$(document).ready(function() {


  $(window).scroll(function () {
    var timer;
    var winH = $(window).height();

    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(function() {
      if ($(window).scrollTop() > (winH - 40)) {
        $('.mainNav').addClass('navbar-fixed');
        $('.mainNav').removeClass('navbar-absolute');
      }
      if ($(window).scrollTop() < (winH - 39)) {
        $('.mainNav').removeClass('navbar-fixed');
        $('.mainNav').addClass('navbar-absolute');
      }
    });
  });

});
