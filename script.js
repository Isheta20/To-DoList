const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todoList");

//to check if a key exists in local storage, local storage being used or not
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
console.log(itemsArray);
const isCheckedArray = localStorage.getItem("isChecked") ? JSON.parse(localStorage.getItem("isChecked")) : [];
console.log(isCheckedArray);
// localStorage.clear();

window.onload = function(){
  displayItems();
  onloadCheckmark();
}


function pushtoStorage(task){
  
  itemsArray.push(task);
  isCheckedArray.push(false);
  //creating an items array with all the tasks

  // localStorage.removeItem("items");
  localStorage.setItem("items", JSON.stringify(itemsArray));
  localStorage.setItem("isChecked", JSON.stringify(isCheckedArray));
  
  location.reload();
}

function displayItems(){

  for(let i=0; i<itemsArray.length; i++){

    const listItem = document.createElement("li");
    listItem.setAttribute("class","listItem");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "checkbox");
    checkbox.setAttribute("class", "checkbox");

    const listLabel = document.createElement("label");
    listLabel.setAttribute("for", "checkbox");
    listLabel.setAttribute("class", "shit");
    listLabel.textContent = itemsArray[i];

    
    //making checkbox and label a single element
    const label_chkbox = document.createElement("div");
    label_chkbox.appendChild(checkbox);
    label_chkbox.appendChild(listLabel);
    listItem.appendChild(label_chkbox);
    
    //css
    listLabel.classList.add('listLabel_css');
    listItem.classList.add('listItem_css');
    label_chkbox.classList.add('checkbox_css');
    //css

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("class","deleteBtn");

    //remove the child from the todoList
    //Adding event listener
    deleteButton.onclick = function () {

      todoList.removeChild(listItem);
    };


    listItem.appendChild(deleteButton);

    //css
    listItem.style["justifyContent"] = "space-between";
    //css

    todoList.appendChild(listItem);


    // checkbox event listener
    // checkbox.onclick = function(){
    //   if(checkbox.checked == true){
    //     listLabel.style["text-decoration"] = "line-through";
    //   }
    //   else{
    //     listLabel.style["text-decoration"] = "none";
    //   }
    // }

  }
  
  //calling here because only after the for loop the nodelist created and then we can access it
  activateDeleteListeners();
  isCheckedLocaL();
}

function isCheckedLocaL(){

  let chk = document.querySelectorAll(".checkbox");
  
  // console.log(chk);
  chk.forEach((ch, i)=>{
    ch.addEventListener("click",()=>{
      updateChk(i);
    })  
  })
}
// const listLabel = document.querySelectorAll(".shit");
// console.log(listLabel);
// console.log(document.getElementsByTagName("label"));

function updateChk(i){
  const listLabel = document.getElementsByTagName("label");
  // console.log(listLabel[0]);
  if(isCheckedArray[i] == true){

    isCheckedArray[i] = false;
    listLabel[i].style["text-decoration"] = "none";
  }
  else {

    isCheckedArray[i] = true;
    listLabel[i].style["text-decoration"] = "line-through";
  }
  localStorage.setItem("isChecked",JSON.stringify(isCheckedArray));
  // location.reload();
}

// const chk = document.querySelectorAll(".checkbox");
// console.log(chk);
function onloadCheckmark(){
  const chk = document.querySelectorAll(".checkbox");
  const listLabel = document.getElementsByTagName("label");
  isCheckedArray.forEach((value, i)=>{
    if(value == true){
      chk[i].checked = true;
      listLabel[i].style["text-decoration"] = "line-through";
    }
    else{
      chk[i].checked = false;
      listLabel[i].style["text-decoration"] = "none";
    }
  })
}




function activateDeleteListeners(){
  
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  // console.log(deleteBtn);
  //binding the event listener to that specific button with that specific index
  deleteBtn.forEach((db, i)=>{
    db.addEventListener("click",()=>{
      deleteItem(i);
    })
  })
}

function deleteItem(i){
  itemsArray.splice(i,1);
  isCheckedArray.splice(i,1);
  localStorage.setItem("isChecked",JSON.stringify(isCheckedArray));
  localStorage.setItem("items",JSON.stringify(itemsArray));
  // location.reload();
}

todoForm.addEventListener("submit", function(event){
  event.preventDefault();
  const task = todoInput.value;
  if(task ===""){
    alert("Enter text in input");
    return;
  }

  //to clear value in input field 
  todoInput.value = "";

  pushtoStorage(task);
  displayItems(); 

});








// old code
// todoForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//     // console.log(event);
//     const text = todoInput.value;
//     // console.log(text);
//     //to make sure user does add null task
//     if(text === ""){
//         alert("Enter text in input");
//         return;
//     }

//   //Adding to local Storage
//   itemsArray.push(text);
//   localStorage.setItem("items", JSON.stringify(itemsArray));
//   location.reload();

//   const listItem = document.createElement("li");
//   const checkbox = document.createElement("input");
//   checkbox.setAttribute("type", "checkbox");
//   checkbox.setAttribute("name", "checkbox");

//   const listLabel = document.createElement("label");
//   listLabel.textContent = text;
  
//   //making checkbox and label a single element
//   const label_chkbox = document.createElement("div");
//   label_chkbox.appendChild(checkbox);
//   label_chkbox.appendChild(listLabel);
//   listItem.appendChild(label_chkbox);
  
//   //css
//   listLabel.classList.add('listLabel_css');
//   listItem.classList.add('listItem_css');
//   label_chkbox.classList.add('checkbox_css');
//   //css

//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Delete";

//   //remove the child from the todoList
//   deleteButton.onclick = function () {
//     todoList.removeChild(listItem);
//   };

//   listItem.appendChild(deleteButton);

//   //css
//   listItem.style["justifyContent"] = "space-between";
//   //css

//   todoList.appendChild(listItem);

//   //to clear value in input field 
//   todoInput.value = "";
// });
