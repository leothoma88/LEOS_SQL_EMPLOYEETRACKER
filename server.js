//Bring in Inquirer
const inquirer = require("inquirer");
const { format } = require("./db/connection");

const connection = require("./db/connection")


// const queries = require("./queries")

//Bring table npm in
require("console.table")


// const Connection = require("mysql2/typings/mysql/lib/Connection");

const PORT = process.env.PORT || 3001;

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
  .then(({start_menu}) =>{
    switch(start_menu){
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
        updateAemployeerole();
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
    console.log(`ALL ROLES: `);
    console.table(res);
    })
    introPrompt();
}

//Query to find all employees

function viewAllemployees(){
  const femployeeCommand = "SELECT * FROM employee";
  connection.query(femployeeCommand,function(err,res){
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

    //Make array of departments

    function populatedepts(){
      connection.query("SELECT * FROM department", function (err,data){
        if(err) throw err;
        for(i=0;i<data.length;i++){
          Alldepartments.push({value: data[i].id ,name: data[i].name})
        }
      })
    }

    var Alldepartments= [];


    populatedepts()



    const addDept = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"

    inquirer.prompt([{
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
      type: "list",
      message: "Enter the department of this position: ",
      choices: Alldepartments,
      name: "dept"
    }]
    ).then((response)=>{
      console.log(response)
      connection.query(addDept, [response.role,response.salary, response.dept], function(err,res){
        if(err){
          console.log(err)
         throw err;}
        console.log("Department added")
        introPrompt();
      })
    })


  }

  //Add employees
  function addAemployee()
  {
    const pullroles = 'SELECT * FROM role'
    connection.query(pullroles, function(err, data) {
      if (err) throw (err);
    
    
      const roleChoices = data.map(({ id, title,salary }) => ({
        salary:`${salary}`,
        name: `${title}`,
        value: id,
      }));

    inquirer.prompt([{
      type: "input",
      message: "Enter the first name of the employee you are adding: ",
      name: "first_name"
    },
    {
      type: "input",
      message: "Enter the last name of the employee you are adding: ",
      name: "last_name"
    },
    {
      type: "list",
      message: "What is the role of this employee: ",
      name: "role_id",
      choices:roleChoices
    }]
  ).then((response)=>{
    const employeeInsert = `INSERT INTO employee SET ?`
      connection.query(employeeInsert, {first_name: response.first_name,last_name: response.last_name, role_id: response.role_id,manager_id: response.manager_id}, 
        function(err,res){
        if(err) throw err;
        console.log("Employee added");
        console.table(res)
        introPrompt();
      })
    })


  }
    )}

    //Update an employee

    function updateAemployeerole(){

      var itsquery =
    `SELECT role.id, role.title, role.salary 
  FROM role`

  var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    JOIN employee m
    ON m.id = e.manager_id`

      
      connection.query(query, function (err, data) {
        if (err) throw err;
    
        const employeeChoices = data.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        }));

      

      connection.query(itsquery, function (err, data) {

        if (err) throw err;

        const roleChoices = data.map(({ id, title,salary }) => ({
          salary:`${salary}`,
          name: `${title}`,
          value: id,
        }));
      
        // console.table(res);
        // console.log("employeeArray To Update!\n")
    
        // roleArray(employeeChoices);
      
      inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee do you want to update?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to update?",
        choices: roleChoices
      },
    ])
    .then(function (response) {

      var updateQuery = `UPDATE employee SET role_id = ? WHERE id = ?`

      connection.query(updateQuery,[
        response.roleId,
        response.employeeId
      ],
        function(err,res){
          if(err) throw err;
          console.table(res);
          console.log("UPDATED")

          introPrompt();
        });

       


    ;
    
  });
  });
  });
}

//Quit
function Quit(){

  process.exit()
}

  introPrompt()
  // app.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`);
  // });

