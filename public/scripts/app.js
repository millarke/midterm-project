// takes in an option object and returns the html of the options
const createOptionsElement = (optionObj) => {
  const $option = $(".options-container");

  const html = `<div class="event-option" id="option">
  <h4 class="option-title">Option</h4>
  <p class="option-date">Start Date: ${optionObj.startDate}</p>
  <p class="option-date">Start Time: ${optionObj.startTime}</p>
  <div><i class="fa fa-chevron-down" aria-hidden="true"></i></div>
  <p class="option-date">End Date: ${optionObj.endDate}</p>
  <p class="option-date">End Time: ${optionObj.endTime}</p>
  <input name="dates" type="hidden" value=${JSON.stringify(optionObj)} />
  </div>`;

  $option.prepend(html);
};

// takes in a database of options and creates html elements out of each option
const renderOptions = function (optionsDB) {
  createOptionsElement(
    optionsDB.reduce((acc, next) => ({
    ...acc,
    [next.name]: next.value,
  }),

  {}

  ))

};

const createUserRow = (userObj) => {
  const $user = $(".users-row");

  const html = `
    <td>${userObj.name}</td>
      <% for(let date of dates) { %>
      <td><div class="form-check">
        <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="${userObj.id}" aria-label="...">
      </div></td>
      <% } %>
    </tr>
  </table>`

  $user.prepend(html);
};


$(document).ready(function () {
  const  dates = [];
  $('#dates-form').on('submit', function (event) {
    event.preventDefault();
    const serializedInput = $(this).serializeArray();
    renderOptions(serializedInput)
    console.log("SERIALIZED", serializedInput)
    dates.push(serializedInput);
    return false;
  });
});
