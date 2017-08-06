$(document).ready(function() {


  //self invoking function for search form toggle
  (function searchFrm() {

    var openTrig = $(".js-form-trigger");
    var closeTrig = $('.js-form-close');
    var form = $('.search-form');

    function closeFrm() {
      console.log('closeFrm()');
      form.removeClass('active');
    }

    function openFrm() {
      console.log('openFrm()');
      form.addClass('active');
      form.find($('input[type="search"]')).focus();
    }

    openTrig.on('click', function(e) {
      e.preventDefault();
      openFrm();
    });

    closeTrig.on('click', function(e) {
      e.preventDefault();
      closeFrm();
    });

    //if user clicks on anywhere else on the page other than the form, close it
    $(document).click(function(event) {
      if (!$(event.target).closest(form).length ) {
        if(form.is('.active')) {
          closeFrm();
        }
      }
    })
  })();



});
