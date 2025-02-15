// Define URLs for social media and contact information
var linkedin = "https://www.linkedin.com/company/proton-nmamit/";
var instagram = "https://www.instagram.com/proton_nmamit";
var github = "https://github.com/prashithshetty";

function getEmailUrl(email, subject, body) {
    const emailAddress = "proton.cybsec@nmamit.in";
    const emailSubject = "Contact from Terminal";
    const emailBody = "Hello PROTON Team,\n\n";
    
    // For Android, use mailto:
    if (/Android/i.test(navigator.userAgent)) {
        return `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    }
    // For iOS, also use mailto:
    else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        return `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    }
    // For desktop, use Gmail compose URL
    else {
        return `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    }
}

// Update email variable to be dynamic
var email = getEmailUrl();

var members = 'members'; // Placeholder for the path to the members page
var GUI = 'home'; // Placeholder for the path to the GUI home page

// About section content
about = [
  "<br>", // Line break
  "About Us", // Title
  "PROTON, the PRoactive Organisation for Threats and Online Networks, is a distinguished cybersecurity club within the", // Description line 
  "Department of Cybersecurity. We are dedicated to advancing the field of cybersecurity by empowering students to transform", 
  "innovative ideas into robust, real-world solutions. Our club nurtures a culture of vigilance and continuous improvement,", 
  "preparing the next generation of cybersecurity professionals to tackle emerging threats with confidence.",
  "     ", // Empty line for spacing
  "At Proton, we emphasize hands-on experience and practical skills essential for cybersecurity. We provide a platform for students to",  
  "engage in simulated cyber attacks, defense strategies, and vulnerability assessments, ensuring they are well-equipped to handle",  
  "the complexities of the digital world. Through capture-the-flag competitions, penetration testing exercises, and expert-led", 
  "workshops, we offer members the opportunity to sharpen their technical skills and stay ahead in the ever-evolving cybersecurity",
  "landscape.",
  "<br>" // Line break
];

// Social media links section
socialmedia = [
  "<br>", // Line break
  'linkedin       <a href="' + linkedin + '" target="_blank">click here' + "</a>", // LinkedIn link
  'instagram      <a href="' + instagram + '" target="_blank">click here' + '</a>', // Instagram link
  'github         <a href="' + github + '" target="_blank">click here' + "</a>", // GitHub link
  "<br>" // Line break
];

// Help section content
help = [
  "<br>",
  '<span class="command">home</span>          <span class="color2">Display the terminal banner</span>',
  '<span class="command">login</span>         <span class="color2">Login to terminal interface</span>',
  '<span class="command">logout</span>        Logs out the currently logged in user',  // Add this line
  '<span class="command">about</span>         About Proton', // Command description
  '<span class="command">members</span>       Open a page with proton members', // Command description
  '<span class="command">socialmedia</span>   Displays all our social media account links', // Command description
  '<span class="command">help</span>          Come on read it again', // Command description
  '<span class="command">contact</span>       Displays official email (don’t contact us we don’t actually care about you)', // Command description
  '<span class="command">clear</span>         Clear terminal', // Command description
  '<span class="command">gui</span>           Takes you to the graphical interface of the website (normal website);)', // Command description
  '<span class="command">get</span>           <span class="color2">Get member info (e.g., get john)</span>',
  "<br>",
];

// Login instructions
loginInstructions = [
    "<br>",
    "=== Terminal Login Instructions ===",
    "1. Enter your username and password on a single line",
    "2. Separate them with a space",
    "Example: username password",
    "Enter your credentials now:",
    "<br>"
];

// Home section content
home = [
  '<span class="color2">Welcome to PROTON Terminal</span>',
  '<span class="system">© 2025 PROTON. All rights reserved.</span>',
  "██████╗░██████╗░░█████╗░████████╗░█████╗░███╗░░██╗", // ASCII art line 1
  "██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗████╗░██║", // ASCII art line 2
  "██████╔╝██████╔╝██║░░██║░░░██║░░░██║░░██║██╔██╗██║", // ASCII art line 3
  "██╔═══╝░██╔══██╗██║░░██║░░░██║░░░██║░░██║██║╚████║", // ASCII art line 4
  "██║░░░░░██║░░██║╚█████╔╝░░░██║░░░╚█████╔╝██║░╚███║", // ASCII art line 5
  "╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░░░╚═╝░░░░╚════╝░╚═╝░░╚══╝", // ASCII art line 6
  '<span class="color2">Deal with the terminal,.</span>',
  '<span class="color2">Just type help homie u can do it.</span>',
  '<span class="color2">If you are using a mobile phone kindly tilt it to land scape mode.</span>', // Instruction for GUI access
  '<span class="system">Type "help" to see available commands</span>',
];



prashith = [
  "here you go good job beta, u deserve this",
  "▒▒▒▒▒▒▒▒▒▒▒▄▄▄▄░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "▒▒▒▒▒▒▒▒▒▄██████▒▒▒▒▒▄▄▄█▄▒▒▒▒▒▒▒▒▒▒",
  "▒▒▒▒▒▒▒▄██▀░░▀██▄▒▒▒▒████████▄▒▒▒▒▒▒",
  "▒▒▒▒▒▒███░░░░░░██▒▒▒▒▒▒█▀▀▀▀▀██▄▄▒▒▒",
  "▒▒▒▒▒▄██▌░░░░░░░██▒▒▒▒▐▌▒▒▒▒▒▒▒▒▀█▄▒",
  "▒▒▒▒▒███░░▐█░█▌░██▒▒▒▒█▌▒▒▒▒▒▒▒▒▒▒▀▌",
  "▒▒▒▒████░▐█▌░▐█▌██▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "▒▒▒▐████░▐░░░░░▌██▒▒▒█▌▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "▒▒▒▒████░░░▄█░░░██▒▒▐█▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "▒▒▒▒████░░░██░░██▌▒▒█▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "▒▒▒▒████▌░▐█░░███▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "▒▒▒▒▐████░░▌░███▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "▒▒▒▒▒████░░░███▒▒▒▒█▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "▒▒▒██████▌░████▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "▒▐████████████▒▒███▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "▒█████████████▄████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "██████████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "██████████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "█████████████████▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "█████████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "████████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
  "████████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
];











