

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





// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/new"
//   }).done((events) => {
//     // console.log("I have returned with", events)
//     // for(user of users) {
//     //   $("<div>").text(user.name).appendTo($("body"));

//   })
// });


