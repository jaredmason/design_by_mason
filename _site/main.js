$(document).ready(function() {

// Smooth Scroll jQuery Code

  // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  // End Smooth Scroll jQuery Code

  // Main Menu jQuery Code

  $(".main-nav").click(function() {
    $(".menu").toggleClass("menu-hidden");
    $(".flip").toggleClass("rotate");
  });

  // Mobile Menu jQuery Code

  $(".mobile-button").click(function() {
    $(".list").fadeTo(0, 0).delay(400).fadeTo(100, 1)
    // $(".text-wrap").toggleClass("mob-hide");
    $(".mobile-button").toggleClass("active");
    $(".mobile-plus").toggleClass("invert-mobile-svg");
    $(".mobile-menu-wrap").slideToggle(400);
    $(".menu-svg").toggleClass("dropdown-color");
  });

  $(".mobile-menu").click(function() {
    $(".mobile-button").toggleClass("active");
    $(".mobile-menu-wrap").slideToggle();
  });
});
  // End Mobile Menu jQuery Code
