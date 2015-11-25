$(document).ready(function() {

  var aChildren = $(".mainNav li").children();
  var aArray = [];
  for (var i=0; i < aChildren.length; i++) {
    var aChild = aChildren[i];
    var ahref = $(aChild).attr('href');
    aArray.push(ahref);
  }

  var timer; //helps to slightly throttle the scroll event

  $(window).scroll(function () {
    var winPos = $(window).scrollTop(); // get current vertical position
    var winHeight = $(window).height(); // get window height
    var docHeight = $(document).height(); // get doc height for last child

    for (var i=0; i < aArray.length; i++) {
      var secID = aArray[i]; // select nav href i
      var secPos = $(secID).offset().top; // get offset of that section from top of page
      var secHeight = $(secID).height(); // get height of that section
      if (winPos >= secPos && winPos < (secPos + secHeight)) { //if looking at that section
        $("a[href='" + secID + "']").addClass("nav-active");
      } else {
        $("a[href='" + secID + "']").removeClass("nav-active");
      }
    }

    // if at the bottom of the page make the last nav li active
    if(winPos + winHeight == docHeight) {
      if (!$("mainNav li:last-child a").hasClass("nav-active")) {
        var navActiveCurrent = $(".nav-active").attr("href");
        $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
        $("nav li:last-child a").addClass("nav-active");
      }
    }

    // starts new timeout if new scroll triggered before first timeout finishes
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(function() {
      console.log( $(window).scrollTop() );
      if ($(window).scrollTop() > (winHeight - 40)) {
        $('.mainNav').addClass('navbar-fixed');
        $('.mainNav').removeClass('navbar-absolute');
      }
      if ($(window).scrollTop() < (winHeight - 39)) {
        $('.mainNav').removeClass('navbar-fixed');
        $('.mainNav').addClass('navbar-absolute');
      }
    }, 10); //delay of 10 ms
  });

});
