

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




