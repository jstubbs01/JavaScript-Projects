// Input fields
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
const togglePassword =  document.querySelector('#togglePassword');
const showPassword = document.querySelector('#showPassword');
const colors = document.querySelectorAll('.colors');

// Form
const form = document.getElementById('myForm');
// Validation colors
const green = '#4CAF50';
const red = '#F44336';

// form listeners for when form is submitted

form.addEventListener('submit', function(event){
  //prevent default behavior
  event.preventDefault();
  if (
    validateFirstName() && 
    validateLastName() && 
    validatePassword() && 
    validateConfirmPassword() && 
    validateEmail()

  ) {
    const name = firstName.value;
    const container = document.querySelector('div.container');
    const loader = document.createElement('div');
    loader.className='progress';
    const loadingBar = document.createElement('div');
    loadingBar.className = 'indeterminate';
    loader.appendChild(loadingBar);
    container.appendChild(loader);
    // mimic a server with setTimeout
    setTimeout(function(){
      const loaderDiv = document.querySelector('div.progress');
      const panel =document.createElement('div');
      panel.className = 'card-panel blue';
      const text = document.createElement('span');
      text.className = 'white-text'
      text.appendChild(document.createTextNode(`Sign up sucessful. Welcome, ${name}!`));
      panel.appendChild(text);
      container.replaceChild(panel, loaderDiv);

    }, 1000)
  }
});

// Validators
function validateFirstName() {
    // check if is empty
    if (checkIfEmpty(firstName)) return;
    // is if it has only letters
    if (!checkIfOnlyLetters(firstName)) return;
    return true;
  }
  function validateLastName() {
    // check if is empty
    if (checkIfEmpty(lastName)) return;
    // is if it has only letters
    if (!checkIfOnlyLetters(lastName)) return;
    return true;
  }

function validatePassword() {
  // check if pword empty
  if(checkIfEmpty(password)) return;
  // password must be of certain length
  if(!meetLength(password, 6, 100)) return;
  // check pword against list of characters
  // 1) a
  // 2) a 1
  // 3) A a 1
  // 4) A a 1 @
  if(!containsCharacters(password, 1)) return;
  return true;
}
function validateConfirmPassword() {
  if(password.className !== 'valid'){
    setInvalid(confirmPassword, 'Password must be valid');
    return;
  }
  // check if passwords match
  if(password.value !== confirmPassword.value) {
    setInvalid(confirmPassword, 'Passwords must match');
    return;
  } else {
    setValid(confirmPassword);
  }
  return true;
}

function validateEmail(){
  if(checkIfEmpty(email)) return;
  if(!containsCharacters(email, 5)) return;
  return true;
}
  // Utility functions
function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
      // set field invalid
      setInvalid(field, `${field.name} must not be empty`);
      return true;
    } else {
      // set field valid
      setValid(field);
      return false;
    }
  }
  function isEmpty(value) {
    if (value === '') return true;
    return false;
  }
  function setInvalid(field, message) {
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
  }
  function setValid(field) {
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
    //field.nextElementSibling.style.color = green;
  }
  function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
      setValid(field);
      return true;
    } else {
      setInvalid(field, `${field.name} must contain only letters`);
      return false;
    }
  }
function meetLength(field, minLength, maxLength){
  if(field.value.length >= minLength && field.value.length < maxLength){
    setValid(field);
    return true;
    
  } else if(field.value.length < minLength){
    setInvalid(field,`${field.name} must be at least ${minLength} charaters long`);
    return false;
  
  } else {
    setInvalid(field, `${field.name} must be shorter than ${maxLength} characters`);
    return false;
  }
  
}
function containsCharacters(field, code){
  let regEx;
  switch(code){
    case 1:

      // at least one letter
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, 'Must contain at least one letter');
    case 2:
      //letters and at least one number
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, 'Must contain at least one letter and one number');
    case 3:
      // one uppercase, lowercase and number
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(regEx, field, 'Must contain at least one uppercase char, one lowercase char, and one number');

    case 4:
      // one uppercase, lowercase and number and special character
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(regEx, field, 'For your security, password must contain: 1) at least one uppercase char, 2) one lowercase char, 3) one number, and 4) one special [!@#$%^&*()-+] char');
    case 5:
      // email pattern
      regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegEx(regEx, field, 'Invalid email')
    default:
      return false;
  }

}
function matchWithRegEx(regEx, field, message){
  if(field.value.match(regEx)){
    setValid(field);
    return true;
  
  } else {
    setInvalid(field, message);
    return false;
  }
}




/* show password button 

togglePassword.addEventListener('click' , function(i) {
  // toggle type attribute of password

  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  this.classList.toggle('showPassword');
});
*/
function toggler(e) {
  if( e.innerHTML == 'Show Password' ) {
      e.innerHTML = 'Hide Password'
      document.getElementById('password').type="text";
  } else {
      e.innerHTML = 'Show Password'
      document.getElementById('password').type="password";
  }
}

function darkMode(){
  
  var element = document.body;
  element.classList.toggle('dark-mode');
  CheckColor();

  //return(firstName.style.color);
  //return(element.style.backgroundColor);
}
function CheckColor() {
  var InputFields = document.getElementsByClassName("input-field col s6");
  if (firstName.style.color == "white") {
    firstName.style.color = "black";
    lastName.style.color = "black";
    password.style.color = "black";
    confirmPassword.style.color = "black";
    email.style.color = "black";
  }
  
  else{
    firstName.style.color = "white";
    lastName.style.color = "white";
    password.style.color = "white";
    confirmPassword.style.color = "white";
    email.style.color = "white";
    }
}

/*
function checkFilled() {
	var inputVal = document.getElementById("firstName");
    if (darkMode() == true) {
        inputVal.style.color = "white";
    }
    else{
        inputVal.style.backgroundColor = "";
    }
}
 
checkFilled();




/*
function darkModeText(){
  if darkMode() === false {
    document.getElementById("input-field col s6").style.color ="black";
  } else {
    return;
  }
}
*/
/*
for (let color of colors) {
  color.addEventListener('keyup', () => {
    if (this.event.target.value == 1) {
      this.event.target.style.backgroundColor = 'red';
    }
    
    else {
      this.event.target.style.backgroundColor = 'inherit';
    }
  })
}
*/