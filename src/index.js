//  Tengo que agregar el regex para fecha y la lista para tipos de base 
// Quizás se podría implementar un autocompleta para no errar
const identificadorBases=["EUR", "CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"]
let selectorBase= document.getElementById("base");
for(let i=0; i<identificadorBases.length; i++){
    let opcion= document.createElement("option");
    opcion.innerHTML= identificadorBases[i];
    opcion.setAttribute("value",identificadorBases[i]);
    selectorBase.appendChild(opcion);
}
let botonEnviar= document.querySelector("button");
botonEnviar.onclick=buscarDatos;
let sarasa;
function buscarDatos(){
    let tablaMonedas= document.getElementById("monedas"),
    baseElegida= selectorBase.value,
    fechas= document.getElementById("fecha"),
    fechaElegida=fechas.value;
    verificarSinHijos(tablaMonedas);
    if(fechas.value===""){
        const fechaActual= new Date();
        fechaElegida=fechaActual.getFullYear()+'-'+(fechaActual.getMonth()+1)+'-'+fechaActual.getDate();
    }
    fetch(`https://api.exchangeratesapi.io/${fechaElegida}?base=${baseElegida}`)
        .then(response=>response.json())
        .then(function(data){
            let rates= data.rates;
            for(let[base,valor] of Object.entries(rates)){
                let moneda= document.createElement("li");
                moneda.innerHTML=`${base}: ${valor}`;
                tablaMonedas.appendChild(moneda);
            }
        })
}


function verificarSinHijos(padre){
    if(padre.firstChild){
        borrarHijos(padre);
    }
}
function borrarHijos(padre){
    while (padre.firstChild) {
        padre.removeChild(padre.lastChild);
    }
}
