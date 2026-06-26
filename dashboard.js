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




const words = [
"computer","the","friend","apple","today","school","yes","water","house","music",
"study","orange","quick","family","coffee","window","book","hello","garden","phone",
"bread","happy","teacher","river","please","strong","car","movie","banana","world",
"learn","chair","okay","smile","road","game","table","work","cloud","thanks",
"mother","keyboard","light","pizza","child","travel","door","morning","football","kind",
"market","screen","always","flower","dream","student","bike","laugh","room","paper",
"doctor","time","clean","juice","forest","brother","computer","drive","night","lesson",
"watch","city","camera","sun","milk","team","building","slow","library","cookie",
"country","friendship","beach","player","mouse","winter","pen","train","beautiful","college",
"tea","grass","story","code","sister","explore","road","rain","simple","fruit",
"money","monitor","father","ocean","burger","exercise","website","welcome","lake","shirt",
"button","tomorrow","home","salt","ball","tree","office","walk","paper","honest",
"hospital","music","summer","bag","class","create","shop","minute","afternoon","mountain",
"program","moon","writing","cook","dream","printer","play","coffee","country","young",
"reading","storm","health","window","mousepad","speaker","store","happy","banana","internet",
"charger","running","cable","garden","hotel","forest","smile","market","bread","teacher",
"apple","think","building","coffee","sport","clean","movie","camera","football","student",
"rice","coffee","friend","better","laugh","village","desk","plane","second","basketball",
"computer","travel","shirt","music","learn","door","good","juice","butter","week",
"website","father","mother","exercise","question","answer","future","coffee","beautiful","world"
];
let typingText=" ";
let typingStartTime = 0;
function createTest(){
    typingText="";
    let i=0;
    for(i=0;i<20;i++){
        let index=Math.floor(Math.random()*words.length);
        typingText+=words[index]+" ";
    }

    typingText+=".";
    document.getElementById("typingText").textContent=typingText;
    document.getElementById("typing").style.display = "none";
    document.getElementById("challenge").style.display = "block";
    document.getElementById("break").style.alignItems = "flex-start";
   typingStartTime = Date.now();
}
const typedText = document.getElementById("challengeText");
typedText.addEventListener("keydown",event =>{
        if(event.key=="Enter"){
            let typingEndTime = Date.now();
            let timeTaken = (typingEndTime - typingStartTime) / 1000; 
            let correctChars = 0;
            let len=typedText.value.length;
            if(len>typingText.length){
                len=typingText.length;
            }

            for(let i = 0; i < len; i++){
                if(typedText.value[i] === typingText[i]){
                    correctChars++;
                }
            }

            let totalWords = correctChars / 5;
            let wpm = Math.round(totalWords / (timeTaken / 60));
            let accuracy = Math.round((correctChars / typedText.value.length) * 100);
            document.getElementById("speed").textContent=`Typing Speed: ${wpm}`;
             document.getElementById("accuracy").textContent=`Accuracy: ${accuracy}`;
        }
    })