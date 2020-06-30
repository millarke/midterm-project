

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});


$(document).ready(function() {
     // do your things
    var form = $('#add-new-date-to-options');
    form.submit(function(e) {
        // prevent form submission
        e.preventDefault();
    return false;
   });
});




// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });



