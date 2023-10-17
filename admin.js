

    const APP_ID = '86DB0E86-6924-65CB-FF1F-99E061C5E700'; // Backendless Application ID
    const REST_API_KEY = '12735845-2C7C-40E5-8980-10559654CB2E'; // Backendless REST API Key
    // Initialize Backendless with your application ID and API key
    Backendless.initApp(APP_ID,REST_API_KEY);

    // Function to populate the table with data
   // Function to populate the table with data
function populateTable() {
    // Create a Backendless Data Query
    const query = Backendless.DataQueryBuilder.create();

    // Make a request to fetch data
    Backendless.Data.of('Orders').find(query)
        .then(function (orders) {
            // Get the table body to append rows
            const tbody = document.querySelector('#ord_table tbody');

            // Iterate through the retrieved data and populate the table
            orders.forEach(function (order) {
                const row = tbody.insertRow();
                row.insertCell(0).textContent = order.order_number;
                row.insertCell(1).textContent = order.fullname;
                row.insertCell(2).textContent = order.order_date;
                row.insertCell(3).textContent = order.quantity330ml;
                row.insertCell(4).textContent = order.quantity500ml;

                // Create the Status column with a dropdown
                const statusCell = row.insertCell(5);
                const statusDropdown = document.createElement('select');
                statusDropdown.innerHTML = `
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Packaging">Packaging</option>
                `;
                statusDropdown.value = order.status; // Set the selected option based on the order's status

                statusCell.appendChild(statusDropdown);

                // Create the Save column with a button
                const saveCell = row.insertCell(6);
                const saveButton = document.createElement('button');
                saveButton.textContent = 'Save';
                saveButton.classList.add('btn', 'btn-primary');
                saveButton.addEventListener('click', function () {
                    const newStatus = statusDropdown.value;
                    
                    updateOrderStatus(order.objectId, newStatus);
                });
                saveCell.appendChild(saveButton);
            });
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
}

function updateOrderStatus(orderId, newStatus) {
    const ordersTable = Backendless.Data.of('Orders');
    
    
    const updateObject = {
        status: newStatus
    };

    ordersTable.save({ objectId: orderId, ...updateObject })
        .then(function (updatedOrder) {
            console.log('Order status updated:', updatedOrder);
        })
        .catch(function (error) {
            console.error('Error updating order status:', error);
        });
}

    

   
    // Call the function to populate the table
    populateTable();

    

    document.addEventListener("DOMContentLoaded", function() {
        var logoutLink = document.getElementById("logoutLink");
      
        if (logoutLink) {
          logoutLink.addEventListener("click", function(event) {
            event.preventDefault();
      
            Backendless.UserService.logout()
              .then(() => {
                // User has been successfully logged out
                alert("clicked");
                window.location.href = "main.html"; 
                console.log("User logged out");
                clearViews(); 
                // You can redirect the user to a logout page or perform any other necessary actions.
              })
              .catch((error) => {
                console.error("Error logging out:", error);
              });
          });
        } else {
          console.error("Element with id 'logoutLink' not found.");
        }
      });
      



      // Thingspeak keys
      const channelID = '1761585'; // ThingSpeak channel ID
      const apiKey = '147VXUAFDWWKEOV2'; // ThingSpeak API Key
      const apiUrl = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&results=10`;
      // Build the URL for retrieving data from ThingSpeak. Adjust the number of results as needed.
/*
        
: parseInt(feed.field1),
        bottle_count500: parseInt(feed.field2),
        elevation: feed.field3,
        flow_rate: parseInt(feed.field4),
        water_level:parseInt(feed.field5),
        username: feed.field6,
        fullname:feed.field7,
        entry_id: parseInt(feed.entry_id),
        status: sum += parseInt(feed.field1) ,     
      }
      */

// Function to fetch data and populate the table
async function fetchDataAndPopulateTable() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            const tableBody = document.querySelector('#pant_table tbody');

            data.feeds.forEach(feed => {
                console.log("Retrieved");
                const row = tableBody.insertRow();

                row.insertCell(0).textContent = feed.entry_id;
                row.insertCell(1).textContent = feed.field1; 
                row.insertCell(2).textContent = feed.field2; 
                row.insertCell(3).textContent = feed.field3; 
                row.insertCell(4).textContent = feed.field4; 
                row.insertCell(5).textContent = feed.field5; 
                row.insertCell(6).textContent = feed.field6; 
                
            });
        } else {
            console.error('Error fetching data from ThingSpeak.');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
}

// Call the function to populate the table when the page loads
fetchDataAndPopulateTable();
