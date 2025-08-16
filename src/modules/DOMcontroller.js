// import { projectFunction } from "./ProjectController.js";
// import { todoFunction } from "./TodosController.js";
// import { formatDate, differenceInDays } from "./date.js";
// export function loadPage(){
//     const addPrjBtn = document.querySelector(".add-project");
//     const dialog = document.querySelector("dialog");
//     const form = document.querySelector("#form1")
//     const projecTitle = document.querySelector("#title");
//     const closeBtn = document.querySelector(".close-project-btn");
//     const projectList = document.querySelector(".project-list");
//     const todoBtn = document.querySelector(".add-todo-btn")
//     const todoList = document.querySelector(".todos-list");
//     const todoDiv = document.querySelector(".todo-div");
//     const todoForm = document.querySelector(".todo-form");

//     const projectListRender = () =>{
//         projectList.innerHTML = '';
//         projectFunction.getProjects().forEach((project)=>{
            
//             const projectDiv = document.createElement("div");
//             projectDiv.className = "project-div";
//             projectDiv.dataset.projectId = project.getProjectId();

//             const name = document.createElement("p");
//             name.textContent = project.getProjectName();
//             name.className = "project-name"

//             const editButton = document.createElement("button");
//             editButton.textContent = "Edit";
//             editButton.className = "edit-prj-btn"

//             const delButton = document.createElement("button");
//             delButton.textContent = "Delete";
//             delButton.className = "del-prj-btn";

//             projectDiv.append(name, editButton, delButton);
//             projectList.appendChild(projectDiv);
//         })
//     }

//     const editProject = (elemParent) =>{
//         const replaceName = elemParent.querySelector("p");
//         const replaceButton = elemParent.querySelector(".edit-prj-btn");
        
//         const input = document.createElement("input");
//         input.id = "prjNameChange";
//         input.type = "text";
//         input.name ="prjNameChange";

//         const saveEditButton = document.createElement("button");
//         saveEditButton.textContent = "Save Edit";
//         saveEditButton.className = "save-edit";

//         input.value = replaceName.textContent;
//         replaceButton.replaceWith(saveEditButton);
//         replaceName.replaceWith(input);
//     }

//     const todoListRender = (todos, id) =>{
//         todoList.innerHTML = '';
//         todos.forEach((todo)=>{
//             const todoDiv = document.createElement("div");
//             todoDiv.dataset.todoId = todo.id;
//             todoDiv.className = "todo-div";

//             const taskName = document.createElement("p");
//             taskName.textContent = todo.tasks;
            
//             const description = document.createElement("p");
//             description.textContent = todo.description;

//             const date = document.createElement("p");
//             date.textContent = "Due Date";
//             const dueDate = document.createElement("p");
//             dueDate.textContent = formatDate(new Date(todo.dueDate));

//             const daysToDue = document.createElement("p");
//             daysToDue.textContent = "Days to due";

//             const daysToDueData = document.createElement("p");
//             daysToDueData.innerHTML = differenceInDays(new Date(), new Date(todo.dueDate));

//             const select =document.createElement("p");
//             select.textContent = "priority";
//             const priority = document.createElement("p");
//             priority.textContent = todo.priority;

//             const delBtn = document.createElement("button");
//             delBtn.className = "del-todo-btn"
//             delBtn.dataset.todoId = todo.id
//             delBtn.dataset.projectId = id;
//             delBtn.textContent = "Delete task";

//             const editBtn = document.createElement("button");
//             editBtn.className = "edit-todo-btn";
//             editBtn.dataset.todoId = todo.id;
//             editBtn.dataset.projectId = id;
//             editBtn.textContent = "Edit task"
//             console.log(todo.id);

//             todoDiv.append(taskName, description, date, dueDate, daysToDue, daysToDueData, select, priority, delBtn, editBtn);
//             todoList.appendChild(todoDiv);
//         })
//         const addTodosBtn = document.createElement("button");
//         addTodosBtn.textContent = "Add a task";
//         addTodosBtn.dataset.projectId = id;
//         addTodosBtn.className = "add-todo-btn";
//         todoList.appendChild(addTodosBtn);
//     }

//     const createTodoForm = (id) => {
//         const btn = todoList.querySelector(".add-todo-btn");
//         todoList.removeChild(btn);
//         const form1 = formFunction(id);
//         todoList.appendChild(form1);
//     }

//     const editTaskList = (elemParent, id) =>{
//         const form1 = formFunction(id);
//         const elem = elemParent.children;
//         form1.elements['task-name-input'].value = elem[0].textContent;
//         form1.elements['task-description-input'].value = elem[1].textContent;
//         form1.elements['due-date-input'].value = elem[3].textContent;
//         form1.elements['select-priority'].value = elem[5].textContent;
//         form1.querySelector(".add-task-btn").textContent = "Save Edit";
//         form1.querySelector(".add-task-btn").classList.add("save-edit");
//         form1.querySelector(".add-task-btn").dataset.todoId = elemParent.dataset.todoId;
//         form1.querySelector(".add-task-btn").classList.remove("add-task-btn");
//         elemParent.replaceWith(form1);
//     }

//     const formFunction = (id) =>{
//         const form1 = document.createElement("form");
//         form1.className = "todo-form";

//         const taskName = document.createElement("label");
//         taskName.textContent = "Task Name";
//         taskName.for = "task-name-input"
        
