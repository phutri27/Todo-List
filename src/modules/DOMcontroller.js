import { projectFunction } from "./ProjectController.js";
import { todoFunction } from "./TodosController.js";
export function loadPage(){
    const addPrjBtn = document.querySelector(".add-project");
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("#form1")
    const projecTitle = document.querySelector("#title");
    const closeBtn = document.querySelector(".close-project-btn");
    const projectList = document.querySelector(".project-list");
    const todoBtn = document.querySelector(".add-todo-btn")
    const todoList = document.querySelector(".todos-list");


    const projectListRender = () =>{
        projectList.innerHTML = '';
        projectFunction.getProjects().forEach((project)=>{
            
            const projectDiv = document.createElement("div");
            projectDiv.className = "project-div";
            projectDiv.dataset.projectId = project.getProjectId();

            const name = document.createElement("p");
            name.textContent = project.getProjectName();
            name.className = "project-name"

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-prj-btn"

            const delButton = document.createElement("button");
            delButton.textContent = "Delete";
            delButton.className = "del-prj-btn";

            projectDiv.append(name, editButton, delButton);
            projectList.appendChild(projectDiv);
        })
    }

    const editProject = (elemParent) =>{
        const replaceName = elemParent.querySelector("p");
        const replaceButton = elemParent.querySelector(".edit-prj-btn");
        
        const input = document.createElement("input");
        input.id = "prjNameChange";
        input.type = "text";
        input.name ="prjNameChange";

        const saveEditButton = document.createElement("button");
        saveEditButton.textContent = "Save Edit";
        saveEditButton.className = "save-edit";

        input.value = replaceName.textContent;
        replaceButton.replaceWith(saveEditButton);
        replaceName.replaceWith(input);

    }

    const todoListRender = (todos, id) =>{
        todoList.innerHTML = '';
        todos.forEach((todo)=>{
            const todoDiv = document.createElement("div");

            const taskName = document.createElement("p");
            taskName.textContent = todo.tasks;
            
            const description = document.createElement("p");
            description.textContent = todo.description;

            const dueDate = document.createElement("p");
            dueDate.textContent = todo.dueDate;

            const priority = document.createElement("p");
            priority.textContent = todo.priority;

            todoDiv.append(taskName, description, dueDate, priority);
            todoList.appendChild(todoDiv);
        })
        const addTodosBtn = document.createElement("button");
        addTodosBtn.textContent = "Add a task";
        addTodosBtn.dataset.projectId = id;
        addTodosBtn.className = "add-todo-btn";
        todoList.appendChild(addTodosBtn);
    }

    const createTodoForm = (id) => {
        const btn = todoList.querySelector(".add-todo-btn");
        todoList.removeChild(btn);
        const form = document.createElement("form");
        
        const taskName = document.createElement("label");
        taskName.textContent = "Task Name";
        taskName.for = "task-name-input"
        
        const taskNameInput = document.createElement("input");
        taskNameInput.type = "text";
        taskNameInput.id = "task-name-input";
        taskNameInput.name = "task-name-input";
        taskNameInput.setAttribute("required", null);

        const taskDescription = document.createElement("label");
        taskDescription.textContent = "Description"
        taskDescription.for = "task-description-input";

        const taskDescriptionInput = document.createElement("input");
        taskDescriptionInput.type = "text";
        taskDescriptionInput.id = "task-description-input";
        taskDescriptionInput.name = "task-description-input";

        const dueDate = document.createElement("label");
        dueDate.textContent = "Due Date";
        dueDate.for = "due-date-input";

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        dueDateInput.id = "due-date-input";
        dueDateInput.name = "due-date-input";

        const priority = document.createElement("label");
        priority.textContent = "Priority";
        priority.for = "select-priority";

        const prioritySelect = document.createElement("select");
        prioritySelect.id = "select-priority";
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        const option3 = document.createElement("option");
        const option4 = document.createElement("option");

        option1.value = 1;
        option1.textContent = "1";

        option2.value = 2;
        option2.textContent = "2";

        option3.value = 3;
        option3.textContent = "3";

        option4.value = 4;
        option4.textContent = "4";

        prioritySelect.appendChild(option1);
        prioritySelect.appendChild(option2);
        prioritySelect.appendChild(option3);
        prioritySelect.appendChild(option4);

        const addTodoBtn = document.createElement("button");
        addTodoBtn.textContent = "Add task";
        addTodoBtn.dataset.projectId = id;
        addTodoBtn.className = "add-task-btn";

        form.append(taskName, taskNameInput, taskDescription, taskDescriptionInput, dueDate, dueDateInput, prioritySelect,addTodoBtn);
        todoList.appendChild(form);
    }

    addPrjBtn.addEventListener("click", () =>{
        dialog.showModal();
    })

    closeBtn.addEventListener("click", () =>{
        dialog.close();
    })

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        projectFunction.addProject(projecTitle.value);
        projecTitle.value = '';
        projectListRender();
    })

    todoList.addEventListener("click", (e) => {
        const id = e.target.dataset.projectId;
        if (!id || !e.target.matches(".add-todo-btn, .add-task-btn"))
            return
        if (e.target.matches(".add-todo-btn")){
            createTodoForm(id);
        }
        else if (e.target.matches(".add-task-btn")){
            e.preventDefault();
            const taskName = document.querySelector("#task-name-input");
            const description = document.querySelector("#task-description-input");
            const dueDate = document.querySelector("#due-date-input");
            const priority = document.querySelector("#select-priority");
            todoFunction.addTodos(taskName.value, description.value, dueDate.value, priority.value, id);
            const todo = projectFunction.linkTodoAndProject(id);
            todoListRender(todo, id);
        }
    })

    projectList.addEventListener("click", (e) =>{
        if (e.target.matches(".project-list")){
            return;
        }
        const div = e.target.closest(".project-div");
        const id = div.dataset.projectId;
        if (!id || !e.target.matches(".edit-prj-btn, .del-prj-btn, .save-edit, .project-div, .project-name"))
            return;
        if (e.target.matches(".del-prj-btn")){
            projectFunction.deleteProject(id);
            projectListRender();
        }
        else if(e.target.matches(".edit-prj-btn")){
            const parentElem = e.target.parentElement;
            editProject(parentElem);
        }
        else if (e.target.matches(".save-edit")){
            const editName = document.querySelector("#prjNameChange");
            projectFunction.editProject(id, editName.value);
            projectListRender();
        }
        else if (e.target.matches(".project-div, .project-name")){
            const todos = projectFunction.linkTodoAndProject(id);
            todoListRender(todos, id);
        }
        //Them todo list render
    })

}   

