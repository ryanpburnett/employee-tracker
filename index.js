const inquirer = require('inquirer');
const mysql = require('mysql');
const chalk = require('chalk')

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
            console.log("addDept")
        }
        function viewDepartments() {
            console.log("viewDept")
        }
        function updateEmployeeRoles() {
            console.log("updateEmp")
        }
        function end() {
            console.log("end")
        }
}

questions()