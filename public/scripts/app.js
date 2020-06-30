
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


// takes in an option object and returns the html of the options
const createOptionsElement = (optionObj) => {
  const $option = $(".options-container");
  // $("#link-to-text").click(function () {
  //   $("#option-textet").focus();
  // });

  const html = `<div class="event-option">
  <h4 class="option-title">Option</h4>
  <p class="option-date">Start Date: ${optionObj.startDate}</p>
  <p class="option-date">Start Date: ${optionObj.startTime}</p>
  <div class="arrow">&#x25BD;</div>
  <p class="option-date">End Date: ${optionObj.endDate}</p>
  <p class="option-date">End Date: ${optionObj.endTime}</p>
</div>`;

  $option.prepend(html);
};

// takes in a database of options and creates html elements out of each option
const renderOptions = function (optionsDB) {
  console.log("options: " , optionsDB)
  createOptionsElement(optionsDB.reduce((acc, next) => ({
    ...acc, 
    [next.name]: next.value,
     }), {}))
     
    //  .map(option => createOptionsElement(option));  
};

// loads previously saved options, don't know if we'll need this
// const loadOptions = function() {
//   $("#option-container").empty();
//   $.ajax("/options", {
//       method: "GET",
//   }).then(function(data) {
//       console.log("loaded the options");
//       renderOptions(data);
//   });
// };

const loadOptions = (options) => {
  console.log(options)
  $(".options-container").empty();
  $.ajax({
    method: "GET",
    URL: "/add-dates-to-options",
  }).then(data => {
    console.log("loaded the options");
    renderOptions(data)
  })
};



$(document).ready(function () {
  // do your things
  // const form = $('#add-dates-to-options');
  $('#dates-form').on('submit', function (event) {
    // prevent form submission
    console.log("running")
    event.preventDefault();
    const serializedInput = $(this).serializeArray();
  
    console.log("SERIALIZED", serializedInput)
    renderOptions(serializedInput);
    
    // $.ajax("/add-dates-to-options" ,{
    //   method: "POST",
    //   data: serializedInput,
    // })
    //   .then(function (res) {
    //     loadOptions();
    //     // $("#tweet-text").val("");
    //     // $("#counter").val("140")
    //   })


    return false;
  });
});
