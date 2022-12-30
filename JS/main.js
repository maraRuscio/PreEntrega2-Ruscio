/* PreEntrega3 - Ruscio - Control de stock */
// Modo oscuro
const botonFondo = document.getElementById("botonFondo");

botonFondo.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  
    if(document.body.classList.contains("dark")) {
        botonFondo.innerText = "Fondo Claro";
        botonFondo.classList.add("button_dark")
        localStorage.setItem("modo", "dark");
    } else {
        botonFondo.innerText = "Fondo Oscuro";
        botonFondo.classList.remove("button_dark");
        localStorage.setItem("modo", "light");
    }
});

//Recuperamos el modo del localStorage: 

const modo = localStorage.getItem("modo");
if(modo === "dark") {
    document.body.classList.add("dark");
    botonFondo.innerText = "Fondo Claro";
    botonFondo.classList.add("button_dark")
} else {
    document.body.classList.remove("dark");
    botonFondo.innerText = "Fondo Oscuro";
    botonFondo.classList.remove("button_dark");
};

// clase insumo

class Insumo{
    constructor (nombre, cantidad, stockMinimo){
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.stockMinimo = stockMinimo;
    }
};

const pouch = new Insumo ("pouch gm", 4000, 1000);
const etiquetasOPP = new Insumo ("etiquetasopp", 32000, 15000);
const IFU = new Insumo ("IFU", 600, 200);
const tarjetaImplante = new Insumo ("tarjetas de implantes", 4000, 1000);

let Stock = [pouch, etiquetasOPP, IFU, tarjetaImplante];

/**cargar insumos desde el localstorage **/

if(localStorage.getItem("stock")){
    Stock = JSON.parse(localStorage.getItem("stock"));
}

//Mostrar agregar nuevo insumo

const newI = document.getElementById("nuevoInsumo");
const mostrarnuevo = () =>{
    newI.innerHTML = "";
    const card1 = document.createElement("div");
    card1.classList.add("col");
    card1.innerHTML=`
                    <div class="card bg-transparent border border-primary">
                    <div class= "card-body ">
                    <div class="row">
                        <div class="col"> 
                        <p>Nombre del producto nuevo</p>
                        <p><input type="text" class="form-control" id="nuevoI" placeholder="ingrese el nombre del nuevo producto"></p>
                        <p>Cantidades a ingresar</p>
                        <p><input type="number" class="form-control" id="cantI" placeholder="Cantidasdes a ingresar del nuevo producto"></p>
                        <p>Stock Mínimo</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8"> 
                        <p><input type="number" class="form-control" id="stockMin" placeholder="ingrese la cantidad mínima que puede tener del insumo"></p>
                        </div>
                        <div class="col-4">                                
                        <button class="btn btn-success btn-sm" id="agregar" > Ingresar producto nuevo </button>
                        </div>
                    </div>
                    </div>
                </div>`
    newI.appendChild(card1);

    // Funcion para agregar un insumo

    const botAgregar = document.getElementById(`agregar`);

    botAgregar.addEventListener("click",()=>{
        const nom = document.getElementById(`nuevoI`).value.toLowerCase();
        const cant = parseInt(document.getElementById(`cantI`).value);
        const sMin = parseInt(document.getElementById(`stockMin`).value);
        nuevoInsumo(nom, cant, sMin);
    });
};

mostrarnuevo();

//Mostrar insumos en la pagina de stock

const contstock = document.getElementById("contstock");
const mostrarstock = () =>{
    contstock.innerHTML = "";
    Stock.forEach( stock =>{
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML=`
                <div class="card bg-transparent border border-primary">
                    <div class= "card-body ">
                        <h5>${stock.nombre}</h5>
                        <p>Stock: ${stock.cantidad} unidades</p>
                        <p>Stock minimo: ${stock.stockMinimo} unidades</p>
                        <div class="row">
                            <div class="col">                              
                                <input type="number" class="form-control" id="form${stock.nombre}" placeholder="ingrese unidades">
                            </div>
                            <div class="col">                                
                                <button class="btn btn-success btn-sm" id="botonI${stock.nombre}" > + </button>

                                <button class="btn btn-warning btn-sm" id="botonD${stock.nombre}" > - </button>

                                <button class="btn btn-danger btn-sm" id="botonE${stock.nombre}" > X </button>
                            </div>
                        </div>
                    </div>
                </div>`

        contstock.appendChild(card);

        //Agregar insumos a un producto existente

        const boton = document.getElementById(`botonI${stock.nombre}`);
        boton.addEventListener("click", () =>{
        const unidades = parseInt(document.getElementById(`form${stock.nombre}`).value);
            recepcionOC (unidades , stock.nombre);
        });
        
        //Descontar productos de uno existente

        const botond = document.getElementById(`botonD${stock.nombre}`);
        botond.addEventListener("click", () =>{
        const unidades = parseInt(document.getElementById(`form${stock.nombre}`).value);
            descontarInsumo (unidades , stock.nombre);
        });

        //Eliminar insumo

        const botone = document.getElementById(`botonE${stock.nombre}`);
        botone.addEventListener("click", () =>{
            eliminarInsumo (stock.nombre);
        });
    } );
    localStorage.setItem("stock", JSON.stringify(Stock));
};

