
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
  // console.log("options: ", optionsDB)
  createOptionsElement(
    optionsDB.reduce((acc, next) => ({
    ...acc,
    [next.name]: next.value,
  }),
  
  {}
  
  ))

};


// const loadOptions = (options) => {
//   console.log(options)
//   $(".options-container").empty();
//   $.ajax({
//     method: "GET",
//     URL: "/add-dates-to-options",
//   }).then(data => {
//     console.log("loaded the options");
//     renderOptions(data)
//   })
// };



$(document).ready(function () {
  const  dates = [];
  $('#dates-form').on('submit', function (event) {
    // prevent form submission
    // console.log("running")
    event.preventDefault();
    const serializedInput = $(this).serializeArray();
    renderOptions(serializedInput)
    // console.log("SERIALIZED", serializedInput)
    dates.push(serializedInput);
    // console.log('=================================>', serializedInput)
    return false;
  });
  
  $('#send-dates-to-db').on('submit', function (event) {
    console.log('---------------------dates: ', dates)
    // console.log("=========================> dates: ", dates);
    const serializedInput = $('#send-dates-to-db').serialize()
    // const serializedInput = $(this).serializeArray();
    console.log("sending dates to db: ", event.target)
    return false;
  })
});
