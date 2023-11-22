
const checkbox = document.querySelector('#Checkbox');
const form = document.querySelector('#myForm');
const input =document.querySelector("#input");
checkbox.addEventListener('change', function() {
  if (this.checked) {
    // Checkbox is checked, submit the form
    const inputEmpty=input.value.trim()=== "";
    if(inputEmpty){
      this.preventDefault();
    }
    else{
      form.submit();
    }
  }
});
