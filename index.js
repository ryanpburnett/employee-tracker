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
    runInquirer()
})

function runInquirer() {
    const questions = () => {
        inquirer
            .prompt([
                {
                    type: "list",  
                    message: chalk.blue("What would you like to do"),
                    name: "options",
                    choices: [
                        "Add department",
                        "View departments",
                        "Update employee roles",
                        "End"
                    ],
                }
            ]).then(answer => {
                const { options } = answer;
                if(options === "Add department") {
                    addDepartment();
                }else if(options === "View departments"){
                    viewDepartments();
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
                    })
                }) 
            }
            function viewDepartments() {
                console.log("viewDept")
                runInquirer()
            }
            function updateEmployeeRoles() {
                console.log("updateEmp")
            }
            function end() {
                console.log("see you later")
            }
    }
    questions()
}
