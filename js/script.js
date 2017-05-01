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
    var scrollPos = $(window).scrollTop(); // get current vertical position
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
          var secPos = $(secID).offset().top - 41; // get offset of that section from top of page - nav-height
          var secHeight = $(secID).height() + 120; // get height of that section + padding-bottom
          if (scrollPos >= secPos && scrollPos < (secPos + secHeight)) { //if looking at that section
            $("a[href='" + secID + "']").addClass("nav-active");
          } else {
            $("a[href='" + secID + "']").removeClass("nav-active");
          }
        }

        // if at the bottom of the page make the last nav li active & others inactive
        if(scrollPos + winHeight == docHeight) {
          if (!$("mainNav li:last-child a").hasClass("nav-active")) {
            var navActiveCurrent = $(".nav-active").attr("href");
            $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
            $("nav li:last-child a").addClass("nav-active");
          }
        }
      };
      activeNav();

    }, 15); //delay of 10 ms
  });

  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 40 // minus nav-height
          }, 500);
          return false;
        }
      }
    });
  });

  $( '#splash' ).mousemove( function( e ) {
    $( '.splashHero').parallax( -20, e );
    $( '.intro' ).parallax( 10, e );
  });

  // jquery mouse parallax plugin https://github.com/giuseppesalvo/jquery-mouse-parallax
  $.fn.parallax = function ( resistance, mouse )
  {
    $el = $( this );
    TweenLite.to( $el, 0.2, {
      x : -(( mouse.clientX - (window.innerWidth/2) ) / resistance ),
      y : -(( mouse.clientY - (window.innerHeight/2) ) / resistance )
    });
  };

  $('.modalTrigger').click(openModal);

  $('.modalClose').click(closeModal);

  $(document).keyup(function(event) {
    event.preventDefault();
    var KEYCODE_ESC = 27;
    if (event.keyCode === KEYCODE_ESC && modOpen) closeModal(event);
  });

  // modal state
  var modOpen = false;
  var modScrollPos = 0;

  function openModal(event) {
    event.preventDefault();
    var project = projects[$(this).attr('name')];
    modScrollPos = $(window).scrollTop();
    $('#modalWebpSrc').attr('srcset', project.imageUrl);
    $('#modalJpgSrc').attr('srcset', project.imageFallbackUrl);
    $('#modalImage').attr('src', project.imageFallbackUrl);
    $('#modalTech').text(project.techUsed);
    $('#modalDescription').text(project.description);
    $('#modalLive').attr('href', project.liveUrl)
    $('#modalGithub').attr('href', project.githubUrl)
    $('#modal').show();
    modOpen = true;
  }

  function closeModal(event) {
    event.preventDefault();
    $(window).scrollTop(modScrollPos);
    $('#modal').hide();
    modOpen = true;
  }
});

var projects = {
  gitterClone: {
    imageUrl: 'images/gitter-clone.gif',
    imageFallbackUrl: 'images/gitter-clone.gif',
    techUsed: 'React, Redux, Webpack, Express, SASS, MongoDB, Jest, SemaPhoreCI, DigitalOcean',
    description: 'This is universal app was built as portfolio piece representing a subset of the features of Troupe Technology\'s wonderful chat app, Gitter. Check out the github repo to learn more!',
    liveUrl: 'https://gitter-clone.tk',
    githubUrl: 'https://github.com/tylercrosse/gitter-clone'
  },
  shortener: {
    imageUrl: 'images/shortener.webp',
    imageFallbackUrl: 'images/shortener.jpg',
    techUsed: 'React, ES6, Express, SASS, MongoDB, DigitalOcean',
    description: 'bitly URL Shortener clone built in React.',
    liveUrl: 'http://104.131.109.177:3000/',
    githubUrl: 'https://github.com/tylercrosse/shortener'
  },
  garnet: {
    imageUrl: 'images/garnet.webp',
    imageFallbackUrl: 'images/garnet.jpg',
    techUsed: 'Rails, RSpec, Capybara, AJAX/JSON, SASS, PostgresSQL',
    description: "Garnet is a collaboration by the instructors of GA's WDI to produce a student data-tracking app that's better than Google Sheets.",
    liveUrl: 'https://garnet.wdidc.org/sign_in',
    githubUrl: 'https://github.com/ga-dc/garnet'
  },
  spacey: {
    imageUrl: 'images/spacey.webp',
    imageFallbackUrl: 'images/spacey.jpg',
    techUsed: 'D3, Rails, AJAX/JSON, RSpec, SASS, PostgresSQL',
    description: 'Space management and visualizaiton tool.',
    liveUrl: 'https://gadc.space/',
    githubUrl: 'https://github.com/ga-dc/spacey'
  },
  beacon: {
    imageUrl: 'images/beacon.webp',
    imageFallbackUrl: 'images/beacon.jpg',
    techUsed: 'Express, Node, MongoDB, SASS, Facebook & Google Auth',
    description: 'Allows travlers to connect with other nearby travlers.',
    liveUrl: 'http://beacon-wdi.herokuapp.com/',
    githubUrl: 'https://github.com/tylercrosse/project-3'
  },
  atlasShared: {
    imageUrl: 'images/atlas-shared.webp',
    imageFallbackUrl: 'images/atlas-shared.jpg',
    techUsed: 'Angular, Express, MongoDB, SASS, Google Maps API',
    description: 'Atlas Shared makes it easier to facilitate travel recommendations from within your network by building a community of shared experiences.',
    liveUrl: 'http://atlasshared.com',
    githubUrl: 'https://github.com/tylercrosse/atlas-shared'
  },
  gitPreview: {
    imageUrl: 'images/git-preview.webp',
    imageFallbackUrl: 'images/git-preview.jpg',
    techUsed: 'Ruby, Rails, jQuery, PostgresSQL, AWS S3, Github API',
    description: 'Track visual changes between git commits',
    liveUrl: 'https://git-preview.herokuapp.com/',
    githubUrl: 'https://github.com/tylercrosse/git_preview'
  },
  flashCards: {
    imageUrl: 'images/flash-cards.webp',
    imageFallbackUrl: 'images/flash-cards.jpg',
    techUsed: 'jQuery',
    description: 'Simple way to learn flash cards',
    liveUrl: 'http://tylercrosse.com/Flash_Card_Project/',
    githubUrl: 'https://github.com/tylercrosse/Flash_Card_Project'
  },
  scribble: {
    imageUrl: 'images/scribble.webp',
    imageFallbackUrl: 'images/scribble.jpg',
    techUsed: 'Ruby, Rails, jQuery, PostgresSQL, ActiveRecord',
    description: 'Scribble is a Ruby on Rails application where users can read, write, and interact with the best content all around the world.',
    liveUrl: 'http://scribble-tyler.herokuapp.com/',
    githubUrl: 'https://github.com/tylercrosse/scribble'
  }
}
