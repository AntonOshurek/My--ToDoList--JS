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

let ToCompleteTasks = [];

function addTocomplete () {
       const donebtn = document.querySelectorAll('.done-btn');

       donebtn.forEach(btn => {
           btn.addEventListener('click', (e) => {
                e.preventDefault();
                let btnIndex = e.target.getAttribute('data-done-btn');

                let newComplete = JSON.stringify(todoList[btnIndex]);
                ToCompleteTasks.push(JSON.parse(newComplete));

                todoList.splice(btnIndex, 1);
                localStorage.setItem('todocomplete', JSON.stringify(ToCompleteTasks));
                localStorage.setItem('todo', JSON.stringify(todoList));

                if(todoList.length <= 0) {
                    mainTodoList.innerHTML = '<p class="none-list-elem-info">You have no scheduled tasks!</p>';
                } else {
                    displayMesseges();
                }
                console.log(localStorage);

           })
       })
}

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
        inputAddMessege.placeholder = "you have not entered data!";

        inputAddMessege.classList.remove('input__error'); /*error animation*/
        inputAddMessege.offsetWidth = inputAddMessege.offsetWidth;
        inputAddMessege.classList.add('input__error');

    } else {
        inputAddMessege.classList.remove('input__error');
        inputAddMessege.placeholder = "data received";

        let newTodo = {  //objeckt for new todo messege
            todo: inputAddMessege.value,
            deadline: inputAddDate.value,
            addyear: new Date().getFullYear(),
            addmonth: new Date().getMonth(),
            addday: new Date().getDate()
        };

        inputAddMessege.value = "";  //clear input text
        inputAddDate.value = "";    //clear input date
        inputAddMessege.focus();

        todoList.push(newTodo); //push new objeckt to "todo" array
        localStorage.setItem('todo', JSON.stringify(todoList)); //hand over to local storage
        displayMesseges();  //create new todo list elem for page

        console.log(localStorage);
    }
}

function displayMesseges() {
    let displayMessege = '';

    todoList.forEach(function(item, i) {

        function getZero (num) { //get zero for date numbers
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        displayMessege += `
        <li class="todo-list__elem">
            <div class="todo-list__text">
                <p>${item.todo}</p>
                <p class="add-date">Add date: <nobr>year-${item.addyear},</nobr> <nobr>Month-${getZero(item.addmonth +1)},</nobr> <nobr>Day-${getZero(item.addday)}</nobr></p>
            </div>
            <div class="todo-list__buttons">
                <button class="btn todo-list__btn delete-btn" data-delete-btn="${i}" type="button" aria-label="click to delete this task">Delete</button>
                <button class="btn todo-list__btn done-btn" data-done-btn="${i}" type="button" aria-label="click to mark this task as completed!">is done</button>
            </div>

            <div class="todo-list__time">
                <span class="todo-list__date-span" id="date__${i}">Deadline &#9760; ${item.deadline}</span>
            </div>
        </li>
        `;

        mainTodoList.innerHTML = displayMessege;
    });
    deliteListElem();
    addTocomplete();
};

function deliteListElem() {
    const deliteBtn = document.querySelectorAll('.delete-btn');

    deliteBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let btnIndex = e.target.getAttribute('data-delete-btn');
            todoList.splice(btnIndex, 1);

            localStorage.setItem('todo', JSON.stringify(todoList));

            if(todoList.length <= 0) {
                mainTodoList.innerHTML = '<p class="none-list-elem-info">You have no scheduled tasks!</p>';
            } else {
                displayMesseges();
            }
        })
    })
};
