

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


///////////////////////////////////////////////////////////////////////////////
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




