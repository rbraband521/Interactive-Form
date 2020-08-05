//global variables for job role
const jobRole = document.getElementById('title');
const otherJob = document.querySelector("option[value = 'other']");
const otherTitle = document.getElementById('other-title');
otherTitle.hidden = true;
//global variable to access T-shirt elements
const colorMenu = document.getElementById('color');
const shirtTheme = document.getElementById('design');
//global variables for ACTIVITY section
const activities = document.querySelector('.activities');
const activityCheckboxes = document.querySelectorAll('.activities input');
//counter variable for the running cost of activities
var totalCost = 0;
//adds a new element for the displayed total
const displayedTotal = document.createElement('label');
activities.appendChild(displayedTotal);
//global variables for Payment - returns the options from the select menu
const creditCardOption = document.querySelector("option[value = 'credit card']");
const payPalOption = document.querySelector("option[value = 'paypal']");
const bitCoinOption = document.querySelector("option[value = 'bitcoin']");
//global vaiables for credit card information
const creditCardInfo = document.getElementById('credit-card');
const payPalInfo = document.getElementById('paypal');
const bitcoinInfo = document.getElementById('bitcoin');
//returns the value of the paymentselect menu
const paymentSelect = document.getElementById('payment');
//Hides 'Select Payment Method' from drop down menu
paymentSelect.firstElementChild.hidden = true;
//Selects credit card option on default
paymentSelect.value = 'credit card';
//Initially hides the paypal and bitcoin information
payPalInfo.style.display = 'none';
bitcoinInfo.style.display = 'none';
//referencing the form so we can use this in the submit listener
const form = document.querySelector('form');
//get the name element and focuses it when the screen is loaded
window.onload = (e) => {
    document.getElementById("name").focus();
};
//listens for a change in the dropdown menu, will add the input box if 'other' is chosen
jobRole.addEventListener('change', (e) => {
  const userJob = e.target.value;
  if (userJob === otherJob.value) {
    otherTitle.hidden = false;
  } else if (otherTitle.hidden = true);
});
//hides the Select Theme option from the dropdown menu
document.getElementById("design").firstElementChild.hidden = true;
/*function that adds a message to the dropdwon menu once a design chosen. 
This alerts to user to select a color after the design
both of the following functions create a new element, ser the text or innerHTML and append it to the proper location*/
 const colorSelect = () => {
     const newOption = document.createElement("option");
     const location = colorMenu.firstElementChild;
     newOption.textContent = "Please select a T-shirt color design";
     colorMenu.insertBefore(newOption, location);
     newOption.selected = true;
     document.getElementById("color").firstElementChild.hidden = true;
  }

//Hides the color menu and appends a message in it's place
  const colorMenuHide = () => {
    const menuMessage = document.createElement("p")
    menuMessage.setAttribute("id", "newMessage");
    const location = colorMenu.parentElement;
    location.appendChild(menuMessage)
    menuMessage.innerHTML = "Please select a T-shirt Theme";
    colorMenu.style.display = "none";
}
colorMenuHide();
 
/*event listener for select shirt theme menu that will display only the correct color options in the color menu 
the options are stored in an array and then displayed based on which shirt design is chosen with their 
respective index value*/
shirtTheme.addEventListener('change', (event) => {
    const colorOptions = document.getElementById("color").children;
    console.log(colorOptions);
    colorMenu.style.display = '';
    document.getElementById("newMessage").hidden = true;
    if (shirtTheme.value === 'js puns') {
       colorOptions[0].style.display = '';
       colorOptions[1].style.display = '';
       colorOptions[2].style.display = '';
       colorOptions[3].style.display = '';
       colorOptions[4].style.display = 'none';
       colorOptions[5].style.display = 'none';
       colorOptions[6].style.display = 'none';
} else if (shirtTheme.value === 'heart js') {
        colorOptions[0].style.display = '';
        colorOptions[1].style.display = 'none';
        colorOptions[2].style.display = 'none';
        colorOptions[3].style.display = 'none';
        colorOptions[4].style.display = '';
        colorOptions[5].style.display = '';
        colorOptions[6].style.display = '';
}

});

