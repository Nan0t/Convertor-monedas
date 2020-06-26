const identificadorBases=["EUR", "CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"];
let fechas= document.getElementById("fecha");
let tablaMonedas= document.getElementById("monedas")
let botonEnviar= document.querySelector("button");
let selectorBase= document.getElementById("base");

for(let i=0; i<identificadorBases.length; i++){
    let opcion= document.createElement("option");
    opcion.innerHTML= identificadorBases[i];
    opcion.setAttribute("value",identificadorBases[i]);
    selectorBase.appendChild(opcion);
}

function buscarDatos(){
    let baseElegida= selectorBase.value,
    fechaElegida=fechas.value;
    verificarSinHijos(tablaMonedas);
    if(fechas.value===""){
        fechaElegida=fechaActualEnAAAAMMDD();
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

function fechaActualEnAAAAMMDD(){
    const fechaActual= new Date();
    let mes=fechaActual.getMonth()+1;
    let dia= fechaActual.getDate();
    let anio= fechaActual.getFullYear();
    if(mes <10){
        mes= '0'+mes
    }
    if(dia<10){
        dia= '0'+dia
    }
    return anio+'-'+mes+'-'+dia;    
}

function agregarfechaMaximaCalendarioYSetearValor(){
    fechas.setAttribute("max", fechaActualEnAAAAMMDD());
    fechas.value=fechaActualEnAAAAMMDD();
}

agregarfechaMaximaCalendarioYSetearValor();
botonEnviar.onclick=buscarDatos;