

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




