
// Loop to set options for the password length
for (var i = 2; i < 25; i++) {
  $("#dropDown1").append('<option>' + i + '</option>');
}


// Outputs a random string with length equal to input value
function stringGen(stringLength){
  var output = ""
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var capitalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var specialChar = "!#$%&";
  var addNumbers = "123456789"

  //Check if boxes are checked off
  var upperIsChecked = $("#upperCase").prop('checked');
  var specialIsChecked = $("#specialChar").prop('checked');
  var numbersIsChecked = $("#numbers").prop('checked');

  if (upperIsChecked) {
    alphabet += capitalAlphabet;
  }
  if (specialIsChecked) {
    alphabet += specialChar;
  }
  if (specialIsChecked) {
    alphabet += addNumbers;
  }

  for (var i = 0; i < stringLength; i++) {
    var index = Math.floor(Math.random() * alphabet.length);
    output += alphabet[index];
  }
  return output;

}

var outputBox = document.getElementById("passwordOutput");
var generateStringButton = document.getElementById('genPassBtn');

//Dropdown value
function passwordLength(){
    return $("#dropDown1").val();
}

// Button to generate string and pass it to outputBox
generateStringButton.addEventListener('click',function(){
  if (passwordLength() === "Password Length...") {
    alert("Please select a password length")
  } else {
    outputBox.value = stringGen(passwordLength());
    console.log("Generated Passcode");
  }
})

// Copy string to clipboard function
function copyString() {
  /* Get the text field */
  var copyText = document.getElementById("passwordOutput");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");
}
