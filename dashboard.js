let totalNoOfTasks=0;
let tasksCompleted=0;
let result=document.getElementById("result");
const newTaskName=document.getElementById("new-task");
let taskList=[];
result.textContent = `0/0`;


//for adding task
function addTask(){

    if (newTaskName.value==""){
        return;
    }
     totalNoOfTasks++;
    
    /*const newTask=document.createElement("input");
    newTask.type="checkbox";
    newTask.onclick=function(){
        if(newTask.checked==true){
            tasksCompleted++;
            task.style.textDecoration = "line-through";
        }
        else{
            tasksCompleted--;
            task.style.textDecoration = "None";
        }
        result.textContent=`Tasks Completed: ${tasksCompleted}/${totalNoOfTasks}`;
    }*/

    taskList.push({
    text: newTaskName.value,
    completed: false
    });

    let index = taskList.length - 1;
    createTask(newTaskName.value,index);

    localStorage.setItem(
    "tasks",
    JSON.stringify(taskList)
    );
    newTaskName.value=""; 
    /*del.onclick = function() {

             if(newTask.checked==true){
            tasksCompleted--;
            }
            task.remove();
            totalNoOfTasks--;
            result.textContent=`Tasks Completed: ${tasksCompleted}/${totalNoOfTasks}`;
        
    }
    result.textContent=`Tasks Completed: ${tasksCompleted}/${totalNoOfTasks}`;*/

}


function createTask(taskText,index,completed=false){

    const task=document.createElement("div");
    task.className="tasks";

    const del=document.createElement("button");
    del.className="delete";
    del.textContent="DEL";

    const newTask=document.createElement("input");
    newTask.type="checkbox";
    newTask.checked = completed;
    if(completed){
        task.style.textDecoration = "line-through";
    }

    newTask.onclick=function(){
        taskList[index].completed = newTask.checked;
        localStorage.setItem(
            "tasks",
            JSON.stringify(taskList)
        );
        if(newTask.checked==true){
            tasksCompleted++;
            task.style.textDecoration = "line-through";
        }
        else{
            tasksCompleted--;
            task.style.textDecoration = "None";
        }
        result.textContent=`${tasksCompleted}/${totalNoOfTasks}`;
    }

    document.getElementById("whole-list").append(task);

    task.append(newTask);
    task.append(taskText);
    task.append(del);

    del.onclick = function(){

        taskList.splice(index,1);

        localStorage.setItem(
            "tasks",
            JSON.stringify(taskList)
        );

        document.getElementById("whole-list").innerHTML = "";

        taskList.forEach((task,index) => {
            createTask(task.text,index,task.completed);
        });
        if(newTask.checked==true){
            tasksCompleted--;
            }
        totalNoOfTasks--;
        result.textContent=`${tasksCompleted}/${totalNoOfTasks}`;
    }
    result.textContent=`${tasksCompleted}/${totalNoOfTasks}`;

}

//to add task using enter
newTaskName.addEventListener("keydown",event =>{
    if (event.key=="Enter" && newTaskName.value!=""){
        addTask();
        
    }
})


function cleartasks(){
    let perm=window.confirm("Are you sure you want to delete all the tasks?");

    if(perm){

        document.getElementById("whole-list").innerHTML = "";

        taskList = [];
        localStorage.removeItem("tasks");

        totalNoOfTasks = 0;
        tasksCompleted = 0;

        result.textContent = `0/0`;
    }
}

function resetHabits(){
    const habits=document.querySelectorAll(".habits input");
    habits.forEach(habit => {
        habit.checked=false;
    })
    saveHabits();
}

function updateHabitStatus(){

    const habits=document.querySelectorAll(".habits input");
    let habitsDone=0;
    habits.forEach(habit => {
            if (habit.checked==true){
                habitsDone++;
            }
        })
    if (habitsDone==5){
        document.getElementById("progress").textContent="On track";
    }
    else{
        document.getElementById("progress").textContent="Needs attention";
    }
    habits.forEach(habit => {
    habit.addEventListener("change", updateHabitStatus);
    });
}
updateHabitStatus();

const habits=document.querySelectorAll(".habits input");
habits.forEach(habit => {
    habit.addEventListener("change", saveHabits);
});

function saveHabits(){

    let habitData = [];

    habits.forEach(habit => {
        habitData.push(habit.checked);
    });

    localStorage.setItem(
        "habits",
        JSON.stringify(habitData)
    );
}



let savedTasks =
JSON.parse(localStorage.getItem("tasks"));

if(savedTasks){

    taskList = savedTasks;

    totalNoOfTasks = taskList.length;
    tasksCompleted = taskList.filter(task => task.completed).length;

    result.textContent =
    `${tasksCompleted}/${totalNoOfTasks}`;

    savedTasks.forEach((task,index) => {
        createTask(task.text,index,task.completed);
    });
}

let savedHabits =
JSON.parse(localStorage.getItem("habits"));
if(savedHabits){

    habits.forEach((habit,index) => {
        habit.checked = savedHabits[index];
    });

}
updateHabitStatus();










let display=document.getElementById("time");
let starttime=0;
let elapsedtime=0;
let timer=null;
let isrunning=false;

function reset(){
    clearInterval(timer);
    elapsedtime=0;
    starttime=0;
    display.textContent=`00:00:00`;
    isrunning=false;
    saveTimer();
    let totalMinutes = Math.floor(elapsedtime / (1000 * 60));
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

document.getElementById("focusTime").textContent =
`${hours}h ${minutes}m`;
}
function pause(){
    if (isrunning==true){
        clearInterval(timer);
        elapsedtime=Date.now()-starttime;
        isrunning=false;
        saveTimer();
    }
}
function start(){
    if (isrunning==false){
        starttime=Date.now()-elapsedtime;
        timer=setInterval(update,100);
        isrunning=true;
        saveTimer();
        
    }

}
function update(){
    
    if(isrunning){
        const currtime=Date.now();
        elapsedtime = currtime-starttime;
    }
    let hours=Math.floor(elapsedtime/(1000*60*60));
    let mins=Math.floor(elapsedtime/(1000*60)%60);
    let secs=Math.floor(elapsedtime/1000%60);
    hours=String(hours).padStart(2,"0");
    mins=String(mins).padStart(2,"0");
    secs=String(secs).padStart(2,"0");
    display.textContent=`${hours}:${mins}:${secs}`;
    saveTimer();  
    let totalMinutes = Math.floor(elapsedtime / (1000 * 60));
    let minutes = totalMinutes % 60;

    document.getElementById("focusTime").textContent =
    `${hours}h ${minutes}m`;
}

function saveTimer(){
    localStorage.setItem(
        "timer",
        JSON.stringify({
            elapsedtime: elapsedtime,
            isrunning: isrunning
        })
    );
}

let savedTimer =
JSON.parse(localStorage.getItem("timer"));

let totalMinutes = Math.floor(elapsedtime / (1000 * 60));
let hours = Math.floor(totalMinutes / 60);
let minutes = totalMinutes % 60;

document.getElementById("focusTime").textContent =
`${hours}h ${minutes}m`;


if(savedTimer){

    elapsedtime = savedTimer.elapsedtime;
    isrunning = false;   // Always start paused after refresh

    update();
}
