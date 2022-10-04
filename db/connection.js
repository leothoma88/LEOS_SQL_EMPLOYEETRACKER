// Import and require mysql2
const mysql = require("mysql2");

// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
  
      user: 'root',
      // TODO: Add MySQL password
      password: 'M05d10Y93!!!',
      database: 'employees_Database'
    },
    console.log(`Connected to the employees_Database.`)
  );


  module.exports = connection