//New span for activity section to display message
const activitySpan = document.createElement('span');
activitySpan.innerHTML = 'Please choose at least ONE activity';
activities.appendChild(activitySpan);
/*function for Activity section validation, it checks the value of the totalCost variable, if it's
 equal to 0 the message is displayed in red
This will be called in the event listener for the checkboxes and dynamically display the error 
message based on the total*/
function isActivityValid (a) {
  if(a === 0) {
    activitySpan.style.display = '';
    activitySpan.style.color = 'red';
    return false;
  } else {
    activitySpan.style.display = 'none';
    return true;
  } 
}
/*This event listener listens for any changes to the activity checkboxes and respons 
accordingly with the following conditional*/
activities.addEventListener('change', (e) => {
  const userCheck = e.target;
  const checkedCost = userCheck.getAttribute('data-cost'); 
  const checkedDate = userCheck.getAttribute('data-day-and-time');
//if a box has been checked the data-cost is added to totalCost AND if it's UNchecked after being checked it subtracts 
  if (userCheck.checked) {
    totalCost += parseInt(checkedCost);
    displayedTotal.textContent = "Total: $" + totalCost + ".00";
  } else {
    totalCost -= parseInt(checkedCost);
    displayedTotal.textContent = "Total: $" + totalCost + ".00";
  } 
//hides or shows error message Span based on checkboxes
isActivityValid(totalCost);
/*This loop checks the attributes of each checkbox against each other based on which is checked
If the date and time are equal to the user check, that activity checkbox is disabled and 
likewise enabled if the user unchecks*/
  for ( let a = 0; a < activityCheckboxes.length; a +=1) {
    const activitiesInput  = activityCheckboxes[a].getAttribute('data-day-and-time');
      if( checkedDate === activitiesInput  && userCheck !== activityCheckboxes[a]) {
        if (userCheck.checked) {
          activityCheckboxes[a].disabled = true;
        } else {
          activityCheckboxes[a].disabled = false;
        }
    }
  }
});
//listens for any change on the payment select menu and will hide or show which ever the user specifies
paymentSelect.addEventListener('change', (e) => {
  const userCheck = e.target.value;
  if (userCheck === payPalOption.value) {
    payPalInfo.style.display = '';
    creditCardInfo.style.display = 'none';
    bitcoinInfo.style.display = 'none';
  } else if(userCheck === bitCoinOption.value) {
      payPalInfo.style.display = 'none';
      creditCardInfo.style.display = 'none';
      bitcoinInfo.style.display = '';
  } else if(userCheck === creditCardOption.value) {
      payPalInfo.style.display = 'none';
      creditCardInfo.style.display = '';
      bitcoinInfo.style.display = 'none';
  }
});
//FORM VALIDATION
//NAME validation
const userNameInput = document.querySelector('#name');
console.log(userNameInput);
//creates new span element for error message
const nameSpan = document.createElement('span');
nameSpan.innerHTML = 'Please enter your name';
userNameInput.insertAdjacentElement('afterend', nameSpan);
nameSpan.style.display = 'none';
/*this regex allows for what may be considered some errors to slip through however what this allows for outweighs that 
in my opinion, including last names that may be two words, have hyphens or apostrophes */
function isValidName(name) {
  return /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/.test(name);
}
//EMAIL validation
const userEmailInput = document.getElementById('mail');
const emailSpan = document.createElement('span');
emailSpan.innerHTML = 'Please enter a valid email address';
userEmailInput.insertAdjacentElement('afterend', emailSpan);
emailSpan.style.display = 'none';
//The email regex tests for a few different conditions including ONE @ symbol and a period followed by lowercase only
function isValidEmail(mail) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(mail);
}
//CREDIT CARD NUMBER validation
const ccNum = document.getElementById('cc-num');
const creditCardSpan = document.createElement('span');
creditCardSpan.innerHTML = 'Please enter a valid credit card number';
ccNum.insertAdjacentElement('afterend', creditCardSpan);
creditCardSpan.style.display = 'none';
//This regex test for a digit count between 13 and 16
function isNumValid (ccNum) {
  return /^\d{13,16}$/.test(ccNum)
}
//ZIP CODE validation
const zipCode = document.getElementById('zip');
const zipCodeSpan = document.createElement('span');
zipCodeSpan.innerHTML = 'Please enter a valid 5 digit zip code';
zipCode.insertAdjacentElement('afterend', zipCodeSpan);
zipCodeSpan.style.display = 'none';
//this regex tests for 5 digits ONLY
function isZipCodeValid (zip) {
  return /^\d{5}$/.test(zip)
}
//CVV validation
const cvvCode = document.getElementById('cvv');
const cvvCodeSpan = document.createElement('span');
cvvCodeSpan.innerHTML = 'Please enter a valid 3 digit CVV code';
cvvCode.insertAdjacentElement('afterend', cvvCodeSpan);
cvvCodeSpan.style.display = 'none';
//This regex tests for 3 digits ONLY
function isCvvCodeValid (cvv) {
  return /^\d{3}$/.test(cvv); 
}
 /*This function, to be called in the createListener eventually will show or hide the element passed through the function
The elements will be the new span error messages to be displayed in red*/
function showOrHideTip(show, element) {
  if (show) {
    element.style.display = '';
    element.style.color = 'red';
  } else {
    element.style.display = "none";
  }
}
/*This function makes the eventlisteners for each input field much more concise because 
this is all that needs to be called
This function checks the validators and then calls the showOrHideTip function to display or not 
display the error message based on the user input*/
function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target.nextElementSibling;
    showOrHideTip(showTip, tooltip);
    console.log(text);
  };
}
//event listeners for each input field. Calls the createListerner function while passing in each validation function
userNameInput.addEventListener("input", createListener(isValidName));
userEmailInput.addEventListener("input", createListener(isValidEmail));
ccNum.addEventListener("input", createListener(isNumValid));
zipCode.addEventListener("input", createListener(isZipCodeValid));
cvvCode.addEventListener("input", createListener(isCvvCodeValid));

