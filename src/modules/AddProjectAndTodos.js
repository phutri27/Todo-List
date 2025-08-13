import { Utils } from "./utils.js";
export class AddProjectAndTodos{
    static project = JSON.parse(localStorage.getItem("project")) || [{
        id: crypto.randomUUID(),
        title: "Main",
        todos: [{
            id: crypto.randomUUID(),
            task: 'HomeWork',
            description: 'Hehe',
            dueDate: '2025-16-8',
            priority: '4',
        },]
    }];

    static saveProject(){
        Utils.sorting(this.project);
        localStorage.setItem("project", JSON.stringify(this.project));
    }
    
    static addProject(title){
        const obj = {
            id: crypto.randomUUID(), 
            title: title.value, 
            todos: [] 
        };
        this.project.push(obj);
        this.saveProject();
    }

    static addTodos(tasks, description, dueDate, priority, matchingProjectId){
        const obj = {
            id: crypto.randomUUID(),
            task: tasks.value,
            description: description.value,
            dueDate: dueDate.value,
            priority: priority.value
        }

        this.project.forEach((projectItem, index) => {
            if (projectItem.id === matchingProjectId){
                projectItem.todos.push(obj);
            }
        })
        this.saveProject();
    }
}










