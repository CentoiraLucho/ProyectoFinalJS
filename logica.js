let carrito = [];
let contenedor = document.getElementById("misprods");
let finalizarBtn = document.getElementById("finalizar")

let productos;
obtenerJson()

function renderizarProductos(){
    for(const producto of productos){
        contenedor.innerHTML += `
            <div class="card col-sm-3">
                <img src=${producto.foto} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.id}</h5>
                    <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <button id='btn${producto.id}' class="btn btn-secondary align-bottom">Agregar</button>
                </div>
            </div>   
        `;
    }
    
        productos.forEach((producto)=>{
        document.getElementById(`btn${producto.id}`).addEventListener('click',()=>{
            agregarACarrito(producto);
    });
});
}



function agregarACarrito(prodAAgregar){
    carrito.push(prodAAgregar);
    console.table(carrito);    
    Swal.fire({
        title: 'Buenisimo!',
        text: `Agregaste pizza de ${prodAAgregar.nombre} a tu compra ! 💪`,
        imageUrl: ` ${prodAAgregar.foto} `,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: src= `${prodAAgregar.nombre}`,
      })
      localStorage.setItem("id", JSON.stringify([prodAAgregar]));

    
    document.getElementById('tablabody').innerHTML += `
        <tr>
            <td>${prodAAgregar.id}</td>
            <td>${prodAAgregar.nombre}</td>
            <td>${prodAAgregar.precio}</td>
            <td> <button class= "btn btn-dark" onclick= "eliminar(event)">❌</button></td>
        </tr>
    `;
    
    let totalCarrito = carrito.reduce((acumulador,producto)=>acumulador+producto.precio,0);
    document.getElementById('total').innerText = 'Total a pagar $: '+totalCarrito;
}
function eliminar(ev){
    console.log(ev);
    let fila = ev.target.parentElement.parentElement;
    console.log(fila);
    let id = fila.children[0].innerText;
    console.log(id);
    let indice = carrito.findIndex(producto => producto.id == id);
    console.log(indice)
    
    carrito.splice(indice,1);
    console.table(carrito);
    
    fila.remove();
    let preciosAcumulados = carrito.reduce((acumulador,producto)=>acumulador+producto.precio,0);
    total.innerText="Total a pagar u$: "+preciosAcumulados;
}

finalizarBtn.onclick=()=>{
    carrito=[];
    document.getElementById('tablabody').innerHTML='';
    document.getElementById('total').innerText = 'Total a pagar $';
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tu compra fue realizada con exito! En 30 minutos tu pedido será entregado!',
        showConfirmButton: false,
        timer: 2500
        
      })
     
}


//Agregando el Json local a mi proyecto 
function obtenerJson(){
    fetch("/productos.json")
    .then((respuesta)=> respuesta.json())
    .then((json)=>{
      productos = json; 
      renderizarProductos(); 
    })};


//validar formulario con eventos
let campoNombre= document.getElementById("nombre")
campoNombre.oninput= () => {
    if(isNaN(campoNombre.value)){
        campoNombre.style.color="black"
    }else{
        campoNombre.style.color="red"
    }
}

