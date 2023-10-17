// Get the username from the URL parameter

const urlParams = new URLSearchParams(window.location.search);
const fullNames = urlParams.get('fullname');
const userN = urlParams.get('username');

document.getElementById('usernameDisplay').textContent = `Welcome, ${fullNames} !`;

const firstN = document.getElementById('firstName');
const lastN = document.getElementById('lastName');

const inputString = fullNames;
const parts = inputString.split(" ");


firstN.value = parts[0];
lastN.value = parts[1];
lastN.readOnly  = true;
firstN.readOnly  = true;
firstN.style.background = "#f2f2f2";
firstN.style.cursor = 'not-allowed';
lastN.style.background = "#f2f2f2";
lastN.style.cursor = 'not-allowed';




document.addEventListener('DOMContentLoaded', function () {

    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const minNumber = 10000; // Minimum 5-digit number
const maxNumber = 99999; // Maximum 5-digit number

var random5DigitNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        
        const quantity500ml = document.getElementById('quantity500ml').value;
        const quantity330ml = document.getElementById('quantity300ml').value;
  
        const orderData = {
            quantity500ml: quantity500ml,
            quantity330ml: quantity330ml,
            username: userN,
            fullname: fullNames,
            order_number:random5DigitNumber,
            status:'Recieved',
            order_date: Date().toLocaleString().split(' ').slice(1, 4).join(' '),
        };

    
        Backendless.Data.of('Orders').save(orderData)
            .then(savedOrder => {
                displaySuccessMessage();
                clearViews();
                Initialize();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to save data to Backendless.');
            });
    });
});


var logoutLink = document.getElementById("logoutLink");

        logoutLink.addEventListener("click", function(event) {
            event.preventDefault();

            Backendless.UserService.logout()
            .then(() => {
              // User has been successfully logged out
              window.location.href = "main.html"; 
              console.log("User logged out");
              clearViews(); 
              // You can redirect the user to a logout page or perform any other necessary actions.
            })
            .catch((error) => {
              console.error("Error logging out:", error);
            });
          

            
           
        });

function clearViews(){
                document.getElementById('quantity500ml').value = "";
                document.getElementById('quantity300ml').value = "";
}
 
function displaySuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = 'Order placed successfully!';
    successMessage.style.color = 'green';
    successMessage.style.fontSize = 11;
    successMessage.style.borderBlock = true;
    
    setTimeout(() => {
        successMessage.textContent = '';
    }, 5000); 
}


