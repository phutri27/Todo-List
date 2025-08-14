import { Todos } from "./createProjectAndTodos.js";
import { projectFunction } from "./ProjectController.js";

let todos = [];

function addTodos(tasks, description, dueDate, priority, projectId){
    const project = projects.find(p => p.id === projectId); 
    const data = new Todos(tasks, description, dueDate, priority, project.id);
    todos.push(data);
}

function editTodosData(tasks, description, dueDate, priority, todosId){
    const index = todos.findIndex(b => b.id === todosId);
    todos[index].change(tasks, description, dueDate, priority);
}

function getTodos(){
    return todos.slice();
}