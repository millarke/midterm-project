// Credit Copyright (c) 2020 by PJCHEN (https://codepen.io/PJCHENder/pen/jamJpj)
// See LICENSES folder for license
new Vue({
  el: "#app",
  data: {
      testingCode: "1234",
  },
  methods: {
      copyTestingCode () {
        let testingCodeToCopy = document.querySelector('#testing-code')
        testingCodeToCopy.setAttribute('type', 'text')
        testingCodeToCopy.select()
        try {
          let successful = document.execCommand('copy');
          let msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
          alert('Oops, unable to copy');
        }
        /* unselect the range */
        testingCodeToCopy.setAttribute('type', 'hidden');
        window.getSelection().removeAllRanges();
      },
  },
});
