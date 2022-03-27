const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const from = document.querySelector("#form");
const taskName = document.querySelector('#time #taskName');

renderTime();
renderTasks();

form.addEventListener('submit', e => {
    e.preventDefault();
    if(itTask.value !== ''){
        creaeteTask(itTask.value);
        itTask.value = '';
        renderTasks();
    }
});

function creaeteTask(value){

    const newTask = {
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false
    };
    tasks.unshift(newTask);
  
}

function renderTasks(){

    const html = tasks.map(task =>{
       return`
          <div class="task">
              <div class="completed">${task.completed ? `<span class="done">Done</span>` : `<button class="start-Button" data-id="${task.id}">Start</button>`} </div>
              <div class="title">${task.title}</div> 
          </div>
          `;

    })
    const taskContainer = document.querySelector('#tasks');
    taskContainer.innerHTML = html.join('');
    
    const startButton = document.querySelectorAll(".task .start-Button");

    startButton.forEach(button => {
      button.addEventListener('click', e => {
             if(!timer){
                 const id = button.getAttribute('data-id');
                 startButtonHadler(id);
                 button.textContent = 'In progres...'; 
             }
      });
     
    });

}

function startButtonHadler(id){
    time = 25 * 60;
    current = id ;
    const taskIdex = tasks.findIndex((task) =>task.id === id );
    
    taskName.textContent = tasks[taskIdex].title;

    timer = setInterval(() => {
     timeHandler(id);
    }, 1000);
};

function timeHandler(id){
    time--;
    renderTime();

    if(time === 0){ 
      clearInterval(timer);
      markCompleted(id);
      renderTasks();
      timer = null;
      startBreak();

    };
}
function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time / 60 );
    const seconds = parseInt(time % 60 );

    timeDiv.textContent = `${minutes < 10 ? '0': '' }${minutes}:${seconds < 10 ? '0': ''}${seconds}`;
};

function markCompleted(id){
    const taskIdex = tasks.findIndex((task) =>task.id === id );
    tasks[taskIdex].completed = true;
}

function startBreak(){
    time = 5 * 60;
    taskName.textContent = 'Break';
    timerBreak = setInterval(() => {
        timerBreakHanlder();
    }, 1000);
}

function timerBreakHanlder(){
    time--;
    renderTime();

    if(time === 0){ 
        clearInterval(timerBreak);
        current = null;
        taskName.textContent = '';
        renderTasks();
        timerBreak = null;
    }
};