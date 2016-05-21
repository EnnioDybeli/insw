

  $.get('/ajax/kryesore' ,function(data){

    if(data){ 
         $('.posts-container').append(data);
    }
    
    else{
        console.log('no data recieved');

    }

  });


$('.avatar').on('click',function(){

  $('.logout').toggleClass('show');

});




$('.menulist > li').click(function(){

  var route = $(this).attr('id');

  $.get('/ajax/'+route ,function(data){

    if(data){ 
         $('.posts-container').empty();
         $('.posts-container').append(data);
    }
    
    else{
        console.log('no data recieved');
        $('.posts-container').empty();

    }

  });

  $('.menulist > li').removeAttr('class');

  $(this).addClass('active');

});


$(window).scroll(function () {

  if ($(this).scrollTop() >= 100) {
    $(".menu").css('position','fixed');
    $(".menu").css('top','0');
    $(".menu").css('width','970px');
    $(".menu").css('background','white');
    $(".menu").css('z-index','999');
  }
  else {
    $(".menu").css('position','relative');
  }
});

$(function() {    // Makes sure the code contained doesn't run until
                  //     all the DOM elements have loaded

    $('#viti').change(function(){
        $('.paraleli').hide();
        $('.grupi').hide();
        $('#' + $(this).val()).show();
    });

});

var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

