$(document).ready(function() {

  var timer; //helps to slightly throttle the scroll event
  var aArray = []; //empty array for getNavHrefs

  var getNavHrefs = function() {
    var aChildren = $(".mainNav li").children();
    for (var i=0; i < aChildren.length; i++) {
      var aChild = aChildren[i];
      var ahref = $(aChild).attr('href');
      aArray.push(ahref);
    }
  };
  getNavHrefs();

  $(window).scroll(function () {
    var winPos = $(window).scrollTop(); // get current vertical position
    var winHeight = $(window).height(); // get window height
    var docHeight = $(document).height(); // get doc height for last child

    // starts new timeout if new scroll triggered before first timeout finishes
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(function() {

      var scrollNav = function() {
        if ($(window).scrollTop() > (winHeight - 40)) {
          $('.mainNav').addClass('navbar-fixed');
          $('.mainNav').removeClass('navbar-absolute');
        }
        if ($(window).scrollTop() < (winHeight - 39)) {
          $('.mainNav').removeClass('navbar-fixed');
          $('.mainNav').addClass('navbar-absolute');
        }
      };
      scrollNav();

      var activeNav = function() {
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

        // if at the bottom of the page make the last nav li active & others inactive
        if(winPos + winHeight == docHeight) {
          if (!$("mainNav li:last-child a").hasClass("nav-active")) {
            var navActiveCurrent = $(".nav-active").attr("href");
            $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
            $("nav li:last-child a").addClass("nav-active");
          }
        }
      };
      activeNav();

    }, 10); //delay of 10 ms
  });

});
