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
lastN.readOnly = true;
firstN.readOnly = true;
firstN.style.background = "#f2f2f2";
firstN.style.cursor = 'not-allowed';
lastN.style.background = "#f2f2f2";
lastN.style.cursor = 'not-allowed';

const APP_ID = '86DB0E86-6924-65CB-FF1F-99E061C5E700';
const REST_API_KEY = '12735845-2C7C-40E5-8980-10559654CB2E';

Backendless.initApp(APP_ID, REST_API_KEY);

document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const minNumber = 10000; 
        const maxNumber = 99999; 

        var random5DigitNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

        const quantity500ml = document.getElementById('quantity500ml').value;
        const quantity330ml = document.getElementById('quantity300ml').value;

        const orderData = {
            quantity500ml: quantity500ml,
            quantity330ml: quantity330ml,
            username: userN,
            fullname: fullNames,
            order_number: random5DigitNumber,
            status: 'Received',
            order_date: new Date().toISOString().split('T')[0],
        };

        
        Backendless.Data.of('Orders').save(orderData)
            .then(savedOrder => {
                displaySuccessMessage();
                clearViews();
                updateTable(); 
                console.log(savedOrder + " Successfully saved!!")
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to save data to Backendless. {}' + error);
            });
    });

    var logoutLink = document.getElementById("logoutLink");

    logoutLink.addEventListener("click", function (event) {
        event.preventDefault();

        Backendless.UserService.logout()
            .then(() => {
                window.location.href = "main.html";
                console.log("User logged out");
                clearViews();
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    });

    function clearViews() {
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

    function updateTable() {
        const query = Backendless.DataQueryBuilder.create();
        query.setWhereClause(`username = '${userN}'`);

        Backendless.Data.of('Orders').find(query)
            .then(function (orders) {
                const tbody = document.querySelector('#tablee tbody');
                tbody.innerHTML = ''; // Clear the table before updating

                orders.forEach(function (order) {
                    const row = tbody.insertRow();
                    row.insertCell(0).textContent = order.order_number;
                    row.insertCell(1).textContent = order.order_date;
                    row.insertCell(2).textContent = order.quantity330ml;
                    row.insertCell(3).textContent = order.quantity500ml;
                    row.insertCell(4).textContent = order.status;
                });
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    }
    updateTable();
});
