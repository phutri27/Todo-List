import { projectFunction } from "./ProjectController";

export function loadPage(){
    const addPrjBtn = document.querySelector(".add-project");
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("#form1")
    const projecTitle = document.querySelector("#title");
    const closeBtn = document.querySelector(".close-project-btn");
    const projectList = document.querySelector(".project-list");
    const projectDiv = document.querySelector(".project-div");

    const projectListRender = () =>{
        projectList.innerHTML = '';
        projectFunction.getProjects().forEach((project)=>{
            const projectDiv = document.createElement("div");
            projectDiv.className = "project-div";
            projectDiv.dataset.projectId = project.getProjectId();

            const name = document.createElement("p");
            name.textContent = project.getProjectName();

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
        console.log(elemParent);
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


    projectList.addEventListener("click", (e) =>{
        const div = e.target.closest(".project-div");
        const id = div.dataset.projectId;
        if (!id || !e.target.matches(".edit-prj-btn, .del-prj-btn, .save-edit"))
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

    })

}   

