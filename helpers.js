
const generateRandomString = () => {
  return Math.random().toString(36).substr(2, 6);
};

// takes in an option object and returns the html of the options
const createOptionsElement = (optionObj) => {
  const $option = $("#option-container");
  $("#link-to-text").click(function () {
    $("#option-textet").focus();
  });

  const html = `<div class="event-option">
  <h4 class="option-title">Option</h4>
  <p class="option-date">Start Date: ${optionObj.startD ate}</p>
  <div class="arrow">&#x25BD;</div>
  <p class="option-date">End Date: ${optionObj.endDate}</p>
</div>`;

  $option.prepend(html);
};

// takes in a database of options and creates html elements out of each option
const renderOptions = function (optionsDB) {
  for (let option of optionsDB) {
    createoptionElement(option);
  }
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

const loadOptions = () => {
  $("#options-container").empty();
  $.ajax("/options", {
    method: "GET",
  }).then(data => {
    console.log("loaded the options");
    renderOptions(data)
  })
}

module.exports = { generateRandomString };