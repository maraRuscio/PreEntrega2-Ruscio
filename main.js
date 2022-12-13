/* PreEntrega2 - Ruscio - Control de stock */
// clase insumo

class Insumo{
    constructor (nombre, cantidad, stockMinimo){
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.stockMinimo = stockMinimo;
    }
}
const pouch = new Insumo ("Pouch GM", 4000, 1000);
const etiquetasOPP = new Insumo ("EtiquetasOPP", 32000, 15000);
const IFU = new Insumo ("IFU", 600, 200);
const tarjetaImplante = new Insumo ("Tarjeta de implante", 4000, 1000);

const arrayInsumos = [pouch, etiquetasOPP, IFU, tarjetaImplante];

//console.log(arrayInsumos);

//Funciones 
// funcion para acceder al menu de opciones
function menu(){
    let opcion = parseInt(prompt("Ingrese una opcion: \n 1)Nuevo Insumo. \n 2)Eliminar Insumo. \n 3)Descontar unidades de Insumos.\n 4)Recepcion de Orden de compra.\n 5)Consulta de Stock individual. \n 6) Consulta sobre necesidad de reposicion de stock.\n 7) Listar el stock. \n"));
    return opcion;
};

// Funcion para agregar un insumo
function nuevoInsumo(){
    let nombre = prompt("Ingrese el nombre del nuevo insumo: ");
    let cantidad = parseInt(prompt("Ingrese la cantidad que tiene disponible del insumo nuevo: "));
    let stockMinimo = parseInt(prompt("Ingrese el minimo stock que debe tener para realizar la OC y no quedarse sin stock, mientras ocurre la reposicion: "));
    let nuevoI = new Insumo(nombre, cantidad, stockMinimo);
    arrayInsumos.push(nuevoI);
    console.log(arrayInsumos);
};
// Funcion para eliminar un insumo
function  eliminarInsumo(){
    let bajaI = prompt("Ingrese el producto que quiere eliminar: ");
    let insumo = arrayInsumos.find(insumo => insumo.nombre === bajaI);
    let indice = arrayInsumos.indexOf(insumo);
    if (indice >= 0){
        arrayInsumos.splice(indice, 1);
        console.log(arrayInsumos);
    }else{ alert(`el insumo ingresado ${bajaI}, no se encuntra en el stock.` )}
};
// Funcion para descontar cantidades de un insumo
function descontarInsumo(){
    let modInsumo = prompt("Ingrese el nombre del insumo que quiere descontar: ");
    let insumo = arrayInsumos.find(insumo => insumo.nombre === modInsumo);
    let indice1 = arrayInsumos.indexOf (insumo);
    if (indice1 >= 0){
        let nombre = arrayInsumos[indice1].nombre;
        let descuento = parseInt(prompt("Ingrese la cantidad del insumo a descontar: "));
        let cant = arrayInsumos[indice1].cantidad - descuento;
        let stockMinimo = arrayInsumos[indice1].stockMinimo;
        let insumoModificado = new Insumo(nombre, cant, stockMinimo);
        arrayInsumos.splice(indice1, 1, insumoModificado);
        console.log(arrayInsumos);
    }else  {alert(`el insumo ingresado ${modInsumo}, no se encuntra en el stock.` )} 
};
// Funcion para recepcionar insumos
function recepcionOC (){
    let recpInsumo = prompt("Ingrese el nombre del insumo que quiere recepcionar: ");
    let insumo = arrayInsumos.find(insumo => insumo.nombre === recpInsumo);
    let indice = arrayInsumos.indexOf (insumo);
    if (indice >= 0){
        let nombre = recpInsumo;
        let recepcion = (arrayInsumos[indice].cantidad) + parseInt(prompt("Ingrese la cantidad del insumo a ingresar: "));
        let stockMinimo = arrayInsumos[indice].stockMinimo;
        let insumoModificado = new Insumo (nombre, recepcion, stockMinimo);
        arrayInsumos.splice(indice, 1, insumoModificado);
        console.log(arrayInsumos);
    }else  {alert(`el insumo ingresado ${recpInsumo}, no se encuntra en el stock.` )} 
};
// Funcion para consultar el stock
function consultaStock (){
    let conInsumo = prompt("Ingrese el nombre del insumo que quiere saber el stock: ");
    let insumo = arrayInsumos.find(insumo => insumo.nombre === conInsumo);
    let indice = arrayInsumos.indexOf (insumo);
    if (indice >= 0){
        alert (`La cantidad disponible de ${arrayInsumos[indice].nombre} es de: ${arrayInsumos[indice].cantidad} unidades`);
    }else  {alert(`el insumo ingresado ${conInsumo}, no se encuntra en el stock.` )}
};
// Funcion para consultar que insumos estan por debajo del stock minimo
function necesidadReposicion(){
    arrayInsumos.forEach((insumo) => {
        if ( insumo.cantidad <= insumo.stockMinimo ){
            console.log (`El stock del isumo ${insumo.nombre}, es de ${insumo.cantidad}, este valor es igual o menor al stock Minimo (${insumo.stockMinimo}). \n No te cuelgues y arma la Orden de compra. ` )
        };
    });

};
//Funcion listar el stock
function listarStock(){
    arrayInsumos.forEach((insumo) => {
        console.log (`El stock del isumo ${insumo.nombre}, es ${insumo.cantidad} unidades`)
        }
    )
    };

//Ejecuto el programa
let entrar = prompt("¿Quiere ingresar al stock de area tecnica? (si, acceder, cualquier respuesta diferente para salir)").toLowerCase();

while(entrar == "si" ){
    let opcion = menu();
    switch (opcion){
        case 1: 
        nuevoInsumo();
        break;
        case 2:
            eliminarInsumo();
            break;
        case 3:
            descontarInsumo();
            break;
        case 4:
            recepcionOC ();
            break;
        case 5: 
            consultaStock ();
            break;
        case 6:
            necesidadReposicion();
            break;
        case 7:
            listarStock();
            break;
        default:
        alert ("Opción incorrecta, vuelva a intentarlo")
        break;
    };
    entrar = prompt("¿Quiere seguir operando en el stock de area tecnica? (si, para continuar, cualquier respuesta diferente para salir)").toLowerCase();
}
alert ("Se ingreso una respuesta diferente a 'si'.\n Gracias por utilizar el stock de área técnica");