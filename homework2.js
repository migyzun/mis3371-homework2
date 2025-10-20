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

// Update pain level display - FIXED: Changed "Slider" to "slider" (lowercase)
document.getElementById("slider").addEventListener("input", function() {
    const painLevel = this.value;
    document.getElementById("painValue").textContent = painLevel;
});

// NEW ENHANCED DISPLAY INPUT FUNCTION WITH VALIDATION AND FORMATTING
function displayInput() {
    // Run all validations first
    let validationResults = {
        userID: validateUserID(),
        password: validatePassword(),
        passwordMatch: validatePasswordMatch(),
        firstName: validateFirstName(),
        middleInitial: validateMiddleInitial(),
        lastName: validateLastName(),
        dob: dobValidation(),
        ssn: validateSSN(),
        address1: validateAddress(),
        address2: validateAddress2(),
        city: validateCity(),
        zipCode: validateZipCode(),
        email: validateEmail(),
        phoneNumber: validatePhoneNumber()
    };

    // Get form values
    let firstName = document.getElementById("firstName").value;
    let middleInitial = document.getElementById("middleInitial").value;
    let lastName = document.getElementById("lastName").value;
    let dob = document.getElementById("dateOfBirth").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phoneNumber").value;
    let address1 = document.getElementById("address1").value;
    let address2 = document.getElementById("address2").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zipCode = document.getElementById("zipCode").value;
    let userID = document.getElementById("userID").value;
    let password = document.getElementById("password").value;
    let description = document.getElementById("description").value;
    let painLevel = document.getElementById("slider").value;

    // Get radio button values
    let gender = document.querySelector('input[name="msex"]:checked');
    let maritalStatus = document.querySelector('input[name="marital_status"]:checked');
    let insurance = document.querySelector('input[name="insurance"]:checked');

    // Get checkbox values
    let heartDisease = document.getElementById("HeartDisease").checked;
    let measles = document.getElementById("Measles").checked;
    let meningitis = document.getElementById("Meningitis").checked;
    let hepatitis = document.getElementById("Hepatitis").checked;
    let cancer = document.getElementById("Cancer").checked;
    let other = document.getElementById("other").checked;
    let otherCondition = document.getElementById("otherCondition").value;

    // Build the review output
    let output = "<div class='review-container'>";
    output += "<h2 style='text-align: center; color: #1E3A5F;'>PLEASE REVIEW THIS INFORMATION</h2>";
    output += "<table class='review-table' style='width: 100%; border-collapse: collapse; margin: 20px 0;'>";

    // Personal Information Section
    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold;'>First, MI, Last Name</td>";
    output += "<td style='padding: 10px;'>" + firstName + " " + middleInitial + " " + lastName + "</td>";
    
    // Check name validations
    if (validationResults.firstName && validationResults.middleInitial && validationResults.lastName) {
        output += "<td style='padding: 10px; color: green;'>pass</td></tr>";
    } else {
        let nameErrors = [];
        if (!validationResults.firstName) nameErrors.push(document.getElementById("firstNameError").textContent);
        if (!validationResults.middleInitial) nameErrors.push(document.getElementById("middleInitialError").textContent);
        if (!validationResults.lastName) nameErrors.push(document.getElementById("lastNameError").textContent);
        output += "<td style='padding: 10px; color: red;'>" + nameErrors.join(", ") + "</td></tr>";
    }

    // Date of Birth
    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold;'>Date of Birth</td>";
    output += "<td style='padding: 10px;'>" + dob + "</td>";
    if (validationResults.dob) {
        output += "<td style='padding: 10px; color: green;'>pass</td></tr>";
    } else {
        output += "<td style='padding: 10px; color: red;'>" + document.getElementById("dob-error").textContent + "</td></tr>";
    }

    // Email
    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold;'>Email address</td>";
    output += "<td style='padding: 10px;'>" + email + "</td>";
    if (validationResults.email) {
        output += "<td style='padding: 10px; color: green;'>pass</td></tr>";
    } else {
        output += "<td style='padding: 10px; color: red;'>" + document.getElementById("emailError").textContent + "</td></tr>";
    }

    // Phone Number
    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold;'>Phone number</td>";
    output += "<td style='padding: 10px;'>" + phone + "</td>";
    if (validationResults.phoneNumber) {
        output += "<td style='padding: 10px; color: green;'>pass</td></tr>";
    } else {
        output += "<td style='padding: 10px; color: red;'>" + document.getElementById("phoneError").textContent + "</td></tr>";
    }

    // Address - Combined format
    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold; vertical-align: top;'>Address</td>";
    output += "<td style='padding: 10px;'>" + address1 + "<br>";
    if (address2) output += address2 + "<br>";
    output += city + ", " + state + " " + zipCode + "</td>";
    
    // Check address validations
    if (validationResults.address1 && validationResults.address2 && validationResults.city && validationResults.zipCode && state !== "") {
        output += "<td style='padding: 10px; color: green;'>pass</td></tr>";
    } else {
        let addressErrors = [];
        if (!validationResults.address1) addressErrors.push(document.getElementById("addressError").textContent);
        if (!validationResults.city) addressErrors.push(document.getElementById("cityError").textContent);
        if (!validationResults.zipCode) addressErrors.push(document.getElementById("zipCodeError").textContent);
        if (state === "") addressErrors.push("ERROR: Please select a state");
        output += "<td style='padding: 10px; color: red;'>" + addressErrors.join("<br>") + "</td></tr>";
    }

    // Requested Info Section
    output += "<tr><td colspan='3' style='text-align: center; padding: 20px 10px 10px 10px;'><h3 style='color: #1E3A5F;'>REQUESTED INFO</h3></td></tr>";

    // Medical Conditions (Checkboxes) in two columns
    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold; vertical-align: top;'>Medical History</td>";
    output += "<td colspan='2' style='padding: 10px;'>";
    output += "<table style='width: 100%;'><tr>";
    output += "<td style='width: 50%;'>";
    output += "Heart Disease: " + (heartDisease ? "Y" : "N") + "<br>";
    output += "Measles: " + (measles ? "Y" : "N") + "<br>";
    output += "Meningitis: " + (meningitis ? "Y" : "N") + "<br>";
    output += "</td><td style='width: 50%;'>";
    output += "Hepatitis: " + (hepatitis ? "Y" : "N") + "<br>";
    output += "Cancer: " + (cancer ? "Y" : "N") + "<br>";
    if (other && otherCondition) output += "Other: " + otherCondition + "<br>";
    output += "</td></tr></table>";
    output += "</td></tr>";

    // Radio button responses
    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold;'>Gender</td>";
    output += "<td style='padding: 10px;' colspan='2'>" + (gender ? gender.value : "Not selected") + "</td></tr>";

    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold;'>Marital Status</td>";
    output += "<td style='padding: 10px;' colspan='2'>" + (maritalStatus ? maritalStatus.value : "Not selected") + "</td></tr>";

    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold;'>Insurance</td>";
    output += "<td style='padding: 10px;' colspan='2'>" + (insurance ? insurance.value : "Not selected") + "</td></tr>";

    // Pain Level
    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold;'>Level of Pain indicated</td>";
    output += "<td style='padding: 10px;' colspan='2'>" + painLevel + " / 10</td></tr>";

    // Description/Symptoms
    if (description) {
        output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold; vertical-align: top;'>Described Symptoms</td>";
        output += "<td style='padding: 10px;' colspan='2'>" + description + "</td></tr>";
    }

    // User Credentials Section
    output += "<tr><td colspan='3' style='padding: 20px 10px 10px 10px;'><hr></td></tr>";
    
    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold;'>User ID</td>";
    output += "<td style='padding: 10px;'>" + userID + "</td>";
    if (validationResults.userID) {
        output += "<td style='padding: 10px; color: green;'>pass</td></tr>";
    } else {
        output += "<td style='padding: 10px; color: red;'>" + document.getElementById("userIDError").textContent + "</td></tr>";
    }

    output += "<tr><td style='text-align: right; padding: 10px; font-weight: bold;'>Password</td>";
    output += "<td style='padding: 10px;'>" + "*".repeat(password.length) + " (normally we wouldn't display this)</td>";
    if (validationResults.password && validationResults.passwordMatch) {
        output += "<td style='padding: 10px; color: green;'>pass</td></tr>";
    } else {
        let pwErrors = [];
        if (!validationResults.password) pwErrors.push(document.getElementById("passwordError").textContent);
        if (!validationResults.passwordMatch) pwErrors.push(document.getElementById("passwordMatchError").textContent);
        output += "<td style='padding: 10px; color: red;'>" + pwErrors.join("<br>") + "</td></tr>";
    }

    output += "</table>";
    output += "</div>";

    // Display the review
    document.getElementById("reviewArea").innerHTML = output;
}

