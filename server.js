// Import and require mysql2
const mysql = require("mysql2");
//Bring in Inquirer
const inquirer = require("inquirer");

// const queries = require("./queries")

//Bring table npm in
require("console.table")


// const Connection = require("mysql2/typings/mysql/lib/Connection");

const PORT = process.env.PORT || 3001;



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

// Query database

// let deletedRow = 2;

// const findAllDepartmentsPromise = () => {
//     queries.findAllDepartments()
//     .then(([results]) => {
//         let departments = results;
//         console.table(departments)
//     })
// }

// const findAllDepartments = () => {
//     db.query('SELECT * FROM departments', function (err, results) {
//         console.table(results);
//     });
// }


// db.query(`DELETE FROM favorite_books WHERE id = ?`,deletedRow, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// // Query database
// db.query('SELECT * FROM departments', function (err, results) {
//   console.table(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


//Prompts

// const cardtemplates = [];

//Make page then adds the cards after prompts
// function startItUp(){ memberPush();pageGenerator()}


//Opening intro prompt with functions to other prompts
function introPrompt(){
inquirer
  .prompt(
    {
      type: 'list',
      message: 'Which would you like to do?',
      name:"start_menu",
      choices:["View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee",
      "End"]
    })
   //Take what they choose and compare to the options in switch case. 
  .then((response) =>{
    switch(response.action){
      case "View all departments":
        viewAlldepartments();
        break;
      case "View all roles":
        viewAllroles();
        break;
      case "View all employees":
        viewAllemployees();
        break
      case "Add a department":
        addAdepartment();
        break
      case "Add a role":
        addArole();
        break
      case "Add an employee":
        addAemployee();
        break
      case "Update an employee":
        updateAemployee();
        break
      case "End":
        Quit();
        break


    }
  
  })
}

//Allows you to see the entire department
function viewAlldepartments(){

  //start chosen prompt that ask user for department
  const fdeptCommand = "SELECT * FROM department";
  connection.query(fdeptCommand,function(err,res){
    if(err) throw err;
    console.log(`ALL DEPARTMENTS: `);
    console.table(res);
    })
    introPrompt();
  }



//View all roles

function viewAllroles(){
  const froleCommand = "SELECT * FROM role";
  connection.query(froleCommand,function(err,res){
    if(err) throw err;
    console.log(`ALL ROLESS: `);
    console.table(res);
    })
    introPrompt();
}

//Query to find all employees

function viewAllemployees(){
  const femployeeCommand = "SELECT * FROM employee";
  db.query(femployeeCommand,function(err,res){
    if(err) throw err;
    console.log(`ALL EMPLOYEES: `);
    console.table(res);
    })
    introPrompt();
  }

  //Add a department

  function addAdepartment(){

    const addDept = "INSERT INTO department(name) VALUES (?)"

    inquirer.prompt({
      type: "input",
      message: "Enter department name: ",
      name: "department"
    }).then((response)=>{
      connection.query(addDept, response.department, function(err,res){
        console.log("Department added")
        introPrompt();
      })
    })
  }

  //Add role
  function addArole() {
    const addDept = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"

    inquirer.prompt({
      type: "input",
      message: "Enter the name of the role you are adding: ",
      name: "role"
    },
    {
      type: "input",
      message: "Enter the salary of this position: ",
      name: "salary"
    },
    {
      type: "input",
      message: "Enter the department of this position: ",
      name: "dept"
    }
    ).then((response)=>{
      connection.query(addDept, [response.title,response.salary, response.dept], function(err,res){
        if(err) throw err;
        console.log("Department added")
        introPrompt();
      })
    })


  }




  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
