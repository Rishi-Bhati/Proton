var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];

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
        loopLines(banner, "", typingSpeed);
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
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("user@proton:~$ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
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
      
      break;
    case "about":
      loopLines(about, "color2 margin", 80);
      break;
  
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
      loopLines(loginInstructions, "color2 margin", 80);
      login();  // Just call login directly
      break;
    case "gui":
      addLine("Opening GUI-INTERFACE...", "color2", 0);
      newTab(GUI);
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}

function login() {
    if (loginStep === 0) {
        loopLines(loginInstructions, "color2 margin", 80);
        loginStep = 1;
        addLine("Please enter your username and password:", "system", 0);
    } else if (loginStep === 1) {
        const credentials = command.innerHTML.trim().split(' ');
        if (credentials.length !== 2) {
            addLine("Error: Please enter username and password separated by space", "error", 0);
            addLine("Example: username password", "system", 0);
            loginStep = 0;
            return;
        }

        // Create JSON data instead of FormData
        const loginData = {
            username: credentials[0],
            password: credentials[1]
        };

        fetch('/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
                'Accept': 'application/json'
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (response.status === 403) {
                throw new Error('CSRF verification failed');
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                addLine("Login successful! Welcome " + credentials[0], "success", 0);
                // Store user session or token if provided
                if (data.token) {
                    localStorage.setItem('userToken', data.token);
                }
                setTimeout(() => window.location.href = '/home/', 1500);
            } else {
                addLine(data.message || "Invalid username or password. Please try again.", "error", 0);
                loginStep = 0;
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            addLine("Login failed: " + error.message, "error", 0);
            loginStep = 0;
        });
    }
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