// Update pain level function - NEW FUNCTION ADDED
function updatePainLevel(value) {
    document.getElementById("painValue").textContent = value;
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

    return true;
}


// Validate Password
function validatePassword() {
    var password = document.getElementById("password").value;
    var passwordError = document.getElementById("passwordError");
    var userID = document.getElementById("userID").value.toLowerCase();
    var firstName = document.getElementById("firstName").value.toLowerCase();
    var lastName = document.getElementById("lastName").value.toLowerCase();

    passwordError.textContent = ""; // Clear previous error message
    var isValid = true;  // Initialize validation flag

    // Pattern to check for at least one lowercase, one uppercase, one digit, and one special character
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_+=\\/><.,`~])/;

    // Check if the password meets the minimum length requirement
    if (password.length < 8 || password.length > 30) {
        passwordError.textContent = "ERROR: Password must be between 8 and 30 characters long.";
        isValid = false;
    } 
    // Check if the password contains at least one lowercase, one uppercase, one digit, and one special character
    else if (!passwordPattern.test(password)) {
        passwordError.textContent = "ERROR: Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.";
        isValid = false;
    }
    // Check if password contains double quotes (not allowed)
    else if (password.includes('"')) {
        passwordError.textContent = "ERROR: Password cannot contain double quotes.";
        isValid = false;
    }
    // Check if the password is the same as the Username (case-insensitive)
    else if (password.toLowerCase() === userID) {
        passwordError.textContent = "ERROR: Password cannot be the same as the Username.";
        isValid = false;
    }
    // Check if password contains part of username
    else if (userID.length > 0 && password.toLowerCase().includes(userID)) {
        passwordError.textContent = "ERROR: Password cannot contain your username.";
        isValid = false;
    }
    // Check if password contains first or last name
    else if (firstName.length > 0 && password.toLowerCase().includes(firstName)) {
        passwordError.textContent = "ERROR: Password cannot contain your first name.";
        isValid = false;
    }
    else if (lastName.length > 0 && password.toLowerCase().includes(lastName)) {
        passwordError.textContent = "ERROR: Password cannot contain your last name.";
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

    if (firstName.length < 1 || firstName.length > 30) {
        firstNameError.textContent = "ERROR: First name must be 1 to 30 characters.";
        return false;
    }
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
        return false;
    } else {
        addressError.textContent = ""; 
        addressInput.setCustomValidity(""); 
    }
    return true;
}

// Validate Address 2 length (optional field)
function validateAddress2() {
    var address2Input = document.getElementById("address2");
    var address2Error = document.getElementById("address2Error");
    var address2 = address2Input.value.trim();

    if (address2.length > 0 && (address2.length < 2 || address2.length > 30)) {
        address2Error.textContent = "ERROR: Address 2 must be between 2 and 30 characters.";
        address2Input.setCustomValidity("Address 2 must be between 2 and 30 characters.");
        return false;
    } else {
        address2Error.textContent = ""; 
        address2Input.setCustomValidity(""); 
    }
    return true;
}

// Validate City 
function validateCity() {
    var cityInput = document.getElementById("city");
    var cityError = document.getElementById("cityError");
    var city = cityInput.value.trim();

    if (city.length < 2 || city.length > 30) {
        cityError.textContent = "ERROR: City must be between 2 and 30 characters.";
        cityInput.setCustomValidity("City must be between 2 and 30 characters.");
        return false;
    } else {
        cityError.textContent = ""; 
        cityInput.setCustomValidity(""); 
    }
    return true;
}

// Validate Zip Code
function validateZipCode() {
    var zipCode = document.getElementById("zipCode").value.trim();
    var zipCodeError = document.getElementById("zipCodeError");
    zipCodeError.textContent = ""; 

    // Accept 5 digits or zip+4 format (12345-6789)
    if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
        zipCodeError.textContent = "ERROR: Please enter a valid 5-digit Zip Code.";
        return false;
    }

    // Truncate to 5 digits if longer
    if (zipCode.length > 5) {
        document.getElementById("zipCode").value = zipCode.substring(0, 5);
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

// Validate all form fields and return true if the form is valid, false otherwise
function checkFormValidity() {
    let isValid = true;

    // Check individual field validations
    isValid = validateUserID() && isValid;
    isValid = validatePassword() && isValid;
    isValid = validatePasswordMatch() && isValid;
    isValid = validateFirstName() && isValid;
    isValid = validateMiddleInitial() && isValid;
    isValid = validateLastName() && isValid;
    isValid = dobValidation() && isValid;
    isValid = validateSSN() && isValid;
    isValid = validateAddress() && isValid;
    isValid = validateAddress2() && isValid;
    isValid = validateCity() && isValid;
    isValid = validateZipCode() && isValid;
    isValid = validateEmail() && isValid;
    isValid = validatePhoneNumber() && isValid;

    return isValid;  // Return true if form is valid, false otherwise
}

function validateAndSubmit() {
    if (checkFormValidity()) {
        return true;
    } else {
        alert("Please correct all errors before submitting.");
        return false;
    }
}

// Add event listeners to automatically check form validity on field changes
document.getElementById("userID").addEventListener("blur", validateUserID);
document.getElementById("password").addEventListener("blur", validatePassword);
document.getElementById("re_password").addEventListener("blur", validatePasswordMatch);
document.getElementById("firstName").addEventListener("blur", validateFirstName);
document.getElementById("middleInitial").addEventListener("blur", validateMiddleInitial);
document.getElementById("lastName").addEventListener("blur", validateLastName);
document.getElementById("dateOfBirth").addEventListener("blur", dobValidation);
document.getElementById("ssn").addEventListener("blur", validateSSN);
document.getElementById("address1").addEventListener("blur", validateAddress);
document.getElementById("address2").addEventListener("blur", validateAddress2);
document.getElementById("city").addEventListener("blur", validateCity);
document.getElementById("zipCode").addEventListener("blur", validateZipCode);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("phoneNumber").addEventListener("blur", validatePhoneNumber);
