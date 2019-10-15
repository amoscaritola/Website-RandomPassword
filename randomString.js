// Enable pop-over
$(function () {
  $('[data-toggle="popover"]').popover()
});

// Hide pop over after 1 second
$('#copyBtn').popover().click(function () {
    setTimeout(function () {
        $('#copyBtn').popover('hide');
    }, 1000);
});

// Loop to set options for the password length
for (var i = 5; i < 25; i++) {
  $("#dropDown1").append('<option>' + i + '</option>');
}

// Get dropdown value for length of string to generate
function passwordLength(){
    return $("#dropDown1").val();
}

// global variables
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var capital_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var special_characters = "!#$%&";
var add_numbers = "123456789"

// Matches the two strings to see if they share any characters in no particular order
function compare_string_characters(string1, string2) {
	for (let i = 0; i < string1.length; i++) {
			if (string2.includes(string1[i])) {
				return true;
			}
	}
  for (let i = 0; i < string2.length; i++) {
			if (string1.includes(string2[i])) {
				return true;
			}
  }
	return false;
}

// Outputs a random string with length equal to input value
function stringGen(stringLength){
  //Check if boxes are checked off
  var upper_checked = $("#upperCase").prop('checked');
  var special_checked = $("#specialChar").prop('checked');
  var number_checked = $("#numbers").prop('checked');

  var character_bucket = "";
  character_bucket += alphabet;

  if (upper_checked) {
    character_bucket += capital_alphabet;
  }
  if (special_checked) {
    character_bucket += special_characters;
  }
  if (number_checked) {
    character_bucket += add_numbers;
  }

  var attempts = 0

  while (true) {
      var output = ""
      attempts += 1

      //prevent infinite loops by limiting reshuffle to 100 tries
      if (attempts > 100 ) {
        return "Please try again"
      }

      for (var i = 0; i < stringLength; i++) {
        var index = Math.floor(Math.random() * character_bucket.length);
        output += character_bucket[index];
      }

      if (!compare_string_characters(alphabet, output)) {
        console.log("lower case not found.. retrying");
        continue;
      }
      //Check if uppercase is active and in string
      if (upper_checked && !compare_string_characters(capital_alphabet, output)) {
        console.log("No capital found.. reshuffling");
        continue;
      }

      if (special_checked && !compare_string_characters(special_characters, output)) {
        console.log("No special found.. reshuffling");
        continue;
      }

      if (number_checked && !compare_string_characters(add_numbers, output)) {
        console.log("No numbers found.. reshuffling");
        continue;
      }

      break;
  }

  return output;

}

var outputBox = document.getElementById("passwordOutput");
var generateStringButton = document.getElementById('genPassBtn');

// Button to generate string and pass it to outputBox
generateStringButton.addEventListener('click',function(){
  if (passwordLength() === "Password Length...") {
    alert("Please select a password length")
  } else {
    outputBox.value = stringGen(passwordLength());
    console.log("Generated random string");
  }
})

// Copy string to clipboard function
function copyString() {
  var copyText = document.getElementById("passwordOutput");
  copyText.select();
  document.execCommand("copy");
}
