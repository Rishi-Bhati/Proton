// Function to get an element by its ID
function $(elid) {
  return document.getElementById(elid); // Returns the element with the specified ID
}

// Variable to hold the cursor element
var cursor;

// Set the window's onload event to initialize the cursor
window.onload = init;

// Function to initialize the cursor position
function init() {
  cursor = $("cursor"); // Get the cursor element
  cursor.style.left = "0px"; // Set the initial position of the cursor to the leftmost side
}

// Function to convert new line characters to HTML line breaks
function nl2br(txt) {
  return txt.replace(/\n/g, ''); // Replace newline characters with an empty string (removes them)
}

// Function to update the text displayed in the "typer" element
function typeIt(from, e) {
  e = e || window.event; // Get the event object
  var w = $("typer"); // Get the element where the text will be displayed
  var tw = from.value; // Get the current value from the input element
  w.innerHTML = nl2br(tw); // Update the inner HTML of the "typer" element with the input value
}

// Function to move the cursor left or right based on key presses
function moveIt(count, e) {
  e = e || window.event; // Get the event object
  var keycode = e.keyCode || e.which; // Get the key code of the pressed key
  // Move cursor left if the left arrow key is pressed and it's within bounds
  if (keycode == 37 && parseInt(cursor.style.left) >= (0 - ((count - 1) * 10))) {
      cursor.style.left = parseInt(cursor.style.left) - 10 + "px"; // Move cursor left by 10 pixels
  } 
  // Move cursor right if the right arrow key is pressed and it's within bounds
  else if (keycode == 39 && (parseInt(cursor.style.left) + 10) <= 0) {
      cursor.style.left = parseInt(cursor.style.left) + 10 + "px"; // Move cursor right by 10 pixels
  }
}

// Custom alert function that logs messages to the console
function alert(txt) {
  console.log(txt); // Log the provided text to the console
}