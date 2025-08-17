import { Project} from "./createProjectAndTodos.js";
import { todoFunction } from "./TodosController.js";

let projects = loadProject();

function projectControl(){
    const findIndex = (projectId) => {
        const index = projects.findIndex(p => p.id === projectId);
        if (index === -1)
            return;
        return index;
    }
    const addProject = (name) => {
        const data = new Project(name);
        if (projects.find(p => p.name === name)){
            console.log("Project name have already exists");
            return false;
        }
        projects.push(data);
        saveProject();
        return true;
    }

    const deleteProject = (projectId) => {
        const index = findIndex(projectId);
        if (index === -1) return;
        projects.splice(index, 1);
        saveProject();
    }

    const editProject = (projectId, name) => {
        const index = findIndex(projectId);
        if (index === -1) return;
        projects[index].setProjectName(name);
        saveProject();
    }

    const getProjects = ()=>{
        return projects.slice();
    }

    const getProject = (projectId) =>{
        const i = findIndex(projectId);
        return projects[i];
    }

    const linkTodoAndProject = (projectId) => {
        const todos = todoFunction.getTodos();
        const todosArray = [];
        todos.forEach((todo)=>{
            if (todo.projectId === projectId)
                todosArray.push(todo);
        })
        return todosArray.slice();
    }
    
    const saveProject = () => {
        localStorage.setItem("projects", JSON.stringify(projects.slice()));
    }
    
    return {
        findIndex,
        addProject,
        deleteProject,
        editProject,
        getProjects,
        getProject,
        linkTodoAndProject
    }
    
}

function loadProject(){
    const raw = JSON.parse(localStorage.getItem("projects")) || [];
    return raw.map(obj => Object.assign(new Project(obj.name), obj))
}

export const projectFunction = projectControl();



