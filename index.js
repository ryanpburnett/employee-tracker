const inquirer = require('inquirer');
const mysql = require('mysql');
const chalk = require('chalk');
const cTable = require('console.table')

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

const choices = [
    "Add department",
    "Add employee",
    "Add role",
    "View departments",
    "View employees",
    "View roles",
    "Update employee roles",
    "End"
]

const questions = () => {
    inquirer
        .prompt([
            {
                type: "list",  
                message: chalk.blue("What would you like to do"),
                name: "options",
                choices: choices,
            }
        ]).then(answer => {
            if(answer.options === choices[0]) {
                addDepartment();
            }else if(answer.options === choices[1]){
                addEmployee();
            }else if(answer.options === choices[2]){
                addRole();
            }else if(answer.options === choices[3]){
                viewDepartments();
            }else if(answer.options === choices[4]){
                viewEmployees();
            }else if(answer.options === choices[5]){
                viewRoles();
            }else if(answer.options === choices[6]) {
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
                const sqlQuery2 = 
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first}", "${last}", "${id}", "${manager}");`
                connection.query(sqlQuery2, (err, res) => {
                    if(err) throw err
                    console.table(res)
                    questions()
                })
            }) 
        }

        function addRole() {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the new role id#?",
                    name: "id"
                },
                {
                    type: "input",
                    message: "What is the role title?",
                    name: "title"
                },
                {
                    type: "input",
                    message: "What is the role salary?",
                    name: "salary"
                },
                {
                    type: "input",
                    message: "What is the department id#?",
                    name: "deptId"
                },
            ]).then(answers => {
                const { id, title, salary, deptId } = answers
                const sqlQuery = 
                `INSERT INTO role (id, title, salary, department_id) VALUES ("${id}", "${title}", "${salary}", "${deptId}");`
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

        function viewRoles() {
            connection.query('SELECT * FROM role', (err, res) => {
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
            process.exit()
        }
}


