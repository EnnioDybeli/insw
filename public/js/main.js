//logout dropdown
$('.avatar').on('click', function () {
  $('.logout').toggleClass('show');
});


//initialize feed
var getKryesore = function () {
    $.get('/ajax/kryesore', function (data) {
        "use strict";
        if (data) {
            $('.posts-container').empty();
            $('.posts-container').append(data);
            getDelete();
        } else {
            console.log('no data recieved');
        }
    });
};
getKryesore();


//ajax filter tabs
$('.menulist > li').click(function () {
      var route = $(this).attr('id');

      $.get('/ajax/' + route, function (data) {
            if (data) {
                $('.posts-container').empty();
                $('.posts-container').append(data);
                getDelete();
            } else {
                console.log('no data recieved');
                $('.posts-container').empty();
            }
        });
      $('.menulist > li').removeAttr('class');
      $(this).addClass('active');
});


// //dropdown tabs
// $('.selectFilter').on('click', function () {
//     $(this).children(1).toggleClass('show');
// });


//stick to top on 100px scroll
// $(window).scroll(function () {
//    if ($(this).scrollTop() >= 100) {
//         $(".menu").css('position', 'fixed');
//         $(".menu").css('top', '0');
//         $(".menu").css('width', '970px');
//         $(".menu").css('background', 'white');
//         $(".menu").css('z-index', '999');
//     } else {
//         $(".menu").css('position', 'relative');
//     }
// });


$('#kryesore').on('click',function () {
  $('.posts-container').empty();
  getKryesore();
  getDelete();
});


$('.feed-filter').change(function () {
  $('.posts-container').empty();
  var viti  = $('.feed-filter')[0].value,
      grupi = $('.feed-filter')[1].value;
  $.get('/ajax-filter/' + viti + '/' + grupi, function (data) {
      if (data) {
          $('.posts-container').empty();
          $('.posts-container').append(data);
          getDelete();
      } else {
          console.log('no data recieved');
          $('.posts-container').empty();
          $('.posts-container').append('<h3 style="text-align:center;color:#6B71FE"> Ky grup nuk ka postime :( </h3>')
      }
  });
});


var getDelete = function () {

  $('.delete-button').click(function (event) {
    console.log('deletexx')
    $('.modal').addClass('show');
    var postId = $(this).parent('div').attr('id')

    $('.jo').click(function () {
        $('.modal').removeClass('show');
    });

    $('.po').click(function () {
        $('.modal').removeClass('show');
        $.get('/ajax/delete/' + postId, function (data) {
          console.log(data);
          location.reload();
        });
    });
  });
}
