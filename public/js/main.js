// Read

const addNewButton = document.getElementById("addNewButton");
const cancel = document.getElementById("cancelButton");
const confirmSubButton = document.getElementById("confirmButton");
const oldBox = document.querySelector(".mainBox");
const newBox = document.querySelector(".formBox");
const emptyNote = document.querySelector(".emptyNote");
const addedNote = document.querySelector(".AddedNotify");
const nameFromForm = document.getElementById("name");
const descFromForm = document.getElementById("desc");
const sizeFromForm = document.getElementById("size");
const notifySpan = document.querySelector(".notify");

const listOfItems = document.querySelector(".listOfOnlyItems");


const onlyPropLists = document.querySelector(".listOfOnlyItems");

window.addEventListener("DOMContentLoaded", setupItems)

function setupItems() {
    let items = getLocalStorage();
  
    if (items.length > 0) {
        items.forEach(function (item) {
            createListItem(item.id, item.name, item.desc, item.size);
        });
        emptyNote.classList.add("hideme");
    }
    else{
        emptyNote.classList.remove("hideme");
        emptyNote.classList.add("showme");
    }
}

function createListItem(id, name, desc, size){
    const element = document.createElement("div");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("oneProp");
    element.innerHTML = `<div class="space nameAndDelete">
                            <span>
                                ${name} (${size})
                            </span>
    
                            <button class="delete-btn">
                                remove
                            </button>
                        </div>
                        <span class="space">
                            ${desc}
                        </span>`;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    listOfItems.appendChild(element);
}

addNewButton.addEventListener('click', openForm);

function openForm(){
    console.log("New item form");
    const oldBox = document.querySelector(".mainBox");
    const newBox = document.querySelector(".formBox");
    oldBox.classList.add("hideme");
    oldBox.classList.remove("showme");
    emptyNote.classList.add("hideme");
    emptyNote.classList.remove("showme");
    newBox.classList.add("showme");
    newBox.classList.remove("hideme");

    // console.log( onlyPropLists.children.length);
    // const v = onlyPropLists.children.length;
    // newBox.css("margin-top", "-40%");
}

cancel.addEventListener('click', cancelSub);
confirmSubButton.addEventListener('click', confirmSub);

function cancelSub(){
    console.log("Im here");
    oldBox.classList.add("showme");
    oldBox.classList.remove("hideme");
    // emptyNote.classList.add("hideme");
    newBox.classList.remove("showme");
    newBox.classList.add("hideme");
    console.log(onlyPropLists.children.length);
    // Clearing form.
    nameFromForm.value = "";
    descFromForm.value = "";
    sizeFromForm.value = "";
}

function confirmSub(){
    var name = nameFromForm.value;
    var desc = descFromForm.value;
    var size = sizeFromForm.value;
    console.log(name, desc, size);
    if(name==""|| desc == "" || size == ""){
        notifySpan.classList.add("showme");
    }
    else{
        const id = new Date().getTime().toString();

        setBacktoDefault();

        const element = document.createElement("div");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("oneProp");
        element.innerHTML = `<div class="space nameAndDelete">
                                <span>
                                    ${name} (${size})
                                </span>
        
                                <button class="delete-btn">
                                    remove
                                </button>
                            </div>
                            <span class="space">
                                ${desc}
                            </span>`;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        listOfItems.appendChild(element);
        addToLocalStorage(id, name, desc, size);
        displayAlert("Added successfully.", "green");
        
        // Clearing form.
        nameFromForm.value = "";
        descFromForm.value = "";
        sizeFromForm.value = "";
    }    
}

function setBacktoDefault(){
    notifySpan.classList.remove("showme");
    notifySpan.classList.add("hideme");

    console.log("Submitted");
    oldBox.classList.add("showme");
    oldBox.classList.remove("hideme");
    newBox.classList.remove("showme");
    newBox.classList.add("hideme");
    emptyNote.classList.add("hideme");
    emptyNote.classList.remove("showme");
}

function addToLocalStorage(id, name, desc, size){
    const newData = { id, name, desc, size };
    let items = getLocalStorage();
    console.log(items);
    items.push(newData)
    localStorage.setItem("props", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("props")
      ? JSON.parse(localStorage.getItem("props"))
      : [];
}

//  Deleting the items.

function deleteItem(e){
    console.log("At deleting part.");
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    // console.log("Element is: ", element);
    // console.log("ID is: ", id);
    listOfItems.removeChild(element);
    if (listOfItems.children.length === 0) {
        emptyNote.classList.remove("hideme");
        emptyNote.classList.add("showme");
    }
    displayAlert("Item removed", "red");
    //  removing from the local storage
    removeFromLocalStorage(id);
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id !== id) {
        return item;
        }
    });

    localStorage.setItem("props", JSON.stringify(items));
}

// Info on adding and removing
function displayAlert(content, color){
    addedNote.classList.add("showme");
    addedNote.innerText = content;
    addedNote.style.color = color;
    setTimeout(() => {
        addedNote.classList.remove("showme");
        addedNote.classList.add("hideme");  
    }, 2000);
}