# Employee Tracker

[Description](#description)

[Licence](#license)

[Installation](#installation)

[Usage](#usage)

[Dependencies](#dependencies)

[Contributing](#contributing)

[GitHub Link](#github-link)


## Description
A CLI interface for adding and viewing employees, role, and departments in a business.

### License
GNU General Public Licence

### Installation
Run `npm i` in the terminal, and run schema.sql in Workbench, and you're good to go!

### Usage
On start, you will see various options.  Select the option you want with the arrow keys, and follow the prompts.  When done, hit "End".

```
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
```


### Dependencies
Inquirer, MySQL npm, Chalk, and console.table

### Contributing
Email Ryan at ryanpburnett@yahoo.com

### GitHub Link
github.com/ryanpburnett

The repo for this readme generator can be found on RPB's [Github](https://github.com/ryanpburnett/readme-generator) page.