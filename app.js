const Engineer = require("./lib/Engineer");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "teamprofile.html");

const render = require("./lib/htmlRender");

const team = []


const quesitonsArray = [
    {
        type: "list",
        name: "role",
        message: "Select the role of the employee",
        choices: ["Manager", "Engineer", "Intern"]
    }
]

function promptUser(){
    const employeeInfo = [
        {
            type: "input",
            name: "name",
            message: "Enter Employee Name"
        },
        {
            type: "number",
            name: "id",
            message: "Enter Employee ID"
        },
        {
            type: "input",
            name: "email",
            message: "Enter Employee Email"
        },
    ]
    inquirer
    .prompt(quesitonsArray).then(answer => {
        switch(answer.role){
            case "Manager":
                addManager(employeeInfo)
                break
            case "Engineer":
                addEngineer(employeeInfo)
                break
            case "Intern":
                addIntern(employeeInfo)
                break
            default:
                createTeam()
        }
    })
}

function addManager(employeeInfo){
    employeeInfo.push({
        type: "input",
        name: "officeNumber",
        message: "Enter Manger office number"
    })
    inquirer
    .prompt(employeeInfo).then(answer =>{
        const newManager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber)
        team.push(newManager)
        console.log("A new manager was added!")
        console.log(team)
        promptUser()
    })
}

function addEngineer(employeeInfo){
    employeeInfo.push({
        type: "input",
        name: "github",
        message: "Enter Engineer Github"
    })
    inquirer
    .prompt(employeeInfo).then(answer =>{
        const newEngineer = new Engineer(answer.name, answer.id, answer.email, answer.github)
        team.push(newEngineer)
        console.log("A new engineer was added!")
        console.log(team)
        promptUser()
    })
}

function addIntern(employeeInfo){
    employeeInfo.push({
        type: "input",
        name: "school",
        message: "Enter Intern University"
    })
    inquirer
    .prompt(employeeInfo).then(answer =>{
        const newIntern = new Intern(answer.name, answer.id, answer.email, answer.school)
        team.push(newIntern)
        console.log("A new intern was added!")
        console.log(team)
        promptUser()
    })
}

promptUser();

function createTeam(){
    const content = render(team)
    fs.writeFile(outputPath, content, function(err){
        if (err){
            throw err
        }
        else{
            console.log("Team profile created!")
        }
    })
}