mostrarstock();

//Mostrar lista de insumos criticos
const insumoCritico = document.getElementById("insumoCritico");
const buttonInCri = document.getElementById("buttonInCri");
buttonInCri.addEventListener("click", () =>{
    newI.innerHTML = "";
    contstock.innerHTML = "";
    insumoCritico.innerHTML = "";
    insumoCritico.innerHTML = `
    <div class="row">
        <div class="col-4">Nombre                             
        </div>
        <div class="col-4">Cantidad      
        </div>
        <div class="col-4">Stock Crítico      
        </div>
    </div>
    `;
    Stock.forEach(stock =>{
        if ( stock.cantidad <= stock.stockMinimo ){
            const fila = document.createElement("div");
            fila.classList.add("row");
            fila.innerHTML = `
            <div class="col-4">${stock.nombre}                            
            </div>
            <div class="col-4">${stock.cantidad}      
            </div>
            <div class="col-4">${stock.stockMinimo}      
            </div>
           `
            insumoCritico.appendChild(fila);    
         };
         
    });

});

// Restaurar la pagina de Stock
const buttonStock = document.getElementById("buttonStock");
buttonStock.addEventListener("click", ()=>{
    insumoCritico.innerHTML = "";
    mostrarnuevo();
    mostrarstock();

});


//Funciones 

function nuevoInsumo(nombre, cantidad, stockmin){
    let insumo = Stock.find(insumo => insumo.nombre === nombre);
    let indice = Stock.indexOf (insumo);
    if (indice >= 0){
        recepcionOC(cantidad, nombre);        
    }else  {let nuevoI = new Insumo(nombre, cantidad, stockmin);
        Stock.push(nuevoI);
        mostrarstock();
    }; 

    mostrarnuevo();

};

// Funcion para eliminar un insumo

function  eliminarInsumo(nombre){
    let insumo = Stock.find(insumo => insumo.nombre === nombre);
    let indice = Stock.indexOf(insumo);
    Stock.splice(indice, 1);
    mostrarstock();
};

// Funcion para descontar cantidades de un insumo

function descontarInsumo(cantidades, nombre){
    let insumo = Stock.find(insumo => insumo.nombre === nombre);
    let indice = Stock.indexOf (insumo);
    let cant = Stock[indice].cantidad - cantidades;
    let stockMinimo = Stock[indice].stockMinimo;
    let insumoModificado = new Insumo(nombre, cant, stockMinimo);
    Stock.splice(indice, 1, insumoModificado);
    mostrarstock();    
};

// Funcion para recepcionar insumos

function recepcionOC (cantidades , nombre){
    let insumo = Stock.find(insumo => insumo.nombre === nombre);
    let indice = Stock.indexOf (insumo);
    let cantidad = cantidades + Stock[indice].cantidad;
    let stockMinimo = Stock[indice].stockMinimo;
    let insumoModificado = new Insumo (nombre, cantidad, stockMinimo);
    Stock.splice(indice, 1, insumoModificado);
    mostrarstock();
};

// Funcion para consultar que insumos estan por debajo del stock minimo

function necesidadReposicion(){
    Stock.forEach((insumo) => {
        if ( insumo.cantidad <= insumo.stockMinimo ){
            console.log (`El stock del isumo ${insumo.nombre}, es de ${insumo.cantidad}, este valor es igual o menor al stock Minimo (${insumo.stockMinimo}). \n No te cuelgues y arma la Orden de compra. ` )
        };
    });

};
