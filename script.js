let taskList = [];
let itemCount = 0;
let count = 1;
let isExpandedView = false;
const originalHTML = document.body.innerHTML;

let listID = "";
function getListID(tasks) {
  listID =
    tasks.target.previousSibling.previousSibling.previousSibling.previousSibling
      .id;
}

function popup1() {
  let body = document.getElementsByTagName("body")[0];
  let main = document.createElement("main");
  main.innerHTML = body.innerHTML;
  main.style.filter = "blur(4px)";
  body.innerHTML = ``;
  body.append(main);
  let div = document.createElement("div");
  div.className = "new";
  div.innerHTML = `<p class="adl">Add New List</p>
    <input type="text" placeholder="Add New List" id="list_title" autofocus>
    <div class="N1">
        <button onclick="addList()">Add</button>
        <button onclick="goBack()">Close</button>
    </div>`;
  body.append(div);
}

function addList() {
  const cardTitle = document.getElementById("list_title").value;
  const tempList = {
    id: Date.now(),
    taskname: cardTitle,
    items: [],
  };
  taskList.push(tempList);
  document.getElementById("default-msg").style.visibility = "hidden";
  clearInput("list_title");
  renderTaskList();
  let body = document.getElementsByTagName("body")[0];
  let main = document.getElementsByTagName("main")[0];
  body.innerHTML = main.innerHTML;
}

function popup2() {
  let body = document.getElementsByTagName("body")[0];
  let main = document.createElement("main");
  main.innerHTML = body.innerHTML;
  main.style.filter = "blur(4px)";
  body.innerHTML = ``;
  body.append(main);
  let div = document.createElement("div");
  div.className = "new";
  div.innerHTML = `<p class="adl">Add New Item</p>
    <input type="text" placeholder="Add New Item" id="item_title" autofocus>
    <div class="N1">
        <button onclick="addItem(this)">Add</button>
        <button onclick="goBack()">Close</button>
    </div>`;
  body.append(div);
}

function addItem() {
  const itemTitle = document.getElementById("item_title").value;
  const currentItem = {
    id: count++,
    title: itemTitle,
    marked: false,
  };
  let listId = listID.split("-")[2];
  const listIndex = taskList.findIndex((list) => list.id == listId);
  if (listIndex !== -1) {
    taskList[listIndex].items.push(currentItem);
  }
  clearInput("item_title");

  renderTaskList();
  let body = document.getElementsByTagName("body")[0];
  let main = document.getElementsByTagName("main")[0];
  body.innerHTML = main.innerHTML;

  if (isExpandedView) {
    expandItem(listId);
  }
}

function clearInput(inputId) {
  document.getElementById(inputId).value = "";
}

function renderTaskList() {
  let container = document.getElementById("container");
  container.innerHTML = "";

  for (let list of taskList) {
    container.innerHTML += `<div id=${list.id} class="item">
        <span class="c2" onclick="expandItem(${list.id})">${
      list.taskname
    }</span>
        <hr>
        <ul class="tasks" id="items-list-${list.id}">${renderListItems(
      list.items,
      list.id
    )}</ul>
        <i class="fa-solid fa-trash-can close" onclick="delList(this)"></i>
        <i class="fa-solid fa-circle-plus addtask" id="add-btn-${
          list.id
        }" onclick="popup2(); getListID(event)"></i>
      </div>`;
  }
}

function renderListItems(items, listId) {
  let itemsHtml = "";
  for (let item of items) {
    itemsHtml += `<li id="item-${item.id}">
        <span class="${item.marked ? "marked" : ""}">${item.title}</span>
        <button class="btn ${
          item.marked ? "hide" : ""
        }" onclick="strike(this)">mark done</button>
      </li>`;
  }
  return itemsHtml;
}

let strike = (listItem) => {
  let listId = listItem.parentElement.parentElement.id.split("-")[2];
  let itemId = listItem.parentElement.id.split("-")[1];
  let listIndex = taskList.findIndex((list) => list.id == listId);
  let itemIndex = taskList[listIndex].items.findIndex(
    (item) => item.id == itemId
  );
  taskList[listIndex].items[itemIndex].marked =
    !taskList[listIndex].items[itemIndex].marked;

  if (isExpandedView) {
    expandItem(listId);
  } else {
    renderTaskList();
  }
};

let delList = (trash_can) => {
  taskList = taskList.filter((list) => list.id != trash_can.parentElement.id);
  if (isExpandedView) {
    expClose();
  } else {
    renderTaskList();
  }
};

function goBack() {
  let body = document.getElementsByTagName("body")[0];
  let main = document.getElementsByTagName("main")[0];
  body.innerHTML = main.innerHTML;
}

function expandItem(listId) {
  isExpandedView = true;
  let body = document.getElementsByTagName("body")[0];
  let container = document.getElementById("container");
  container.style.visibility = "hidden";
  let hold = document.createElement("section");
  hold.innerHTML = body.innerHTML;
  body.innerHTML = "";
  body.append(hold);
  let div = document.createElement("div");
  const listObj = taskList.find((list) => list.id == listId);
  div.className = "popup";
  div.innerHTML = `<header class="item_expand_header">
          <div class="expBack" onclick="expClose()">
            <i class="fa-solid fa-circle-chevron-left"></i>
            <span>Back</span>
          </div>
          <span id="itemExpTitleID" class="itemExpTitle">${
            listObj.taskname
          }</span>
          <div class="expAdd" onclick="popup1()">
            <i class="fa-solid fa-circle-plus"></i>
            <span>Add</span>
          </div>
        </header>
        <div class="content">
            <div id="${listObj.id}" class="item_Detail">
                ${renderExpandList(listObj)}
            </div>
        </div>`;

  body.append(div);
}

function renderExpandList(listObj) {
  return `
    <span class="c2">${listObj.taskname}</span>
    <hr>
    <ul class="tasks" id="items-list-${listObj.id}">${renderListItems(
    listObj.items,
    listObj.id
  )}</ul>
    <i class="fa-solid fa-trash-can close" onclick="delList(this)"></i>
    <i class="fa-solid fa-circle-plus addtask" id="add-btn-${
      listObj.id
    }" onclick="popup2(); getListID(event)"></i>`;
}

function expClose() {
  isExpandedView = false;
  document.body.innerHTML = originalHTML;
  document.getElementById("default-msg").style.visibility = "hidden";
  renderTaskList();
}
