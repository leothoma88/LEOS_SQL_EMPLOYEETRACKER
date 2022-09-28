
const inquirer = require("inquirer");
const queries = require('./queries')
require('console.table')

// Import and require mysql2
const mysql = require('mysql2');

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

let deletedRow = 2;

const findAllDepartmentsPromise = () => {
    queries.findAllDepartments()
    .then(([results]) => {
        let departments = results;
        console.table(departments)
    })
}

const findAllDepartments = () => {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
    });
}


db.query(`DELETE FROM favorite_books WHERE id = ?`,deletedRow, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Query database
db.query('SELECT * FROM departments', function (err, results) {
  console.table(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//Prompts

const cardtemplates = [];

//Make page then adds the cards after prompts
function startItUp(){ memberPush();pageGenerator()}


//Function that creates the prompts neccesary for the user to answer,but now just in one go
function memberPush(){
inquirer
  .prompt([
    {
      type: 'input',
      message: 'Enter name:',
      name:"name",
      validate: (value)=> {if(value){
          return true} else{return "Please insert value"}}
    },
    {
      type: 'input',
      message: 'Enter your id:',
      name:"id",
      validate: (value)=> {if(value){
        return true} else{return "Please insert value"}}
    },
    {
      type: 'input',
      message: 'Enter email',
      name: 'email',
      validate: (value)=> {if(value){
        return true} else{return "Please insert value"}}
    },
    {
      type: 'list',
      message: 'License:',
      choices:["Manager","Engineer","Intern"],
      name: 'role',
      validate: (value)=> {if(value){
          return true} else{return "Please insert value"}}
    },
      


  ])
  .then(({name,id,email,role}) =>{
//Takes over the only unshared attribute
    var extraInfo = "";
    if(role==="Manager"){
      extraInfo="Office number: "

    } else if (role=== "Engineer"){
      extraInfo="GitHub: "
    }else {
      extraInfo="School: " 

    }
//Continues the prompts after 
    inquirer
    .prompt([
        {
          type: 'input',
          message: `Please enter ${extraInfo}: `,
          name:"extraInfo",
          validate: (value)=> {if(value){
              return true} else{return "Please insert value"}}
        },
    { type: 'list',
    message: 'Are there any other members you would like to add?',
    choices:["yes","no"],
    name: "addmore"
   } ])

   .then(function({extraInfo,addmore}){
     console.log(name,id,email,"employeeinfo")
     var newadd;
     if(role=== "Manager"){
       newadd = new Manager(name,id,email,extraInfo);
     }else if (role === "Engineer"){
       newadd = new Engineer(name,id,email,extraInfo);
     } else{
       newadd = new Intern (name,id,email,extraInfo);
     }
//Giving the option of continuing or finishing up
     cardtemplates.push(newadd);
     //Picks which role we have pushes to the html
     addToHtmlBase(newadd)
     .then(function() {
       if(addmore === "yes"){
         memberPush();
       }else {
         completed();
       }
     });
   });
  });
}

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
