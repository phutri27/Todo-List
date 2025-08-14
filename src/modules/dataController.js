import { Project, Todos } from "./createProjectAndTodos.js";


let projects = [];
let todos = [];

function addProject(name){
    const data = new Project(name);
    projects.push(data);
    return data.getProjectId();
}

function addTodos(tasks, description, dueDate, priority, projectId){
    const project = projects.find(p => p.id === projectId); 
    const data = new Todos(tasks, description, dueDate, priority, project.id);
    todos.push(data);
}

function deleteProject(projectId){
    const index = projects.findIndex(p => p.id === projectId);
    projects.splice(index, 1);
}

function changeTodosData(tasks, description, dueDate, priority){
    
}