// Import required packages
const express = require('express');
const mssql = require('mssql');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
const port = 3000; // You can change the port if needed

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// SQL Server database connection configuration
const sqlConfig = {
  user: 'fuelifyadmin',           // Replace with your SQL Server username
  password: 'YourSecurePassword123!',   // Replace with your SQL Server password
  server: 'fuelify-sql-server.database.windows.net', // Replace with your Azure SQL server name
  database: 'fuelifyDB',       // Replace with your database name
  options: {
    encrypt: true,             // Use encryption (set to false if not using encryption)
    trustServerCertificate: true // Set to true for self-signed certificates
  }
};

// Route to test database connection
app.get('/test-db', async (req, res) => {
  try {
    // Connect to the SQL Server
    await mssql.connect(sqlConfig);
    
    // Test query
    const result = await mssql.query`SELECT TOP 1 * FROM FuelRequests`;
    
    // Respond with the data
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to database:', err);
    res.status(500).send('Database connection failed');
  } finally {
    // Close the connection
    mssql.close();
  }
});

// Route to handle form submission (you can modify this for your contact form)
app.post('/submit-contact-form', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await mssql.connect(sqlConfig);

    // Insert form data into the FuelRequests table
    const result = await mssql.query`
      INSERT INTO FuelRequests (CustomerName, Email, PhoneNumber, Message)
      VALUES (${name}, ${email}, ${phone}, ${message})
    `;

    res.status(200).send('Form submitted successfully!');
  } catch (err) {
    console.error('Error inserting form data:', err);
    res.status(500).send('Failed to submit form data');
  } finally {
    mssql.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});