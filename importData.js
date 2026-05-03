require('dotenv').config();
const { MongoClient } = require('mongodb');

// Retrieve the connection string from the .env file
const uri = process.env.MONGODB_URI;

// Check if MONGODB_URI is provided
if (!uri || uri === 'your_mongodb_connection_string_here') {
  console.error("Please update your .env file with your actual MongoDB connection string.");
  process.exit(1);
}

const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to MongoDB.");

    // You can specify your database name here, or it will use the one from the URI
    // For example: const db = client.db("contactsApp");
    const db = client.db(); 
    
    // Create or select the "contacts" collection
    const collection = db.collection('contacts');

    // Define the three documents to insert
    const contactsToInsert = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        favoriteColor: "Blue",
        birthday: "1990-05-14"
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        favoriteColor: "Green",
        birthday: "1992-08-22"
      },
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        favoriteColor: "Purple",
        birthday: "1988-11-03"
      }
    ];

    // Insert the documents
    const result = await collection.insertMany(contactsToInsert);
    
    console.log(`${result.insertedCount} documents were inserted into the 'contacts' collection.`);
  } catch (err) {
    console.error("An error occurred connecting to MongoDB:", err);
  } finally {
    // Close the connection
    await client.close();
  }
}

run().catch(console.dir);
