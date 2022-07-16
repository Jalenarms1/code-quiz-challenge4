//my array of objects that contain each question set that will help later functions easily load the next index to display and compare the user selection to see if the answer chosen was correct 
var content = [
    {question: "What language is responsible for the stylish presentation of a web page?",
    a: "Python",
    b: "C++",
    c: "CSS",
    d: "JavaScript",
    correct: "CSS"},
    
    {question: "What is CSS an abbreviation for?",
    a: "Computer Software Styling",
    b: "Cascading Style Sheets",
    c: "Computation Style Sheet",
    d: "Corresponding Style Selection",
    correct: "Cascading Style Sheets"},

    {question: "What language is the backbone of the webpage? (The skeletal structure)",
    a: "HTML",
    b: "Java",
    c: "Apex",
    d: "Javascript",
    correct: "HTML"},

    {question: "What language is the puppeteer of the webpage?",
    a: "Java",
    b: "JavaScript",
    c: "Apex",
    d: "CSS",
    correct: "JavaScript"},

    {question: "What HTML tag is used to link the JavaScript file and the HTML file?",
    a: "<a></a>",
    b: "<link/>",
    c: "<script></script>",
    d: "<meta/>",
    correct: "<script></script>"}

]

// refrences the specific property of the object at which index in the array is chosen 
console.log(content[0].a);

console.log(content[0].c === content[0].correct);

// grabbing needed elements from the markup 
var startBtn = document.getElementById("start");
var nextBtn = document.getElementById("next");
var qText = document.getElementById("questions");
var answer1 = document.querySelector("[data-answer1]");
var answer2 = document.querySelector("[data-answer2]");
var answer3 = document.querySelector("[data-answer3]");
var answer4 = document.querySelector("[data-answer4]");
var answerContainer = document.querySelector(".answerContainer");
var possible = document.querySelectorAll("#possibleAnswer");
var mainBox = document.querySelector(".content");
var scoreDiv = document.getElementById("scoreTable");
var saveInput = document.getElementById("scoreSave");
var clearList = document.getElementById("clearList");
var wrongNotice = document.getElementById("notice")
var correctNotice = document.getElementById("c-notice");
var restartBtn = document.getElementById('restart');


let timer = 40;
var timeSlot = document.getElementById("timer");
var scoreBoard = document.getElementById("score");
var scoreList = document.getElementById("keepScore");
var finalScores = [];
var each;

// qIndex is storing the value of the current index that should be displayed from the content array
let qIndex = 0;
let score = 0;
scoreBoard.innerText = score + "/" + qIndex;

// this function will apply each property value necessary into the correct elements on the markup based on the current index of the content array
function loadNext(){
    var currentQ = content[qIndex];

    qText.innerText = currentQ.question;
    answer1.innerText = currentQ.a;
    answer2.innerText = currentQ.b;
    answer3.innerText = currentQ.c;
    answer4.innerText = currentQ.d;   
}

// this function starts the timer and initializes the load up of the above function starting at the index value of the qIndex variable, starting at its original 0 value
function startGame(){
    startBtn.classList.add("hide");
    answerContainer.classList.remove("hide");
    var gameTimer = setInterval(function(){

        timer--;
        timeSlot.innerText = timer;

        if(timer === 0 || qIndex == content.length){
            clearInterval(gameTimer)
            scoreBoard.innerText = "";
            timeSlot.innerText = "GAME OVER!"; 
            mainBox.innerText = `GAME OVER! You got ${score}/${qIndex} questions correct`;
            scoreDiv.classList.remove("hide");
            clearList.classList.remove("hide");
            correctNotice.classList.add("hide");
            wrongNotice.classList.add("hide");
            restartBtn.classList.remove("hide");
            
            return     
        }
        
    }, 1000)
    
    loadNext();

    
}

// this function will check if the users selection is correct to store the score out of how many questions have been asked, and will also increment the qIndex with each answer to ensure the next object populates 
function correctCheck(event){
    var event = event.target
    if(event.matches("#possibleAnswer")){
        if(event.innerText == content[qIndex].correct){
            console.log("correct");
            correctNotice.classList.remove("hide");
            wrongNotice.classList.add("hide");
            score++;
            
        }else{
            correctNotice.classList.add("hide");
            wrongNotice.classList.remove("hide");
            if(timer > 10){
                timer = timer - 10;

            } else if(timer > 0 && timer < 10 && timer != 1){
                timer = timer -1;
            }
            
        }
    }
    qIndex++;
    scoreBoard.innerText = score + "/" + qIndex;
    // this code is to be executed when there are no more questions left
    if(qIndex == content.length){
        scoreBoard.innerText = "";
        mainBox.innerText = `GAME OVER! You got ${score}/${qIndex} questions correct`;
        scoreDiv.classList.remove("hide");
        clearList.classList.remove("hide");
        restartBtn.classList.remove("hide");
        return
    }
    
    loadNext();   
}

startBtn.addEventListener("click", startGame);
// this is an event listener for the different buttons that hold the possible answers

possible.forEach(button => {
    button.addEventListener("click", correctCheck);
})

// this function will store the user's input along with their score in the local storage 

function storeScores(){
    localStorage.setItem("items", JSON.stringify(finalScores));   
}

// this function will get the items down from the local storage and store them back in the finalScores array to be displayed when the next user enters their score 

function init(){
    var storage = JSON.parse(localStorage.getItem("items"));
    if(storage !== null){
        finalScores = storage;
    } return storage
}
init();

// this function will create a new list item for each name-saved score and append it to the ol in the markup

function results(event){
    event.preventDefault();
    if(saveInput.value == "") return
    
    var scoreText = saveInput.value + " " + score + "/" + qIndex;
    finalScores.push(scoreText);
    
    for(i = 0; i < finalScores.length; i++){
        var listItems = finalScores[i];

        var each = document.createElement("li");
        each.textContent = listItems;
        scoreList.appendChild(each);
    }
    saveInput.value = "";
    storeScores();
    finalScores = [];      
}
function reloadBrowser(){
    location.reload();
    
}
// clears the list and the local storage
function clear(){
    scoreList.textContent = "";
    localStorage.clear();
         
}
scoreDiv.addEventListener("submit", results);
clearList.addEventListener("click", clear)
restartBtn.addEventListener("click", reloadBrowser);


