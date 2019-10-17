// global variables
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var capital_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var special_characters = "!#$%&";
var add_numbers = "0123456789"

var outputBox = document.getElementById("passwordOutput");
var generateStringButton = document.getElementById('genPassBtn');

// Loop to set options for the password length
for (var i = 5; i < 25; i++) {
  $("#dropDown1").append('<option>' + i + '</option>');
}

// Copy string to clipboard function
function copyString() {
  var copyText = document.getElementById("passwordOutput");
  copyText.select();
  document.execCommand("copy");
}

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

// Get dropdown value for length of string to generate
function passwordLength(){
    return $("#dropDown1").val();
}

function secureMathRandom() {
  // Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1
  return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}

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
  var lower_checked = $("#lowerCase").prop('checked');
  var upper_checked = $("#upperCase").prop('checked');
  var special_checked = $("#specialChar").prop('checked');
  var number_checked = $("#numbers").prop('checked');

  var character_bucket = "";
  var options_checked_count = 0;

  if (lower_checked) {
    character_bucket += alphabet;
    options_checked_count += 1
  }
  if (upper_checked) {
    character_bucket += capital_alphabet;
    options_checked_count += 1
  }
  if (special_checked) {
    character_bucket += special_characters;
    options_checked_count += 1
  }
  if (number_checked) {
    character_bucket += add_numbers;
    options_checked_count += 1
  }

  if (options_checked_count === 0) {
    return "Please check at least one option"
  }

  var attempts = 0

  while (true) {
      var output = "";
      attempts += 1

      //prevent infinite loops by limiting reshuffle to 100 tries
      if (attempts > 500 ) {
        return "Please try again";
      }

      for (var i = 0; i < stringLength; i++) {
        // var index = Math.floor(Math.random() * character_bucket.length);
        var index = Math.floor(secureMathRandom() * character_bucket.length);
        output += character_bucket[index];
      }

      var lc_in_string = compare_string_characters(alphabet, output);
      var uc_in_string = compare_string_characters(capital_alphabet, output);
      var sp_in_string = compare_string_characters(special_characters, output);
      var num_in_string = compare_string_characters(add_numbers, output);

      if (lower_checked) {
        if (!lc_in_string) {
          continue;
        }
      }

      if (upper_checked) {
        if (!uc_in_string) {
          continue;
        }
      }

      if (special_checked) {
        if (!sp_in_string) {
          continue;
        }
      }

      if (number_checked) {
        if (!num_in_string) {
          continue;
        }
      }

      break;

  }
  return output;
}

// Button to generate string and pass it to outputBox
generateStringButton.addEventListener('click',function(){
  if (passwordLength() === "Password Length...") {
    alert("Please select a password length")
  } else {
    outputBox.value = stringGen(passwordLength());
    console.log("Generated random string");
  }
});
