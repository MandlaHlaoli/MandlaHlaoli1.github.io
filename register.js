// Get references to the login and signup forms

 // Backendless keys
 const APP_ID = '86DB0E86-6924-65CB-FF1F-99E061C5E700'; // Backendless Application ID
 const REST_API_KEY = '12735845-2C7C-40E5-8980-10559654CB2E'; // Backendless REST API Key

const head = document.getElementById('head');

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Get references to the showSignup and showLogin buttons
const showSignupButton = document.getElementById("showSignup");
const showLoginButton = document.getElementById("showLogin");

// Add event listener to the "Sign Up" button to show the signup form
showSignupButton.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    head.innerHTML = 'SIGN UP';
});

// Add event listener to the "Back to Login" button to show the login form
showLoginButton.addEventListener("click", () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
    head.innerText = 'SIGN IN';
});

Backendless.initApp(APP_ID, REST_API_KEY);
const loginMessage = document.getElementById("loginMessage");

var isPassMatching = false;

document.getElementById('signup').addEventListener('click', function (e) {
    e.preventDefault(); 

    // Get user input values
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const signupPassword = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    
    if (signupPassword !== confirmPassword) {

        loginMessage.innerText ='Password do not match ';
        loginMessage.style.color = 'red';
        loginMessage.style.fontWeight = 'bold';
        loginMessage.style.display = "block";
        return;
    }

    
    const user = {
        email: email,
        password: signupPassword,
        fullname: fullname,
        role:'customer',
    };

   
    Backendless.UserService.register(user)
        .then(function (registeredUser) {            
            loginMessage.innerText = registeredUser['email'] +' Registration successful. You can now log in.';
            setTimeout(() => {
                loginMessage.textContent = '';
            }, 3000); 
            loginMessage.style.display = "block";
            loginMessage.style.color = 'green';
          
            signupForm.style.display = "none";
            loginForm.style.display = "block";
            clearViews();
        })
        .catch(function (error) {
            loginMessage.style.display = "block";
            loginMessage.innerText ='Registration failed: ' + error.message;
            loginMessage.style.color = 'red';
            loginMessage.style.fontWeight = 'bold';
        });
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    Backendless.UserService.login(username, password)
        .then(function (loggedInUser) {  
           
            if(loggedInUser['role']=='customer'){
            window.location.href = `dashboard.html?fullname=${loggedInUser['fullname']}&username=${loggedInUser['email']}`; 
            }
            else{
                window.location.href = `admin.html?fullname=${loggedInUser['fullname']}&username=${loggedInUser['email']}`; 
            }
            clearViews();  
        })
        .catch(function (error) {
            // Handle login errors
            loginMessage.style.display = "block";
            loginMessage.innerText ='Login failed: ' + error.message;
            loginMessage.style.color = 'red';
            loginMessage.style.fontWeight = 'bold';
        });
});

function clearViews(){
    document.getElementById('fullname').value = "";
    document.getElementById('email').value = "";
    document.getElementById('signupPassword').value = "";
    document.getElementById('confirmPassword').value = "";
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
}
