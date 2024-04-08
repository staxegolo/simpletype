let textoPrueba = `Lorem Ipsum is simply dummy 
text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy 
text ever since the 1500s, when an unknown printer 
took a galley of type and scrambled it to make a 
type specimen book. It has survived not only five 
centuries, but also the leap into electronic 
typesetting, remaining essentially unchanged. 
It was popularised in the 1960s with the release of
 Letraset sheets containing Lorem`;
let TIEMPO_INICIAL = 30
let tiempoActual = TIEMPO_INICIAL 

let textoParseado = textoPrueba.split(" ").map((palabra)=> palabra.trim().split(''));
let parrafoJuego = document.querySelector(".game p");
let tiempo = document.querySelector(".tiempo");

let textoTageado = textoParseado.reduce((palabrasTageadas, palabra) => 
palabrasTageadas + 
`<st-word>${palabra.reduce((letrasTageadas,letra) => letrasTageadas + `<st-letter>${letra}</st-letter>`,'')}</st-word> `,
'');

parrafoJuego.innerHTML += textoTageado
tiempo.textContent = TIEMPO_INICIAL

const intervalID = setInterval(() =>{
    tiempoActual --;
    tiempo.textContent = tiempoActual 
    if(tiempoActual === 0)
        clearInterval(intervalID);
}, 1000);



const $input = document.querySelector('input[type="text"]');
let $currentWord = document.querySelector('st-word:first-child');
let indexCurrentWord = 0;
let $letters = $currentWord.querySelectorAll('st-letter');
let $currentLetter = $letters[0];
let errorFlag = 0

//$input.maxLength = $letters.length;






$input.addEventListener('input',(event) =>{
    if(event.inputType === "deleteContentBackward"){
        $currentLetter = (!$currentLetter)? $currentWord.querySelector('st-letter:last-child') : (($currentLetter.previousElementSibling)? $currentLetter.previousElementSibling : $currentLetter) 
        errorFlag = ($currentLetter.classList.contains('wrong') && errorFlag)? (errorFlag - 1) : errorFlag;
        $currentLetter.classList.remove('right','wrong')
    }else if(event.data === ' '){
        $currentWord.classList.add((errorFlag || $currentLetter)? 'wrong' : 'good');
        $currentWord = $currentWord.nextElementSibling;
        $letters = $currentWord.querySelectorAll('st-letter');
        $currentLetter = $letters[0];
        errorFlag = 0
    }else if(event.inputType !== "insertCompositionText" && event.data !== ''){
        if ($currentLetter){
            let aux = $currentLetter
            $currentLetter = $currentLetter.nextElementSibling;
            if(aux.innerHTML === event.data)
                aux.classList.add('right');
            else{
                aux.classList.add('wrong');
                errorFlag++
            }
            
        }
    }

});



