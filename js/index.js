function run() {
    let btn = document.querySelector('#add-things');
    btn.addEventListener('click', addNewToDo);


    window.addEventListener('online', (event) => {
        document.getElementById("onLine").innerHTML = "<p style='color:brown'>Welcome back Online.</p>";
    });
    window.addEventListener('offline', (event) => {
        document.getElementById("onLine").innerHTML = "<p style='color:red'>Sorry for inconveinace. You are offline</p>";
    });


    loadThingsToDO();
}

function addThings(things) {
    const database = window.localStorage;
    const records = document.querySelector('#things-list');
    const branch = document.createRange().createContextualFragment(database.getItem(things));
    records.appendChild(branch);

}

function loadThingsToDO(){
    const database = window.localStorage;
Object.keys(database).forEach(addThings);


}
function updateCheckBox(checkbox){
    if(checkbox.checked){
        checkbox.setAttribute('checked', checkbox.checked);
    }else{
        checkbox.removeAttribute('checked');
    }
    const thingsString = new XMLSerializer().serializeToString(checkbox.parentNode);
    const id = checkbox.id;
    window.localStorage.setItem(id, thingsString);
}

function addNewToDo(event) {
    event.preventDefault();
    const todo = document.querySelector('#things-label');
    const value = todo.value.trim();

   
    if (value.length > 0) {
        const hash = (Date.now().toString(36).substr(2, 4) + performance.now().toString(36).replace('.','').substr(0, 4) + Math.random().toString(36).substr(3, 4)).toUpperCase();

        const id = `things-select-${hash}`;

        const template = document.querySelector('#things-item');
        const item = document.importNode(template.content, true);
        const label = item.querySelector('label[for]');
        const input = item.querySelector('#things-select')
        const list = document.querySelector('#things-list');

        
        
        input.setAttribute('id', id);
        label.setAttribute('for', id);
        label.textContent = value;
       
const database = window.localStorage;
const thingsString = new XMLSerializer().serializeToString(item);
database.setItem(id, thingsString);
list.appendChild(item);
        
    }

    todo.value = '';
}

function thingsDelete(elem){
    elem.parentElement.classList.toggle('deleteList');
    elem.parentElement.addEventListener('animationend',listnerFunc);
    
}
function listnerFunc(event){
    const key=this.querySelector("input[type=checkbox]").id;
    const dataobject = window.localStorage;
    dataobject.removeItem(key);
    const parent = this.parentElement;
    parent.removeChild(this);

}
/*const myElement = document.querySelector("#things-delete");
myElement.addEventListener("animationstart", start, false);
myElement.addEventListener("animationiteration", update, false);
myElement.addEventListener("animationend", end, false);

function start(e) {
    document.template.style.backgroundColor = "pink";
}
function update(e){
    document.template.style.backgroundColor = "khaki";
}
function end(e){
    document.template.style.backgroundColor ="black"
}*/
run();