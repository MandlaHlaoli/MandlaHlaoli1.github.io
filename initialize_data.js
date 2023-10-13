Initialize(); // Call the Initialize function to start the data retrieval and storage process.

function Initialize() {
  (async function () {
    try {
      // Backendless keys
      const APP_ID = '86DB0E86-6924-65CB-FF1F-99E061C5E700'; // Backendless Application ID
      const REST_API_KEY = '12735845-2C7C-40E5-8980-10559654CB2E'; // Backendless REST API Key

      // Thingspeak keys
      const channelID = '1761585'; // ThingSpeak channel ID
      const apiKey = '147VXUAFDWWKEOV2'; // ThingSpeak API Key
      const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&results=10`;
      // Build the URL for retrieving data from ThingSpeak. Adjust the number of results as needed.

      const response = await fetch(url); // Send an HTTP request to ThingSpeak to fetch data.
      if (!response.ok) {
        throw new Error('Failed to fetch data from ThingSpeak');
      }

      const data = await response.json(); // Parse the response as JSON.

       var sum = 0;
      // Map the fetched data into a more structured format.
      const records = data.feeds.map(feed => ({
        bottle_count330: parseInt(feed.field1),
        bottle_count500: parseInt(feed.field2),
        elevation: feed.field3,
        flow_rate: parseInt(feed.field4),
        water_level:parseInt(feed.field5),
        username: feed.field6,
        fullname:feed.field7,
        entry_id: parseInt(feed.entry_id),
        status: sum += parseInt(feed.field1) ,

      }));

     
// The status property now holds the sum of field1 values for all records
console.log(records);


      // Initialize Backendless with your application credentials.
      Backendless.initApp(APP_ID, REST_API_KEY);

      const tableName = 'PlantData'; // Define the table name where data will be stored in Backendless.

      // Iterate through the records and check if each one already exists in Backendless.
      for (const record of records) {
        const existingRecord = await Backendless.Data.of(tableName).findFirst({
          where: `entry_id = '${record.entry_id}'`,
        });

        if (existingRecord) {
          // If the record already exists in Backendless, log a message and skip it.
          console.log(`Record with entry_id ${record.entry_id} already exists. Skipping...`);
        } else {
          // If the record doesn't exist, save it in Backendless and log a message.
          await Backendless.Data.of(tableName).save(record);
          console.log(`Record with entry_id ${record.entry_id} inserted.`);
        }
      }
    } catch (error) {
      console.error('Error:', error); // Handle and log any errors that occur during the process.
    }
  })();
}
