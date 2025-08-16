import { formatDate, differenceInDays } from "./date.js";


export function createView({
    projectList,
    todoList,
    dialog,})
  {
    const projectListRender = (projects) =>{
            projectList.innerHTML = '';
            projects.forEach((project)=>{
                
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

    const todoListRender = (todos, id) => {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const row = document.createElement("div");
        row.dataset.todoId = todo.id;
        row.className = "todo-div";

        const taskName = document.createElement("p");
        taskName.textContent = todo.tasks;

        const description = document.createElement("p");
        description.textContent = todo.description;

        const date = document.createElement("p");
        date.textContent = "Due Date";
        const dueDate = document.createElement("p");
        dueDate.textContent = formatDate(new Date(todo.dueDate));

        const daysToDue = document.createElement("p");
        daysToDue.textContent = "Days to due";

        const daysToDueData = document.createElement("p");
        daysToDueData.innerHTML = differenceInDays(new Date(), new Date(todo.dueDate));

        const select = document.createElement("p");
        select.textContent = "priority";
        const priority = document.createElement("p");
        priority.textContent = todo.priority;

        const delBtn = document.createElement("button");
        delBtn.className = "del-todo-btn";
        delBtn.dataset.todoId = todo.id;
        delBtn.dataset.projectId = id;
        delBtn.textContent = "Delete task";

        const editBtn = document.createElement("button");
        editBtn.className = "edit-todo-btn";
        editBtn.dataset.todoId = todo.id;
        editBtn.dataset.projectId = id;
        editBtn.textContent = "Edit task";

        row.append(
            taskName,
            description,
            date,
            dueDate,
            daysToDue,
            daysToDueData,
            select,
            priority,
            delBtn,
            editBtn
        );

        
        todoList.appendChild(row);
    });

        const addTodosBtn = document.createElement("button");
        addTodosBtn.textContent = "Add a task";
        addTodosBtn.dataset.projectId = id;
        addTodosBtn.className = "add-todo-btn";
        todoList.appendChild(addTodosBtn);
    };


    const formFunction = (id) => {
        const form1 = document.createElement("form");
        form1.className = "todo-form";

        const taskName = document.createElement("label");
        taskName.textContent = "Task Name";
        taskName.htmlFor = "task-name-input";

        const taskNameInput = document.createElement("input");
        taskNameInput.type = "text";
        taskNameInput.id = "task-name-input";
        taskNameInput.name = "task-name-input";
        taskNameInput.setAttribute("required", null);

        const taskDescription = document.createElement("label");
        taskDescription.textContent = "Description";
        taskDescription.htmlFor = "task-description-input";

        const taskDescriptionInput = document.createElement("input");
        taskDescriptionInput.type = "text";
        taskDescriptionInput.id = "task-description-input";
        taskDescriptionInput.name = "task-description-input";

        const dueDate = document.createElement("label");
        dueDate.textContent = "Due Date";
        dueDate.htmlFor = "due-date-input";

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        dueDateInput.id = "due-date-input";
        dueDateInput.name = "due-date-input";

        const priority = document.createElement("label");
        priority.textContent = "Priority";
        priority.htmlFor = "select-priority";

        const prioritySelect = document.createElement("select");
        prioritySelect.id = "select-priority";
        prioritySelect.name = "select-priority";
        ["Select", 1, 2, 3, 4].forEach((v) => {
        const o = document.createElement("option");
        o.value = v;
        o.textContent = String(v);
        prioritySelect.appendChild(o);
        });

        const addTodoBtn = document.createElement("button");
        addTodoBtn.textContent = "Add task";
        addTodoBtn.dataset.projectId = id;
        addTodoBtn.className = "add-task-btn";

        form1.append(
        taskName,
        taskNameInput,
        taskDescription,
        taskDescriptionInput,
        dueDate,
        dueDateInput,
        priority,
        prioritySelect,
        addTodoBtn
        );

        return form1;
    };

    const createTodoForm = (id) => {
        const btn = todoList.querySelector(".add-todo-btn");
        if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
        const form1 = formFunction(id);
        todoList.appendChild(form1);
    };

    const editTaskList = (elemParent, id, task) => {
        const form1 = formFunction(id);
        form1.elements['task-name-input'].value = task.tasks;
        form1.elements['task-description-input'].value = task.description
        form1.elements['due-date-input'].value = task.dueDate
        form1.elements['select-priority'].value = task.priority; 

        const btn = form1.querySelector(".add-task-btn");
        btn.textContent = "Save Edit";
        btn.classList.add("save-edit-todo");
        btn.dataset.todoId = elemParent.dataset.todoId;
        btn.classList.remove("add-task-btn");

        elemParent.replaceWith(form1);
    };

    const openDialog = () => dialog.showModal();
    const closeDialog = () => dialog.close();

      return {
        projectListRender,
        editProject,
        todoListRender,
        createTodoForm,
        editTaskList,
        formFunction, 
        openDialog,
        closeDialog,
    };
}