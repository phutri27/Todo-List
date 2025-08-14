import { Project} from "./createProjectAndTodos.js";
import { todoFunction } from "./TodosController.js";
let projects = [];

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
            return;
        }
        projects.push(data);
        return data.getProjectId();
    }

    const deleteProject = (projectId) => {
        const index = findIndex(projectId);
        projects.splice(index, 1);
    }

    const editProject = (projectId, name) => {
        const index = findIndex(projectId);
        projects[index].setProjectName(name);
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

export const projectFunction = projectControl();



