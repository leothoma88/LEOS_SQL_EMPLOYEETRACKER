const mysql = require("mysql2")

const db = mysql.createConnection(
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

const findAllDepartments= () => {
    return db.promise().query(
        "SELECT * FROM departments"
    );
}

module.exports = queries;