/*master function for validating all name, email and activity fields, will display error message
 if necessary when called in the submit event listener
validates each input and in the final conditional if all return true, true is returned otherwise false is returned*/
function master(userName, userEmail, total) {
  if (isValidName(userName) === false) {
    nameSpan.style.display = '';
    nameSpan.style.color = 'red';
  }
  if (isValidEmail(userEmail) === false) {
    emailSpan.style.display = '';
    emailSpan.style.color = 'red';
  } 
  if (isActivityValid(total) === false) {
    activitySpan.style.display = '';
    activitySpan.style.color = 'red';
  } 
  if (isValidName(userName) === true && isValidEmail(userEmail) === true && isActivityValid(total) === true) {
    return true;
  } else {
    return false;
  }
}
/*separate credit card validation function, the very first thing this does is check if 
the payment select value is equal to credit card or not
if credit card is selected, the validation will run otherwise true is returned automatically*/
function creditCard(cardNum, zip, cvv) {
  if (paymentSelect.value === 'credit card') {
  if (isNumValid(cardNum) === false) {
      creditCardSpan.style.display = '';
      creditCardSpan.style.color = 'red';
    } 
    if (isZipCodeValid(zip) === false) {
      zipCodeSpan.style.display = '';
      zipCodeSpan.style.color = 'red';
    }
     if (isCvvCodeValid(cvv) === false) {
      cvvCodeSpan.style.display = '';
      cvvCodeSpan.style.color = 'red';
    } 
    if (isNumValid(cardNum) === true && isZipCodeValid(zip) === true && isCvvCodeValid(cvv) === true) {
      return true;
    } else {
      return false;
    }
} else {
  return true;
}
}
/*this is the final event listener for the register button
  the first thing this does is call the two functions which validate and show or hide the error messages
  If those functions equal false the default action is prevented 
  The creditCard function will automatically return true if the payment select method equals anything besides
  credit card, otherwise it will run throught the validation functions
  If all validation functions return true, no error messages will display and the form will 'submit' YAY!
*/
form.addEventListener('submit', (e) => { 
  creditCard(ccNum.value, zipCode.value, cvvCode.value);
  master(userNameInput.value, userEmailInput.value, totalCost); 
 if (creditCard(ccNum.value, zipCode.value, cvvCode.value) === false || (master(userNameInput.value, userEmailInput.value, totalCost) === false)) {
   e.preventDefault();
 }  else {
   return true;
 }
});

