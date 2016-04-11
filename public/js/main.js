
$('.menulist > li').click(function(){

	var route = $(this).attr('id');

  $.get('/ajax/'+route ,function(data){

    if(data){ 

         $('.posts-container').append(data);
    }
    
    else{
        console.log('no data recieved');
    }

  });

  $('.menulist > li').removeAttr('class');

  $(this).addClass('active');

});




