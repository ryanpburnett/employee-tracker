const inquirer = require('inquirer');
const mysql = require('mysql');
const chalk = require('chalk');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'code123',
    database: 'employee_tracker_db'
})

connection.connect(err => {
    if (err) throw err
    console.log(`Connected as id ${connection.threadId}`)
    questions()
})

// work on sanitizing inputs below

const questions = () => {
    inquirer
        .prompt([
            {
                type: "list",  
                message: chalk.blue("What would you like to do"),
                name: "options",
                choices: [
                    "Add department",
                    "Add employee",
                    "View departments",
                    "View employees",
                    "Update employee roles",
                    "End"
                ],
            }
        ]).then(answer => {
            const { options } = answer;
            if(options === "Add department") {
                addDepartment();
            }else if(options === "Add employee"){
                addEmployee();
            }else if(options === "View departments"){
                viewDepartments();
            }else if(options === "View employees"){
                viewEmployees();
            }else if(options === "Update employee roles") {
                updateEmployeeRoles();
            }else{
                end();
            }
        });

        function addDepartment() {
            inquirer.prompt(
                {
                    type: "input",
                    message: "What is the name of the new department?",
                    name: "newDept"
                },
            ).then(answer => {
                const sqlQuery = `INSERT INTO department (name) VALUES ("${answer.newDept}")`
                connection.query(sqlQuery, (err, res) => {
                    if(err) throw err
                    console.table(res)
                    questions()
                })
            }) 
        }
        // work on this one
        function addEmployee() {
            inquirer.prompt([
                {
                    type: "input",
                    message: "New employee first name?",
                    name: "first"
                },
                {
                    type: "input",
                    message: "New employee last name?",
                    name: "last"
                },
                {
                    type: "input",
                    message: "New employee ID?",
                    name: "id"
                },
                {
                    type: "input",
                    message: "New employee manager id?",
                    name: "manager"
                },
            ]).then(answers => {
                const { first, last, id, manager } = answers
                const sqlQuery = 
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first}", "${last}", "${id}", "${manager}");`
                connection.query(sqlQuery, (err, res) => {
                    if(err) throw err
                    console.table(res)
                    questions()
                })
            }) 
        }

        function viewDepartments() {
            connection.query('SELECT * FROM department', (err, res) => {
                if(err) throw err
                console.table(res)
                questions()
            })
        }

        function viewEmployees() {
            connection.query('SELECT * FROM employee', (err, res) => {
                if(err) throw err
                console.table(res)
                questions()
            })
        }

        function updateEmployeeRoles() {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Which employee's role would you like to update? (enter employee ID)",
                    name: "emp"
                },
                {
                    type: "input",
                    message: "what role would you like to update this employee to? (enter role id)",
                    name: "update"
                },
                ]).then(answers => {
                const { emp, update } = answers
                const sqlQuery = `UPDATE employee SET role_id = ${update} WHERE id = ${emp}`
                connection.query(sqlQuery, (err, res) => {
                    if(err) throw err
                    console.table(res)
                    questions()
                })
            }) 
        }

        function end() {
            console.log("see you later")
        }
}


