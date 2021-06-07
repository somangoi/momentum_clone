const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = [];

function deleteToDo() {

};

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
};

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId,
    };
    
    toDos.push(toDoObj);
    saveToDos();
};

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
};

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        //toDo리스트가 있다면 데이터를 불러온다.
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text)
        })
        //forEach 함수는 배열에 있는 각 아이템에 대해 함수를 실행한다.
    }
    //toDo리스트가 없든 있든 form은 계속 존재해야한다.(else가 없는 이유)
};

function init() { 
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
};

init();