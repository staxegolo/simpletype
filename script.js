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

 let textoParseado = textoPrueba.split(" ").map((palabra)=> palabra.split(''));
 let parrafoJuego = document.querySelector(".game p");

let textoTageado = textoParseado.reduce((palabrasTageadas, palabra) => 
palabrasTageadas + 
`<st-word>${palabra.reduce((letrasTageadas,letra) => letrasTageadas + `<st-letter>${letra}</st-letter>`,'')}</st-word> `,
'');

parrafoJuego.innerHTML += textoTageado




