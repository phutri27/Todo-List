import { projectFunction } from "./ProjectController.js";
import { todoFunction } from "./TodosController.js";
import { createView } from "./app.view.js";

export function loadPage(){
    const addPrjBtn = document.querySelector(".add-project");
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("#form1")
    const projecTitle = document.querySelector("#title");
    const closeBtn = document.querySelector(".close-project-btn");
    const projectList = document.querySelector(".project-list");
    const todoBtn = document.querySelector(".add-todo-btn")
    const todoList = document.querySelector(".todos-list");
    const todoDiv = document.querySelector(".todo-div");
    const todoForm = document.querySelector(".todo-form");
    

    const view = createView({projectList, todoList, dialog});

    const refreshProjects = () =>{
        view.projectListRender(projectFunction.getProjects());
    }

    const showTodosFor = (projectId) => {
        const todos = projectFunction.linkTodoAndProject(projectId);
        view.todoListRender(todos, projectId);
    };

    addPrjBtn.addEventListener("click", () => view.openDialog());;
    closeBtn.addEventListener("click", () => view.closeDialog());

    // Add project
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = projecTitle.value.trim();
        const hay = projectFunction.addProject(name);
        if (!hay){
            form.style.backgroundColor = 'red';
            setTimeout(() =>{
                form.style.backgroundColor = 'lightpink';
            }, 1000) 
        }
        else{
            projecTitle.value = '';
            view.closeDialog();
            refreshProjects();
        }
    });


    //Todo list event
    todoList.addEventListener("click", (e) => {
        const btn = e.target.closest(
            ".add-todo-btn, .add-task-btn, .del-todo-btn, .edit-todo-btn, .save-edit-todo"
        );
        if (!btn) return;

        const row = btn.closest(".todo-div");
        const id = btn.dataset.projectId || row?.dataset.projectId;
        const todoId = btn.dataset.todoId || row?.dataset.todoId;
        if (!id) return;

        if (btn.matches(".add-todo-btn")) {
            view.createTodoForm(id);
        } 
        else if (btn.matches(".add-task-btn")) {
            e.preventDefault();
            const form1 = btn.closest("form");
            const taskName = form1.elements["task-name-input"];
            const description = form1.elements["task-description-input"];
            const dueDate = form1.elements["due-date-input"];
            const priority = form1.elements["select-priority"];
            todoFunction.addTodos(
                taskName.value,
                description.value,
                dueDate.value,
                priority.value,
                id
            );
            showTodosFor(id);
        } 
        else if (btn.matches(".del-todo-btn")) {
            if (!todoId) return;
            todoFunction.deleteTodo(todoId);
            showTodosFor(id);
        } 
        else if (btn.matches(".edit-todo-btn")) {
            if (!row) return;
            const task = todoFunction.getTodo(todoId);
            view.editTaskList(row, id, task);
        } 
        else if (btn.matches(".save-edit-todo")) {
            const form1 = document.querySelector(".todo-form");
            const newName = form1.elements["task-name-input"].value;
            const newDescription = form1.elements["task-description-input"].value;
            const newDueDAte = form1.elements["due-date-input"].value;
            const newPriority = form1.elements["select-priority"].value;

            if (!todoId) return;
            todoFunction.editTodosData(
                newName,
                newDescription,
                newDueDAte,
                newPriority,
                todoId
            );
            showTodosFor(id);
        }
    });

    projectList.addEventListener("click", (e) => {
    const div = e.target.closest(".project-div, .edit-prj");
    if (!div) return;
    const id = div.dataset.projectId;
    if (!id || !e.target.matches(".edit-prj-btn, .del-prj-btn, .save-edit, .project-div, .project-name"))
        return;
    if (e.target.matches(".del-prj-btn")) {
        projectFunction.deleteProject(id);
        todoFunction.deleteTodoAfterProject(id);
        showTodosFor(id);
        refreshProjects();
        document.querySelector(".add-todo-btn").remove();
    } 
    else if (e.target.matches(".edit-prj-btn")) {
        view.editProject(div);
    } 
    else if (e.target.matches(".save-edit")) {
        const editName = document.querySelector("#prjNameChange");
        projectFunction.editProject(id, editName.value);
        refreshProjects();
    } 
    else if (e.target.matches(".project-div, .project-name")) {
        showTodosFor(id);
        document.querySelectorAll(".project-div").forEach(div => {
            div.classList.remove("special");
        });

        div.classList.add("special");
    }
  });
  refreshProjects();
}