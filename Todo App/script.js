const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')



function newTodo() {

  // Create ToDo
  let li = document.createElement('li')
  let text = document.createTextNode("Any ToDo")
  li.appendChild(text)
  list.appendChild(li)

  //Count ToDO
  itemCountSpan.textContent = document.getElementsByTagName('li').length

  
  //Cheked ToDo and unChecked
  list.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked')
      //Count Todo unChecked
      uncheckedCountSpan.textContent = document.getElementsByTagName('li').length - document.querySelectorAll(".checked").length
    }
  },false)

  //Close Todo
  let li_todo = document.getElementsByTagName("LI")
  for (let i=0; i<li_todo.length ; i++){
    let span = document.createElement("SPAN")
    let txt = document.createTextNode("\u00D7")
    span.className = "close"
    span.appendChild(txt)
    li_todo[i].appendChild(span)
  }
  
  let close = document.getElementsByClassName("close")
  for (let i=0; i<close.length ; i++){
    close[i].onclick = function (){
      let div = this.parentElement
      div.style.display ="none"
    }
  }


  /**/

}