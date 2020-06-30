

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
    const form = $('#add-start-date-to-options');
    form.submit(function(e) {
        // prevent form submission
        e.preventDefault();
        const form = $('#add-end-date-to-options');
        form.submit(function(e) {
            // prevent form submission
            e.preventDefault();
    return false;
   });
});


end-date-button



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



