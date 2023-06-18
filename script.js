const taskList = [];
let itemCount = 0;
let Count = 1;

function popup1() {
    let body = document.getElementsByTagName("body")[0];
    let main =document.createElement("main");
    main.innerHTML = body.innerHTML;
    main.style.filter = "blur(4px)";
    body.innerHTML = ``;
    body.append(main);
    let div = document.createElement("div");
    div.className = "new";
    div.innerHTML =
    `<p class="adl">Add New List</p>
    <input type="text" placeholder="Add New List" id="list_title" autofocus>
    <div class="N1">
        <button onclick="addList()">Add</button>
        <button onclick="goBack()">Close</button>
    </div>`;
    body.append(div);
};

let addList = () => {
    let card_Title = document.getElementById("list_title").value;
    const tempObj = {
      id: Date.now(),
      taskname: card_Title
    };
    taskList.push(tempObj);
    console.log(taskList);
    document.getElementById("default-msg").style.visibility = "hidden";
    let container = document.getElementById("container");
    container.innerHTML += `<div id= ${itemCount} class="item">
            <span class="c2" onclick="expandItem(this)">${card_Title}</span>
            <hr>
            <ul class="tasks" id="items-list-${itemCount}"></ul>
            <i class="fa-solid fa-trash-can close" onclick="delList(this)"></i>
            <i class="fa-solid fa-circle-plus addtask" id="add-btn-${itemCount++}" onclick="popup2(); getListID(event)"></i>
        </div>`;
    let body = document.getElementsByTagName("body")[0];
    let main =document.getElementsByTagName("main")[0];
    body.innerHTML = main.innerHTML;
}

function popup2() {
    let body = document.getElementsByTagName("body")[0];
    let main =document.createElement("main");
    main.innerHTML = body.innerHTML;
    main.style.filter = "blur(4px)";
    body.innerHTML = ``;
    body.append(main);
    let div = document.createElement("div");
    div.className = "new";
    div.innerHTML =
    `<p class="adl">Add New Item</p>
    <input type="text" placeholder="Add New Item" id="item_title" autofocus>
    <div class="N1">
        <button onclick="addItem(this)">Add</button>
        <button onclick="goBack()">Close</button>
    </div>`;
    body.append(div);
};

let listID = "";
function getListID(tasks) {
    listID =tasks.target.previousSibling.previousSibling.previousSibling.previousSibling.id;
}

let addItem = () => {
    let item_title = document.getElementById("item_title").value;
    let li = document.createElement("li");
    document.getElementById(listID).appendChild(li);
    li.id = `item-${Count++}`;
    li.innerHTML = `<span>${item_title}</span>
    <button class="btn" onclick="strike(this)">mark done</button>`;
    let body = document.getElementsByTagName("body")[0];
    let main =document.getElementsByTagName("main")[0];
    body.innerHTML = main.innerHTML;
  };

let strike = (btn) => {
    btn.parentElement.classList.add("marked");
    btn.classList.add("hide");
};

let delList = (trash_can) => {
    trash_can.parentElement.remove();
    taskList.splice(trash_can.parentElement.id, 1);
    if (taskList.length === 0) {
        document.getElementById("default-msg").style.visibility = "visible";
        document.getElementById("default-msg").style.opacity = 0.7;
    };
};

function goBack(){
    let body = document.getElementsByTagName("body")[0]
    let main =document.getElementsByTagName("main")[0]
    body.innerHTML = main.innerHTML
}

let expandItem = (card) => {
    let body = document.getElementsByTagName("body")[0]
    let hold =document.createElement("section")
    hold.innerHTML = body.innerHTML
    body.innerHTML = ``
    body.append(hold)
    let div = document.createElement("div")
    div.className = "popup"
    div.innerHTML = 
    `<header class="item_expand_header">
      <div class="expBack" onclick="expClose()">
        <i class="fa-solid fa-circle-chevron-left"></i>
        <span>Back</span>
      </div>
      <span id="itemExpTitleID" class="itemExpTitle">${card.innerText}</span>
      <div class="expAdd" onclick="popup1()">
        <i class="fa-solid fa-circle-plus"></i>
        <span>Add</span>
      </div>
    </header>
    <div class="content">
        <div id="itemDetail" class="item_Detail">
            ${card.parentElement.innerHTML}
        </div>
    </div>`
  body.append(div)
};

function expClose(){
    let body = document.getElementsByTagName("body")[0]
    let hold =document.getElementsByTagName("section")[0]
    body.innerHTML = hold.innerHTML
}