//         const taskNameInput = document.createElement("input");
//         taskNameInput.type = "text";
//         taskNameInput.id = "task-name-input";
//         taskNameInput.name = "task-name-input";
//         taskNameInput.setAttribute("required", null);

//         const taskDescription = document.createElement("label");
//         taskDescription.textContent = "Description"
//         taskDescription.for = "task-description-input";

//         const taskDescriptionInput = document.createElement("input");
//         taskDescriptionInput.type = "text";
//         taskDescriptionInput.id = "task-description-input";
//         taskDescriptionInput.name = "task-description-input";

//         const dueDate = document.createElement("label");
//         dueDate.textContent = "Due Date";
//         dueDate.for = "due-date-input";

//         const dueDateInput = document.createElement("input");
//         dueDateInput.type = "date";
//         dueDateInput.id = "due-date-input";
//         dueDateInput.name = "due-date-input";

//         const priority = document.createElement("label");
//         priority.textContent = "Priority";
//         priority.for = "select-priority";

//         const prioritySelect = document.createElement("select");
//         prioritySelect.id = "select-priority";
//         const option1 = document.createElement("option");
//         const option2 = document.createElement("option");
//         const option3 = document.createElement("option");
//         const option4 = document.createElement("option");

//         option1.value = 1;
//         option1.textContent = "1";

//         option2.value = 2;
//         option2.textContent = "2";

//         option3.value = 3;
//         option3.textContent = "3";

//         option4.value = 4;
//         option4.textContent = "4";

//         prioritySelect.appendChild(option1);
//         prioritySelect.appendChild(option2);
//         prioritySelect.appendChild(option3);
//         prioritySelect.appendChild(option4);

//         const addTodoBtn = document.createElement("button");
//         addTodoBtn.textContent = "Add task";
//         addTodoBtn.dataset.projectId = id;
//         addTodoBtn.className = "add-task-btn";

//         form1.append(taskName, taskNameInput, taskDescription, taskDescriptionInput, dueDate, dueDateInput, prioritySelect,addTodoBtn);
//         return form1;
//     }

//     addPrjBtn.addEventListener("click", () =>{
//         dialog.showModal();
//     })

//     closeBtn.addEventListener("click", () =>{
//         dialog.close();
//     })

//     form.addEventListener("submit", (e)=>{
//         e.preventDefault();
//         projectFunction.addProject(projecTitle.value);
//         projecTitle.value = '';
//         projectListRender();
//     })

//     todoList.addEventListener("click", (e) => {
//         const id = e.target.dataset.projectId;
//         const todoId = e.target.dataset.todoId;
//         if (!id || !e.target.matches(".add-todo-btn, .add-task-btn, .del-todo-btn, .edit-todo-btn, .save-edit"))
//             return;
//         if (e.target.matches(".add-todo-btn")){
//             createTodoForm(id);
//         }
//         else if (e.target.matches(".add-task-btn")){
//             e.preventDefault();
//             const taskName = document.querySelector("#task-name-input");
//             const description = document.querySelector("#task-description-input");
//             const dueDate = document.querySelector("#due-date-input");
//             const priority = document.querySelector("#select-priority");
//             if (taskName.value === ''){
//                 console.log("Error");
//                 return;
//             }
//             todoFunction.addTodos(taskName.value, description.value, dueDate.value, priority.value, id);
//             const todo = projectFunction.linkTodoAndProject(id);
//             todoListRender(todo, id);
//             console.log(todo);
//         }
//         else if (e.target.matches(".del-todo-btn")){
//             todoFunction.deleteTodo(todoId);
//             const todo = projectFunction.linkTodoAndProject(id);
//             todoListRender(todo, id);
//         }
//         else if (e.target.matches(".edit-todo-btn")){
//             const elemParent = e.target.parentElement;
//             editTaskList(elemParent, id);
//         }
//         else if (e.target.matches(".save-edit")){
//             const form1 = document.querySelector(".todo-form");
//             const newName = form1.elements['task-name-input'].value 
//             const newDescription =  form1.elements['task-description-input'].value 
//             const newDueDAte = form1.elements['due-date-input'].value 
//             const newPriority = form1.elements['select-priority'].value 
//             todoFunction.editTodosData(newName, newDescription, newDueDAte, newPriority, todoId);
//             const todo = projectFunction.linkTodoAndProject(id);
//             todoListRender(todo, id);
//         }
//     })

//     projectList.addEventListener("click", (e) =>{
//         const div = e.target.closest(".project-div");
//         if (!div)
//             return;
//         const id = div.dataset.projectId;
//         if (!id || !e.target.matches(".edit-prj-btn, .del-prj-btn, .save-edit, .project-div, .project-name"))
//             return; 
//         if (e.target.matches(".del-prj-btn")){
//             projectFunction.deleteProject(id);
//             projectListRender();
//         }
//         else if(e.target.matches(".edit-prj-btn")){
//             const parentElem = e.target.parentElement;
//             editProject(parentElem);
//         }
//         else if (e.target.matches(".save-edit")){
//             const editName = document.querySelector("#prjNameChange");
//             projectFunction.editProject(id, editName.value);
//             projectListRender();
//         }
//         else if (e.target.matches(".project-div, .project-name")){
//             const todos = projectFunction.linkTodoAndProject(id);
//             todoListRender(todos, id);
//         }
//     })

// }   

