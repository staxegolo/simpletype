//cargamos los elemento del DOM
const $input = document.querySelector('input[type="text"]');
const $parrafoJuego = document.querySelector(".game p");
const $tiempo = document.querySelector(".tiempo");
const $message = document.querySelector(".message span");
const $button = document.querySelector(".message button");

//creamos las variables del juego
let TIME = 0;
let currentTagedText;
let $currentWord ;
let indexCurrentWord ;
let $letters;
let $currentLetter;
let errorFlag;

//evento que controla el timer
let intervalID;


$button.addEventListener('click', resetGame);


//agregamos la logia del juego
$input.addEventListener('input',(event) =>{
    if(event.inputType === "deleteContentBackward"){
        $currentLetter?.classList.remove('active');
        $currentLetter = (!$currentLetter)? $currentWord.querySelector('st-letter:last-child') : (($currentLetter.previousElementSibling)? $currentLetter.previousElementSibling : $currentLetter) 
        $currentLetter.classList.remove('end');
        $currentLetter.classList.add('active');
        errorFlag = ($currentLetter.classList.contains('wrong') && errorFlag)? (errorFlag - 1) : errorFlag;
        $currentLetter.classList.remove('right','wrong')
    }else if(event.data === ' '){
        $currentWord.classList.add((errorFlag || $currentLetter)? 'wrong' : 'good');
        ($currentLetter)? $currentLetter.classList.remove('active', 'end') : $currentWord.querySelector('st-letter:last-child').classList.remove('active', 'end');

        $currentWord = $currentWord.nextElementSibling;
        $letters = $currentWord.querySelectorAll('st-letter');
        $currentLetter = $letters[0];
        $currentLetter.classList.add('active');
        errorFlag = 0
    }else if(event.inputType !== "insertCompositionText" && event.data !== ''){
        if ($currentLetter){
            let aux = $currentLetter
            $currentLetter = $currentLetter.nextElementSibling;
            aux.classList.remove('active');
            ($currentLetter)? ($currentLetter.classList.add('active')) :(aux.classList.add('active', 'end'));
            
            if(aux.innerHTML === event.data)
                aux.classList.add('right');
            else{
                aux.classList.add('wrong');
                errorFlag++
            }
            
            
        }
    }

});

//Posibilidar de cambiar el tiempo
document.querySelectorAll('input[name="tiempo"]').forEach((i)=> i.addEventListener('change', (e)=>{resetGame();$input.focus();}))

//crea el texto del juego
function createTextTags(){
    let textoPrueba = `Lorem Ipsum is simply dummy 
text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy 
text ever since the 1500s, when an unknown printer 
took a galley of type and scrambled it to make a H
type specimen book. It has survived not only five 
centuries, but also the leap into electronic 
typesetting, remaining essentially unchanged. 
It was popularised in the 1960s with the release of
 Letraset sheets containing Lorem`;
    let parsedText = textoPrueba.split(" ").map((word)=> word.trim().split(''));
    let tagedText = parsedText.reduce((tagedWords, word) => 
        tagedWords + 
        `<st-word>${word.reduce((tagedLetters,letter) => tagedLetters + `<st-letter>${letter}</st-letter>`,'')}</st-word> `,
    '');
    return tagedText;
}

function initGame(){
    //desactivamos el boton
    $button.hidden = true

    //cargamos las palabras a el html
    currentTagedText = createTextTags();

    //Agregamos las palabras al documento html
    $parrafoJuego.innerHTML = currentTagedText

    // iniciamos las variables para control de las palabras
    $currentWord = document.querySelector('st-word:first-child');
    indexCurrentWord = 0;
    $letters = $currentWord.querySelectorAll('st-letter');
    $currentLetter = $letters[0];
    errorFlag = 0
    $currentLetter.classList.add('active')

    //iniciamos el tiempo
    clearInterval(intervalID)
    TIME = parseInt(document.querySelector('.select-time input:checked').value);
    $tiempo.textContent = TIME

    //Empezamos el juego hasta que el jugador ingrese algun caracter
    
    handleTimerStarting();
}

//inicia a contar
function playTimer(){
    intervalID = setInterval(() =>{
        TIME --;
        console.log(TIME)
        $tiempo.textContent = TIME 
        if(TIME <= 0)
            clearInterval(intervalID);
    }, 1000);
}

//Escuchamos solo la primera vez para empezar a correr el contador
function handleTimerStarting(){
    
    $message.textContent = 'Empieza a Teclear'
    $input.addEventListener('input', inputTimerStaring)
    function inputTimerStaring(event){
        if (event.inputType === "insertText"){
            clearInterval(intervalID)
            playTimer();
            $message.textContent = '';
            $button.hidden = false;
            console.log($button)
            $input.removeEventListener('input', inputTimerStaring)
        }
    }

}

//resetea el juego 
function resetGame(){
    clearInterval(intervalID)
    initGame();
}

initGame();


//funcionalidad de la pagina
//

//modal de about

document.getElementById('about-button').addEventListener('click', () => document.getElementById('about-modal').showModal());

document.getElementById('about-close').addEventListener('click', () => document.getElementById('about-modal').close());

