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
            adddate: new Date()
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

        displayMessege += `
        <li class="todo-list__elem">
            <div class="todo-list__text">В${item.todo}</div>
            <div class="todo-list__buttons">
                <button class="btn todo-list__btn delite-btn data-delite-btn="${i}"" type="button">Delite</button>
                <button class="btn todo-list__btn done-btn data-done-btn="${i}" type="button">is done</button>
            </div>

            <div class="todo-list__time">
                <span class="days todo-list__date-span" ><span id="days__${i}"></span> days</span>
                <span class="hourse todo-list__date-span" id="hourse__${i}">hourse --</span>
                <span class="minutes todo-list__date-span" id="minutes__${i}">minutes --</span>
                <span class="seconds todo-list__date-span" id="seconds__${i}">seconds --</span>

            </div>
        </li>
        `;

        mainTodoList.innerHTML = displayMessege;
        setClock(i, item.deadline);
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

//timer todo logick

function gettime(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60) % 24));  //получаем остаток от деления (остаток от 24 часов, что бы не выводилось больше часов чем есть в сутках)
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
};

function getZero (num) {  //функция для добавления нуля
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
    const days = document.querySelector(`#days__${selector}`);
    const hours = document.querySelector(`#hourse__${selector}`);
    const minutes = document.querySelector(`#minutes__${selector}`);
    const seconds = document.querySelector(`#seconds__${selector}`);
    const timeInterval = setInterval(updateClock, 1000);

    updateClock(); //для устранения мигания таймера запускаем функцию один раз при загрузке страницы

    function updateClock () {
        const t = gettime(endtime);
        //console.log(t);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    };
};




