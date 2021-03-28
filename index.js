const inquirer = require('inquirer');
const mysql = require('mysql');
const chalk = require('chalk')

const questions = () => {
    inquirer
        .prompt([
            {
            // use "input" by default
            type: "checkbox",  
            message: chalk.blue("What's up man?"),
            choices: [
                {name: "idk nm"},
                {name: "workin' hard"},
                {name: "hardly workin'"},
            ],
            name: "whatsup"
            }
        ])
}

questions()