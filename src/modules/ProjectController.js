import { Project} from "./createProjectAndTodos.js";
 
let projects = [];

function projectControl(){
    const findIndex = (projectId) => {
        const index = projects.findIndex(p => p.id === projectId);
        return index;
    }
    const addProject = (name) => {
        const data = new Project(name);
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
    return {
        findIndex,
        addProject,
        deleteProject,
        editProject,
        getProjects,
        getProject
    }
}

export const projectFunction = projectControl();

function linkTodoAndProject(){
    
}

