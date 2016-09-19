$(function() {
  var navHeight = $('.mainNav').height();

  $('a[href*=\\#]:not([href=\\#])').click(animateJumpNav);

  function animateJumpNav() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - navHeight
        }, 500)
        return false;
      }
    }
  };
  
  $(window).scroll(function() {
    throttle.call(this, scrollStuff, 15)
  });
  
  var scheduled = false;
  function throttle(cb, delay, cbArg1) {
    if (!scheduled) {
      scheduled = true;
      window.setTimeout(function() {
        scheduled = false;
        cb.call(this, cbArg1);
      }, delay)
    }
  };
    
  function scrollStuff() {
    var scrollPos = $(window).scrollTop(); // get current vertical position
    var winHeight = $(window).height(); // get window height
    var docHeight = $(document).height(); // get doc height for last child

    if ($(window).scrollTop() > (winHeight - navHeight)) {
      $('.mainNav').addClass('navbar-fixed');
      $('.mainNav').removeClass('navbar-absolute');
    }
    if ($(window).scrollTop() < (winHeight - navHeight - 1)) {
      $('.mainNav').removeClass('navbar-fixed');
      $('.mainNav').addClass('navbar-absolute');
    }
  };
  
  $.fn.parallax = function ( resistance, mouse )
  {
    $el = $( this );
    TweenLite.to( $el, 0.2, {
      x : -(( mouse.clientX - (window.innerWidth/2) ) / resistance ),
      y : -(( mouse.clientY - (window.innerHeight/2) ) / resistance )
    });
  };
  
  $('#splash').mousemove(function(event){
    throttle.call(this, splashParallax, 100, event);
  })
  
  function splashParallax(event) {
    $('.splashHero').parallax(-20, event);
    $('.intro').parallax(10, event);
  }
    
  // 3) parallax header every 15 ms
    
  // 4) project modal stuff
  $('.modalTrigger').click(openModal);
  
  $('.modalClose').click(closeModal);
  
  var modScrollPos = 0;
  
  function openModal() {
    event.preventDefault();
    var project = projects[$(this).attr('name')];
    modScrollPos = $(window).scrollTop();
    $('#modalImage').attr('src', project.imageUrl);
    $('#modalTech').text(project.techUsed);
    $('#modalDescription').text(project.description);
    $('#modalLive').attr('href', project.liveUrl)
    $('#modalGithub').attr('href', project.githubUrl)
    $('#modal').show();
  }
  
  function closeModal() {
    event.preventDefault();
    $(window).scrollTop(modScrollPos);
    $('#modal').hide();
  }

  var projects = {
    shortener: {
      imageUrl: 'images/shortener.jpg',
      techUsed: 'React, ES6, Express, SASS, MongoDB, DigitalOcean',
      description: 'bitly URL Shortener clone built in React.',
      liveUrl: 'http://104.131.109.177:3000/',
      githubUrl: 'https://github.com/tylercrosse/shortener'
    },
    garnet: {
      imageUrl: 'images/garnet.jpg',
      techUsed: 'Rails, RSpec, Capybara, AJAX/JSON, SASS, PostgresSQL',
      description: "Garnet is a collaboration by the instructors of GA's WDI to produce a student data-tracking app that's better than Google Sheets.",
      liveUrl: 'https://garnet.wdidc.org/sign_in',
      githubUrl: 'https://github.com/ga-dc/garnet'
    },
    spacey: {
      imageUrl: 'images/spacey.jpg',
      techUsed: 'D3, Rails, AJAX/JSON, RSpec, SASS, PostgresSQL',
      description: 'Space management and visualizaiton tool.',
      liveUrl: 'https://gadc.space/',
      githubUrl: 'https://github.com/ga-dc/spacey'
    },
    beacon: {
      imageUrl: 'images/beacon.jpg',
      techUsed: 'Express, Node, MongoDB, SASS, Facebook & Google Auth',
      description: 'Allows travlers to connect with other nearby travlers.',
      liveUrl: 'http://beacon-wdi.herokuapp.com/',
      githubUrl: 'https://github.com/tylercrosse/project-3'
    },
    atlasShared: {
      imageUrl: 'images/atlas-shared.jpg',
      techUsed: 'Angular, Express, MongoDB, SASS, Google Maps API',
      description: 'Atlas Shared makes it easier to facilitate travel recommendations from within your network by building a community of shared experiences.',
      liveUrl: 'http://atlasshared.com',
      githubUrl: 'https://github.com/tylercrosse/atlas-shared'
    },
    gitPreview: {
      imageUrl: 'images/git-preview.jpg',
      techUsed: 'Ruby, Rails, jQuery, PostgresSQL, AWS S3, Github API',
      description: 'Track visual changes between git commits',
      liveUrl: 'https://git-preview.herokuapp.com/',
      githubUrl: 'https://github.com/tylercrosse/git_preview'
    },
    flashCards: {
      imageUrl: 'images/flash-cards.jpg',
      techUsed: 'jQuery',
      description: 'Simple way to learn flash cards',
      liveUrl: 'http://tylercrosse.com/Flash_Card_Project/',
      githubUrl: 'https://github.com/tylercrosse/Flash_Card_Project'
    },
    scribble: {
      imageUrl: 'images/scribble.jpg',
      techUsed: 'Ruby, Rails, jQuery, PostgresSQL, ActiveRecord',
      description: 'Scribble is a Ruby on Rails application where users can read, write, and interact with the best content all around the world.',
      liveUrl: 'http://scribble-tyler.herokuapp.com/',
      githubUrl: 'https://github.com/tylercrosse/scribble'
    }
  }
});