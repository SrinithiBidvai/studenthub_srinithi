let totalNoOfTasks=0;
let tasksCompleted=0;
let result=document.getElementById("result");
const newTaskName=document.getElementById("new-task");
let taskList=[];

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
        result.textContent=`Tasks Completed: ${tasksCompleted}/${totalNoOfTasks}`;
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
        result.textContent=`Tasks Completed: ${tasksCompleted}/${totalNoOfTasks}`;
    }
    result.textContent=`Tasks Completed: ${tasksCompleted}/${totalNoOfTasks}`;

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

        result.textContent = `Tasks Completed: 0/0`;
    }
}

function resetHabits(){
    const habits=document.querySelectorAll(".habits input");
    habits.forEach(habit => {
        habit.checked=false;
    })
}

let savedTasks =
JSON.parse(localStorage.getItem("tasks"));

if(savedTasks){

    taskList = savedTasks;

    totalNoOfTasks = taskList.length;
    tasksCompleted = taskList.filter(task => task.completed).length;

    result.textContent =
    `Tasks Completed: ${tasksCompleted}/${totalNoOfTasks}`;

    savedTasks.forEach((task,index) => {
        createTask(task.text,index,task.completed);
    });
}











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
}
function pause(){
    if (isrunning==true){
        clearInterval(timer);
        elapsedtime=Date.now()-starttime;
        isrunning=false;
    }
}
function start(){
    if (isrunning==false){
        starttime=Date.now()-elapsedtime;
        timer=setInterval(update,100);
        isrunning=true;
    }

}
function update(){
    const currtime=Date.now();
    elapsedtime=currtime-starttime;
    let hours=Math.floor(elapsedtime/(1000*60*60));
    let mins=Math.floor(elapsedtime/(1000*60)%60);
    let secs=Math.floor(elapsedtime/1000%60);
    hours=String(hours).padStart(2,"0");
    mins=String(mins).padStart(2,"0");
    secs=String(secs).padStart(2,"0");
    display.textContent=`${hours}:${mins}:${secs}`;
}

