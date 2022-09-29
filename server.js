
const inquirer = require("inquirer");
const queries = require("./queries")
require("console.table")

// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;



// Connect to database
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

//These are the cards being added to the made array of html
function addToHtmlBase(employees){
 
  return new Promise (function (resolve,reject){
    
    let name =employees.getName();
    let role = employees.getRole();
    let id = employees.getId();
    let email = employees.getEmail();

    let data = "";

    if(role === "Manager"){
      let officePHone = employees.getOfficeNumber();
      data = `<div class="card employee-card manager-card">
      <div class="card-header text-center">
          <h2 class="card-title">${name}</h2>
          <h4 class="card-title"><span class="material-symbols-outlined">
              coffee
              </span>Manager </h4>
      </div>
      <div class="card-body bg-light">
          <ul class="list-group text-dark">
              <li class="list-group-item">ID:${id}</li>
              <li class="list-group-item">Email: <a href="${email}">${email}</a></li>
              <li class="list-group-item">Office number: <a href="${officePHone}">${officePHone}</a></li>
          </ul>
      </div>
  </div>`

    }else if(role=== "Engineer"){
      let gitHub = employees.getGithub();
      data = `<div class="card employee-card engineer-card">
      <div class="card-header text-center">
          <h2 class="card-title">${name}</h2>
          <h4 class="card-title"><span class="material-symbols-outlined">smart_toy
              </span>
              Engineer</h4>
      </div>
      <div class="card-body bg-light">
          <ul class="list-group text-dark">
              <li class="list-group-item">ID:${id}</li>
              <li class="list-group-item">Email: <a href="${email}">${email}</a></li>
              <li class="list-group-item">GitHub: <a href="https://github.com/${gitHub}" target="_blank" rel="">${gitHub}</a></li>
          </ul>
      </div>
  </div>`
    }else {
      let school = employees.getSchool();
      data = `
      <div class="card employee-card intern-card">
            <div class="card-header text-center">
                <h2 class="card-title">${name}</h2>
                <h4 class="card-title"><span class="material-symbols-outlined">
                    school
                    </span>
                    Intern</h4>
            </div>
            <div class="card-body bg-light">
                <ul class="list-group text-dark">
                    <li class="list-group-item">ID:${id}</li>
                    <li class="list-group-item">Email: <a href="${email}">${email}</a></li>
                    <li class="list-group-item">School:${school}</li>
                </ul>
            </div>
        </div>

      `
    }
    fs.appendFile("./dist/index.html",data,function(err){
      if(err){
        return reject(err);
      };
      return resolve();
    })
    

  })
}

// Makes the original html
   function pageGenerator(){
  let basepage =`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
  
  
      <title>My Team Profile</title>
      
  </head>
  <body>
      <body>
          <!-- Need header -->
          <header class="container-fluid">
              <div class="row">
                  <div class="bg-dark col-12 jumbotron text-white ">
                      <h1 class="text-center">My Team</h1>
                  </div>
              </div>
          </header>
  
          <div class="container">
              <div class="row">
                  <div class="main-section col-12 d-flex justify-content-center">`

  fs.writeFile(`./dist/index.html`,basepage,(err)=>{
    if(err){
      console.log(err)
    }
  })
   }

   function completed(){
    const basepage =` </div>
    </div>

    </body>
    </html>`;
    fs.appendFile("./dist/index.html", basepage, function (err) {
      if (err) {
          console.log(err);
      };
  });
  console.log("done");
   }


   startItUp();
