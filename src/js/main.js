$(document).ready(function() {

  //enable strict mode to ensure code that is written is as clean as possible
  "use strict";



  //self invoking function for search form toggle
  (function searchFrm() {

    var openTrig = $(".js-form-trigger");
    var closeTrig = $('.js-form-close');
    var form = $('.search-form');

    function closeFrm() {
      form.removeClass('active');
    }

    function openFrm() {
      form.addClass('active');
      form.find($('input[type="search"]')).focus(); //automatically focus on text box after it is visible
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


  //self invoking function for the slide menu
  (function Menu() {
    var trig = $('.js-side-menu-trigger');
    var menu = $('#side-navigation');


    trig.on('click', function() {
      if($(this).is('.active')) {
        close()
      } else {
        open();
      }
    });

    function open() {
      trig.addClass('active');
      $('body').addClass('nav-open');
      menu.addClass('open');
    }

    function close() {
      trig.removeClass('active');
      $('body').removeClass('nav-open');
      menu.removeClass('open');
    }

    //if user clicks on anywhere else on the page other than the menu, close it
    $(document).click(function(event) {
      if (!$(event.target).closest(menu).length && !$(event.target).closest('.menu-icon').length ) {
        if(menu.is('.open')) {
          close();
        }
      }
    });


    //initiate slippry slider plugins
    $("#hero").slippry({
      transition: 'fade',
      pause: 5000,
      controls: false,
      preload: 'visible',
    });
  })();

  //Made with <3 for McCann



});
