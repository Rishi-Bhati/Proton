// Get references to HTML elements
var before = document.getElementById("before"); // Element to insert new lines before
var liner = document.getElementById("liner"); // Element for the command line input
var command = document.getElementById("typer"); // Element to display the current command
var textarea = document.getElementById("texter"); // Textarea for user input
var terminal = document.getElementById("terminal"); // Terminal display area

// Initialize variables for command history and password handling
var git = 0; // Index for command history

var commands = []; // Array to store command history

// Start the command line interface after a short delay
setTimeout(function() {
  loopLines(home, "", 80); // Display the home
  textarea.focus(); // Focus on the textarea for user input
}, 100);

// Add an event listener for keyup events
window.addEventListener("keyup", enterKey);

// Clear the textarea and command display initially
textarea.value = "";
command.innerHTML = textarea.value;

// Function to handle keyup events
function enterKey(e) {
  // Reload the page if the F5 key (keyCode 181) is pressed
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  

    // Handle normal command input
    if (e.keyCode == 13) { // If Enter is pressed
      commands.push(command.innerHTML); // Add command to history
      git = commands.length; // Update command index
      addLine("user@proton:~$ " + command.innerHTML, "no-animation", 0); // Display command
      commander(command.innerHTML.toLowerCase()); // Process the command
      command.innerHTML = ""; // Clear command display
      textarea.value = ""; // Clear textarea
    }
    
    // Handle command history navigation
    if (e.keyCode == 38 && git != 0) { // Up arrow key
      git -= 1; // Move up in command history
      textarea.value = commands[git]; // Set textarea to previous command
      command.innerHTML = textarea.value; // Update command display
    }
    if (e.keyCode == 40 && git != commands.length) { // Down arrow key
      git += 1; // Move down in command history
      if (commands[git] === undefined) {
        textarea.value = ""; // Clear textarea if no more commands
      } else {
        textarea.value = commands[git]; // Set textarea to next command
      }
      command.innerHTML = textarea.value; // Update command display
    }
  }



// Function to process commands
function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "white margin", 80); // Display help information
      break;
    case "about":
      loopLines(about, "white margin", 80); // Display about information
      break;
    case "members":
      addLine("Opening GUI-PROTON...", "white", 80); // Notify opening members
      newTab(members); // Open members link in a new tab break;
      break;
    case "socialmedia":
      loopLines(socialmedia, "white margin", 80); // Display social media links
      break;
    case "contact":
      addLine('email        <a href="' + email + '" target="_blank">email' + "</a>", "white", 80); // Display contact email
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>'; // Clear terminal content
        before = document.getElementById("before"); // Reset before reference
      }, 1);
      break;
    case "home":
      loopLines(home, "", 80); // Display home lines
      break;
    case "gui":
      addLine("Opening GUI-INTERFACE...", "white", 0); // Notify opening GUI
      newTab(GUI); // Open GUI link in a new tab
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100); // Display command not found message
      break;
  }
}

// Function to open a new tab with the specified link
function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank"); // Open the link in a new tab
  }, 500);
}

// Function to add a new line to the terminal with a specified style and delay
function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;"; // Handle multiple spaces
      i++;
    } else {
      t += text.charAt(i); // Add character to the output string
    }
  }
  setTimeout(function() {
    var next = document.createElement("p"); // Create a new paragraph element
    next.innerHTML = t; // Set the inner HTML to the formatted text
    next.className = style; // Set the class name for styling

    before.parentNode.insertBefore(next, before); // Insert the new line before the 'before' element

    window.scrollTo(0, document.body.offsetHeight); // Scroll to the bottom of the terminal
  }, time);
}

// Function to loop through and display lines with a specified delay
function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time); // Add each line with a delay based on its index
  });
}