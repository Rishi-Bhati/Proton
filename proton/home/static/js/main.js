var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];
var currentUser = 'user'; // Default username

var loginStep = 0;
var loginCredentials = {
    username: '',
    password: ''
};

// Add mobile detection and optimization
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
    // Adjust typing speed for mobile
    const typingSpeed = 40; // Faster typing on mobile
    
    // Update existing setTimeout functions
    setTimeout(function() {
        loopLines(home, "", typingSpeed);
        textarea.focus();
    }, 100);

    // Add touch event handlers
    textarea.addEventListener('touchstart', function(e) {
        this.focus();
    });

    // Prevent zoom on input
    textarea.addEventListener('focus', function(e) {
        document.body.style.fontSize = '16px';
    });

    // Auto-scroll to bottom on mobile
    function scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    // Update addLine function for mobile
    const originalAddLine = addLine;
    addLine = function(text, style, time) {
        originalAddLine(text, style, time);
        setTimeout(scrollToBottom, time + 50);
    };
} else {
    setTimeout(function() {
        loopLines(banner, "", 80);
        textarea.focus();
    }, 100);
}

window.addEventListener("keyup", enterKey);

textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (e.keyCode == 13) { // Enter key
    const inputText = command.innerHTML;
    commands.push(inputText);
    git = commands.length;
    addLine(`${currentUser}@proton:~$ ${inputText}`, "no-animation", 0); // Modified line

    // Check if we're in login mode
    if (loginStep === 1) {
      handleLoginInput(inputText);
    } else {
      commander(inputText.toLowerCase());
    }
    
    command.innerHTML = "";
    textarea.value = "";
  }
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    if (textarea.value === password) {
      pwd = true;
    }
    if (pwd && e.keyCode == 13) {
      loopLines(secret, "color2 margin", 120);
      command.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine("Wrong password", "error", 0);
      command.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}
loopLines(home, "", 80);
  
function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "about":
      loopLines(about, "color2 margin", 80);
      break;
    case "prashith":
      addLine("aahhh u found out an easter egg kudos , sha bash ma homie u deserve to get kissed", "color2", 80);
    case "members":
      addLine("Opening GUI-PROTON...", "color2", 80);
      newTab(members);
      break;
    case "socialmedia":
      loopLines(socialmedia, "color2 margin", 80);
      break;
    case "contact":
      addLine( 'email        <a href="' + email + '" target="_blank">email' + "</a>", "color2", 80);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "home":
      loopLines(home, "", 80);
      break;
    case "login":
      loginStep = 0; // Reset login step
      login(); 
      break;
    case "gui":
      addLine("Opening GUI-INTERFACE...", "color2", 0);
      newTab(GUI);
      break;
    case "logout":
      fetch('/accounts/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        credentials: 'same-origin'
      })
      .then(response => {
        if (response.ok) {
          currentUser = 'user'; // Reset username to default after logout
          updatePrompt('user'); // Reset prompt to default
          addLine("Logout successful! Redirecting to fresh terminal...", "success", 0);
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          addLine("Logout failed. Please try again.", "error", 0);
        }
      })
      .catch(error => {
        console.error('Logout error:', error);
        addLine("Logout failed: Network or server error", "error", 0);
      });
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}

function handleLoginInput(input) {
  const credentials = input.trim().split(' ');
  
  if (credentials.length !== 2) {
    addLine("Error: Please enter both username and password", "error", 0);
    addLine("Example: username password", "system", 0);
    return;
  }

  const username = credentials[0];
  const password = credentials[1];

  fetch('/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': getCSRFToken(),
      'Accept': 'application/json'
    },
    credentials: 'same-origin',
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      currentUser = username; // Set the current username after successful login
      loginStep = 0; // Reset login step to exit login mode
      updatePrompt(username); // Update the prompt with the new username
      addLine(`Login successful! Welcome ${username}`, "success", 0);
      addLine("Type 'help' for available commands", "system", 0);
    } else {
      addLine(`Login failed: ${data.message}`, "error", 0);
      loginStep = 0; // Reset login step on failure
    }
  })
  .catch(error => {
    console.error('Login error:', error);
    addLine("Login failed: Network or server error", "error", 0);
    loginStep = 0; // Reset login step on error
  });
}

function login() {
  loginStep = 1; // Set login mode
  loopLines(loginInstructions, "color2 margin", 80);
}

function getCSRFToken() {
    const csrfCookie = document.cookie.split(';')
        .find(cookie => cookie.trim().startsWith('csrftoken='));
    if (csrfCookie) {
        return csrfCookie.split('=')[1];
    }
    // Fallback to meta tag
    const csrfElement = document.querySelector('[name=csrfmiddlewaretoken]');
    return csrfElement ? csrfElement.value : '';
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}

// Add this function to update the prompt
function updatePrompt(username) {
    const liner = document.getElementById("liner");
    liner.setAttribute('data-prompt', `${username}@proton:~$ `);
}

// Add this at the end of the file to set initial prompt
document.addEventListener('DOMContentLoaded', function() {
    updatePrompt('user');
});


