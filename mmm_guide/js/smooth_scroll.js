$(document).ready(function () {
  $("a").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 750, function () {
        window.location.hash = hash;
      });
    }
  });
});
  //owner: https://schoolsw3.com/howto/howto_css_smooth_scroll.php#section2