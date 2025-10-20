/*
Program name: homework2.js
Name: Jose Miguel Zuniga
Date Created: 10/20/25
Date Last Edited: 10/20/2025
Version: 1.0
Description: Homework 2 JS
*/

// Display today's date
const currentDateElement = document.getElementById("currentDate");
const currentDate = new Date().toLocaleDateString();
currentDateElement.innerHTML = currentDate;

// Update pain level display
document.getElementById("Slider").addEventListener("input", function() {
    const painLevel = this.value;
    document.getElementById("painValue").textContent = painLevel;
});

// Display form input values
function displayInput() {
     var formContents = new FormData(document.forms[0]);
    var formOutput = "<table class='output'><thead><tr><th colspan='2'>Your Information</th></tr></thead><tbody>";
    
    for (var [key, value] of formContents.entries()) {
        var input = document.querySelector(`[name="${key}"]`);
        var type = input.type;

        if (type === "checkbox" && !input.checked) continue;
        if (type === "radio" && !input.checked) continue;
        
        switch (type) {
            case "checkbox":
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>&#x2713;</td></tr>`;
                break;
            case "file":
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>${value.name}</td></tr>`;
                break;
            case "password":
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>${"*".repeat(value.length)}</td></tr>`;
                break;
            default:
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>${value}</td></tr>`;
                break;
        }
    }

    document.getElementById("reviewArea").innerHTML = formOutput + "</table>";
}

// Validate user ID
function validateUserID() {
    var userIDInput = document.getElementById("userID");
    var userID = userIDInput.value.toLowerCase();
    var userIDError = document.getElementById("userIDError");
    userIDError.textContent = "";

    if (userID.length < 5 || userID.length > 20) {
        userIDError.textContent = "ERROR: Username must be between 5 and 20 characters.";
        return false;
    }
    if (!isNaN(userID.charAt(0))) {
        userIDError.textContent = "ERROR: Username cannot start with a number.";
        return false;
    }
    var userIDPattern = /^[a-z0-9_-]+$/;
    if (!userIDPattern.test(userID)) {
        userIDError.textContent = "ERROR: Username can only contain letters, numbers, underscores, or dashes.";
        return false;
    }
    userIDInput.value = userID.toLowerCase();
    document.getElementById("correctedUsername").textContent = userIDInput.value;

    return true;
}


// Validate Password
function validatePassword() {
    var password = document.getElementById("password").value;
    var passwordError = document.getElementById("passwordError");
    var userID = document.getElementById("userID").value.toLowerCase();

    passwordError.textContent = ""; // Clear previous error message
    var isValid = true;  // Initialize validation flag

    // Pattern to check for at least one lowercase, one uppercase, and one digit
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

    // Check if the password meets the minimum length requirement
    if (password.length < 8) {
        passwordError.textContent = "ERROR: Password must be at least 8 characters long.";
        isValid = false;
    } 
    // Check if the password contains at least one lowercase, one uppercase, and one digit
    else if (!passwordPattern.test(password)) {
        passwordError.textContent = "ERROR: Password must include at least one uppercase letter, one lowercase letter, and one digit.";
        isValid = false;
    } 
    // Check if the password is the same as the Username (case-insensitive)
    else if (password.toLowerCase() === userID) {
        passwordError.textContent = "ERROR: Password cannot be the same as the Username.";
        isValid = false;
    }

    return isValid;  // Return the validation result
}


// Validate Password Match
function validatePasswordMatch() {
    var password = document.getElementById("password").value;
    var reEnteredPassword = document.getElementById("re_password").value;
    var passwordMatchError = document.getElementById("passwordMatchError");

    passwordMatchError.textContent = ""; // Clear previous error message
    var isValid = true;  // Initialize validation flag

    // Check if the two passwords match
    if (password !== reEnteredPassword) {
        passwordMatchError.textContent = "ERROR: Passwords do not match.";
        isValid = false;
    }

    return isValid;  // Return the validation result
}

// Validate first name
function validateFirstName() {
    var firstName = document.getElementById("firstName").value;
    var firstNameError = document.getElementById("firstNameError");
    firstNameError.textContent = "";
    var namePattern = /^[A-Za-z'-]+$/;

    if (!namePattern.test(firstName)) {
        firstNameError.textContent = "ERROR: Please enter a valid first name (letters, apostrophes, and dashes only).";
        return false;
    }
    return true;
}

// Validate Middle Initial
function validateMiddleInitial() {
     var middleInitial = document.getElementById("middleInitial").value;
    var middleInitialError = document.getElementById("middleInitialError");
    middleInitialError.textContent = "";

    if (middleInitial && !/^[A-Za-z]$/.test(middleInitial)) {
        middleInitialError.textContent = "ERROR: Middle initial must be a single letter.";
        return false;
    }
    return true;
}

// Validate last name
function validateLastName() {
    var lastName = document.getElementById("lastName").value;
    var lastNameError = document.getElementById("lastNameError");
    lastNameError.textContent = "";
    var lastNamePattern = /^[A-Za-z' -]{1,30}$/;

    if (!lastNamePattern.test(lastName)) {
        lastNameError.textContent = "ERROR: Please enter a valid last name (1 to 30 characters, letters, apostrophes, dashes only).";
        return false;
    }
    return true;
}

// Validate date of birth
function dobValidation() {
    const dob = document.getElementById("dateOfBirth").value;
    const date = new Date(dob);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 120);
    const error = document.getElementById("dob-error");
    error.textContent = "";

    if (date > new Date()) {
        error.textContent = "ERROR: Date cannot be in the future.";
        return false;
    } else if (date < maxDate) {
        error.textContent = "ERROR: Date cannot be more than 120 years ago.";
        return false;
    }

    return true;
}

// SSN Format Function
function formatSSN() {
    var ssnInput = document.getElementById("ssn");
    var ssnError = document.getElementById("ssnError");
    var input = ssnInput.value.replace(/\D/g, "").slice(0, 9);
    ssnInput.value = input.length > 0 ? input.slice(0, 3) + (input.length > 3 ? "-" + input.slice(3, 5) : "") + (input.length > 5 ? "-" + input.slice(5, 9) : "") : "";

    ssnError.textContent = input.length === 9 && !/^\d{3}-\d{2}-\d{4}$/.test(ssnInput.value) 
        ? "ERROR: Please enter a valid SSN in the format XXX-XX-XXXX." 
        : "";
}

// SSN Validation Function
function validateSSN() {
    var ssnInput = document.getElementById("ssn");
    var ssnError = document.getElementById("ssnError");
    var valid = ssnInput.value.replace(/\D/g, "").length === 9;
    ssnError.textContent = valid ? "" : "ERROR: Enter exactly 9 digits for a valid SSN.";
    return valid;
}

// Validate the address 1
function validateAddress() {
    var addressInput = document.getElementById("address1");
    var addressError = document.getElementById("addressError");
    var address = addressInput.value.trim();
   
    if (address.length < 2 || address.length > 30) {
        addressError.textContent = "ERROR: Address must be between 2 and 30 characters.";
        addressInput.setCustomValidity("Address must be between 2 and 30 characters.");
    } else {
        addressError.textContent = ""; 
        addressInput.setCustomValidity(""); 
    }
    return addressError.textContent === "";
}

// Validate Address 2 length (optional field)
function validateAddress2() {
    var address2Input = document.getElementById("address2");
    var address2Error = document.getElementById("address2Error");
    var address2 = address2Input.value.trim();

    if (address2.length > 0 && (address2.length < 2 || address2.length > 30)) {
        address2Error.textContent = "ERROR: Address 2 must be between 2 and 30 characters.";
        address2Input.setCustomValidity("Address 2 must be between 2 and 30 characters.");
    } else {
        address2Error.textContent = ""; 
        address2Input.setCustomValidity(""); 
    }
    return address2Error.textContent === "";
}

// Validate City 
function validateCity() {
    var cityInput = document.getElementById("city");
    var cityError = document.getElementById("cityError");
    var city = cityInput.value.trim();

    if (city.length < 2 || city.length > 30) {
        cityError.textContent = "ERROR: City must be between 2 and 30 characters.";
        cityInput.setCustomValidity("City must be between 2 and 30 characters.");
    } else {
        cityError.textContent = ""; 
        cityInput.setCustomValidity(""); 
    }
    return cityError.textContent === "";
}

// Validate Zip Code
function validateZipCode() {
    var zipCode = document.getElementById("zipCode").value.trim();
    var zipCodeError = document.getElementById("zipCodeError");
    zipCodeError.textContent = ""; 

    if (!/^\d{5}$/.test(zipCode)) {
        zipCodeError.textContent = "ERROR: Please enter a valid 5-digit Zip Code.";
        return false;
    }

    return true;
}

// Validate Email
function validateEmail() {
    var email = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    emailError.textContent = "";
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "ERROR: Please enter a valid email address (name@domain.tld).";
        return false;
    }
    userIDInput.value = userID.toLowerCase();
    document.getElementById("correctedEmail").textContent = userIDInput.value;

    return true;
}

document.getElementById('email').addEventListener('input', function() {
    this.value = this.value.toLowerCase();
});

// Format the phone number as xxx-xxx-xxxx
function formatPhoneNumber() {
    var phoneInput = document.getElementById("phoneNumber");
    var input = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    phoneInput.value = input.length > 0 ? input.slice(0, 3) + (input.length > 3 ? "-" + input.slice(3, 6) : "") + (input.length > 6 ? "-" + input.slice(6, 10) : "") : "";
}

// Validate phone number
function validatePhoneNumber() {
    var phoneInput = document.getElementById("phoneNumber");
    var phoneError = document.getElementById("phoneError");
    var valid = phoneInput.value.replace(/\D/g, "").length === 10;
    phoneError.textContent = valid ? "" : "ERROR: Please enter a valid 10-digit phone number.";
    return valid;
}

function validateForm() {
    let errorFlag = false; // Track if there are any errors

    // Clear previous error messages
    document.getElementById("genderError").textContent = '';
    document.getElementById("painError").textContent = '';

    // Validate Gender
    let gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        document.getElementById("genderError").textContent = "ERROR: Please select your gender.";
        errorFlag = true;
    }
    return !errorFlag;
}

    // Validate Pain Level
    let painLevel = document.getElementById('Slider').value;
    if (painLevel < 0 || painLevel > 10) {
        document.getElementById("painError").textContent = "ERROR: Please select a valid pain level between 0 and 10.";
        errorFlag = true;
    }

// Validate all form fields and return true if the form is valid, false otherwise
function checkFormValidity() {
    let isValid = true;

    // Check individual field validations
    isValid &= validateUserID();
    isValid &= validatePassword();
    isValid &= validatePasswordMatch();
    isValid &= validateFirstName();
    isValid &= validateMiddleInitial();
    isValid &= validateLastName();
    isValid &= dobValidation();
    isValid &= validateSSN();
    isValid &= validateAddress();
    isValid &= validateAddress2();
    isValid &= validateCity();
    isValid &= validateZipCode();
    isValid &= validateEmail();
    isValid &= validatePhoneNumber();

    return isValid;  // Return true if form is valid, false otherwise
}

function handleFormSubmit(event) {
            event.preventDefault();  // Prevent the form from submitting the usual way
            let formIsValid = validateForm();  // Call form validation
            
            if (formIsValid) {
                window.location.href = "./homework3-thankyou.html";  // Redirect to thank you page if valid
            }
        }

// Add event listeners to automatically check form validity on field changes
document.getElementById("userID").addEventListener("input", checkFormValidity);
document.getElementById("password").addEventListener("input", checkFormValidity);
document.getElementById("re_password").addEventListener("input", checkFormValidity);
document.getElementById("firstName").addEventListener("input", checkFormValidity);
document.getElementById("middleInitial").addEventListener("input", checkFormValidity);
document.getElementById("lastName").addEventListener("input", checkFormValidity);
document.getElementById("dateOfBirth").addEventListener("input", checkFormValidity);
document.getElementById("ssn").addEventListener("input", checkFormValidity);
document.getElementById("address1").addEventListener("input", checkFormValidity);
document.getElementById("address2").addEventListener("input", checkFormValidity);
document.getElementById("city").addEventListener("input", checkFormValidity);
document.getElementById("zipCode").addEventListener("input", checkFormValidity);
document.getElementById("email").addEventListener("input", checkFormValidity);
document.getElementById("phoneNumber").addEventListener("input", checkFormValidity);
document.getElementById("myForm").addEventListener("submit", handleFormSubmit);


// Run an initial validity check on page load
checkFormValidity()
