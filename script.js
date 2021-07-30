const showPage = function() {
    const btnPage = document.querySelectorAll('.header-nav__btn');
    const page = document.querySelectorAll('.page');
    let pageName;

    btnPage.forEach(btn => {
        btn.addEventListener('click', selectPage);
    });

    function selectPage() {
        btnPage.forEach(item => {
            item.classList.remove('header-nav__btn--active');
        });
        this.classList.add('header-nav__btn--active');
        pageName = this.getAttribute('data-page-name');
        selectPageContent(pageName);
    };

    function selectPageContent(pageName) {
        page.forEach(item => {
            item.classList.contains(pageName) ? item.classList.add('page-show') : item.classList.remove('page-show');
        });
    };
};

showPage();

//TODO logick

const inputAddMessege = document.querySelector('#input-text');
const inputAddDate = document.querySelector('#input-date');
const btnAddMessege = document.querySelector('.main-form__button');
const mainTodoList = document.querySelector('.todo-list'); //todo list

let todoList = [];  //array for to Do List

function checkStorage () {
    if(localStorage.getItem('todo')) {  //подтягиваем данные из локалсторейдж
        todoList = JSON.parse(localStorage.getItem('todo')); //если они там есть то парсим их и записываем в массив
        displayMesseges();
    };
};

checkStorage();

btnAddMessege.addEventListener('click', createTodoElem);

function createTodoElem (e) {
    e.preventDefault();

    if(!inputAddMessege.value) {
        inputAddMessege.placeholder = "Вы не ввели данные!";

        inputAddMessege.classList.remove('input__error');
        inputAddMessege.offsetWidth = inputAddMessege.offsetWidth;
        inputAddMessege.classList.add('input__error');

    } else {
        inputAddMessege.classList.remove('input__error');
        inputAddMessege.placeholder = "данные приняты";

        let newTodo = {  //objeckt for new todo messege
            todo: inputAddMessege.value,
            deadline: inputAddDate.value,
        };

        inputAddMessege.value = "";  //clear input text
        inputAddDate.value = "";    //clear input date

        todoList.push(newTodo); //push new objeckt to "todo" array
        displayMesseges();  //create new todo list elem for page

        localStorage.setItem('todo', JSON.stringify(todoList)); //передали в локалсторейдж
    }

}

function displayMesseges() {
    let displayMessege = '';

    todoList.forEach(function(item, i) {
        displayMessege += `
        <li class="todo-list__elem">
            <div class="todo-list__text">В${item.todo}</div>
            <div class="todo-list__buttons">
                <button class="btn todo-list__btn delite-btn data-delite-btn="${i}"" type="button">Delite</button>
                <button class="btn todo-list__btn done-btn data-done-btn="${i}" type="button">is done</button>
            </div>
            <div class="todo-list__time">
                <span class="days todo-list__date-span">05 : days</span>
                <span class="hourse todo-list__date-span">16 : hourse</span>
                <span class="minutes todo-list__date-span">45 : minutes</span>
                <span class="seconds todo-list__date-span">33 : seconds</span>
            </div>
        </li>
        `;
        mainTodoList.innerHTML = displayMessege;
    });

    deliteListElem();
};

function deliteListElem() {
    const deliteBtn = document.querySelectorAll('.delite-btn');

    deliteBtn.forEach(btn => {
        btn.addEventListener('click', deleteElem);
    });

    function deleteElem(e) {
        let btnIndex = e.target.getAttribute('data-delite-btn');
        todoList.splice(btnIndex, 1);

        localStorage.setItem('todo', JSON.stringify(todoList));

        if(todoList.length <= 0) {
            mainTodoList.innerHTML = 'Add new list elem';
        } else {
            displayMesseges();
        }
    };
};




