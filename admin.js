

    const APP_ID = '86DB0E86-6924-65CB-FF1F-99E061C5E700'; // Backendless Application ID
    const REST_API_KEY = '12735845-2C7C-40E5-8980-10559654CB2E'; // Backendless REST API Key
    // Initialize Backendless with your application ID and API key
    Backendless.initApp(APP_ID,REST_API_KEY);

    // Function to populate the table with data
    function populateTable() {
        // Create a Backendless Data Query
        const query = Backendless.DataQueryBuilder.create();

        
        // Make a request to fetch data
        Backendless.Data.of('Orders').find(query)
            .then(function(orders) {
                // Get the table body to append rows
                const tbody = document.querySelector('table tbody');

                // Iterate through the retrieved data and populate the table
                orders.forEach(function(order) {
                    const row = tbody.insertRow();
                    row.insertCell(0).textContent = order.order_number;
                    row.insertCell(1).textContent = order.fullname;
                    row.insertCell(2).textContent = order.order_date;
                    
                    row.insertCell(3).textContent = order.quantity330ml;
                    
                    row.insertCell(4).textContent = order.quantity500ml;
                });
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
            });
    }

    // Call the function to populate the table
    populateTable();

    var logoutLinki = document.getElementById("logoutLink");

    logoutLinki.addEventListener("click", function(event) {
        event.preventDefault();

        Backendless.UserService.logout()
        .then(() => {
          // User has been successfully logged out
          window.location.href = "main.html"; 
          console.log("User logged out");
         
          // You can redirect the user to a logout page or perform any other necessary actions.
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
      

        
       
    });