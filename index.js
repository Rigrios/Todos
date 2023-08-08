const input = document.querySelector('.input')
const box2 = document.querySelector('.box2')
const box3 = document.querySelector('.box3')
const button = document.querySelector('.button')
const inputPlaceholder = input.placeholder
const forms = document.forms


// Мой массив с задачами
let task = []

if (localStorage.getItem('task')) {
    task = JSON.parse(localStorage.getItem('task'))
}

task.forEach(task => {
    const taskCSS = task.done ? 'todos__text_t' : 'todos__text_f'
    const todosText = `
    <div class="todos" id="${task.id}">
        <div class="todos__text ${taskCSS}">${task.text}</div>
        <div class="todos__menu">
            <img src="img/free-icon-font-check-3917749.png" class="finich" title="Выполненно" alt="">
            <img src="img/free-icon-font-cross-3917759.png" class="delete" width="25" title="удалить" alt="">
        </div>
    </div>
    `
    box2.insertAdjacentHTML('beforeend', todosText)
});

input.addEventListener('focus', function () {
    input.placeholder = ''
})

input.addEventListener('blur', function () {
    input.placeholder = inputPlaceholder
})

button.addEventListener('click', addTask)

function addTask (event) { 
        event.preventDefault()

        const createTask = {
            id: Date.now(),
            text: input.value,
            done: false,
        }
        task.push(createTask)
       
        const taskCSS = createTask.done ? 'todos__text_t' : 'todos__text_f'
        const todosText = `
        <div class="todos" id="${createTask.id}">
            <div class="todos__text ${taskCSS}">${createTask.text}</div>
            <div class="todos__menu">
                <img src="img/free-icon-font-check-3917749.png" class="finich" title="Выполненно" alt="">
                <img src="img/free-icon-font-cross-3917759.png" class="delete" width="25" title="удалить" alt="">
            </div>
        </div>
        `
        box2.insertAdjacentHTML('beforeend', todosText)
        input.value = ''
        
    
    if (box2.children.length !== 0) {
        box3.innerHTML = `Колличество дел - ${box2.children.length} `
    } else {
        box3.innerHTML = 'Создавай и планируй'
    }
    locolSave()
}

box2.addEventListener('click', rmTask)

function rmTask (e) {
   if (e.target.className === 'delete') {
    const parent = e.target.closest('.todos')
    parent.remove()
    const id = +parent.id

    task = task.filter(el => el.id !== id )
   }
   box3.innerHTML = `Колличество дел - ${box2.children.length}`
   locolSave()
   
}


box2.addEventListener('click', doneTask)

function doneTask(e) {
    if (e.target.className === 'finich') {
        const parent = e.target.closest('.todos')
        const id = +parent.id

        const tasks = task.find(el => {
            if (el.id === id) {
                return true
            }
        })
        tasks.done = !tasks.done
        const taskTitle = parent.querySelector('.todos__text')
        taskTitle.classList.toggle('todos__text_t')
        locolSave()
    }
}

function locolSave() {
    localStorage.setItem('task', JSON.stringify(task))
}