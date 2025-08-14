export class Project{
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
    }

    getProjectId(){
        return this.id;
    }

    getProjectName(){
        return this.name;
    }
    
    setProjectName(name){
        this.name = name;
    }
}

export class Todos{
    constructor(tasks, description = "", dueDate = null, priority, projectId){
        this.id = crypto.randomUUID();
        this.tasks = tasks;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed =false;
        this.projectId = projectId;
    }

    change(tasks, description, dueDate, priority){
        this.tasks = tasks;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}











