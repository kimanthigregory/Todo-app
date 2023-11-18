
const checkbox = document.querySelector('#Checkbox');
const form = document.querySelector('#myForm');

checkbox.addEventListener('change', function() {
  if (this.checked) {
    // Checkbox is checked, submit the form
    form.submit();
  }
});