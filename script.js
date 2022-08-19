const productos = [{
        nombre: "producto 1",
        precio: 200,
        id: 1
    },
    {
        nombre: "producto 2",
        precio: 1200,
        id: 3
    },
    {
        nombre: "producto 3",
        precio: 10,
        id: 4
    },
    {
        nombre: "producto 4",
        precio: 500,
        id: 5
    },
    {
        nombre: "producto 5",
        precio: 700,
        id: 6
    },
    {
        nombre: "producto 6",
        precio: 900,
        id: 7
    },
    {
        nombre: "producto 7",
        precio: 6600,
        id: 8
    },
]
const containerDiv = document.querySelector(".contenedor");
const carritoDiv = document.querySelector(".carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function crearCards() {
    productos.forEach(prod => {
        containerDiv.innerHTML += `<div class= "d-inline-block m-2 bg-success p-4 border-dark">
        <h4>${prod.nombre}</h4>
        <p>$${prod.precio}</p>
        <button class= "btnCarrito" id="btn-agregar${prod.id}">Agregar</button>
        </div>`;
    });
    agregarFuncionabilidad()
}



function agregarFuncionabilidad() {
    productos.forEach(prod => {
        document.querySelector(`#btn-agregar${prod.id}`).addEventListener("click", () => {
            console.log(prod)
            agregarAlCarrito(prod)
        })
    });

}

function agregarAlCarrito(prod) {
    let existe = carrito.some(productoSome => productoSome.id === prod.id)
    if (existe === false) {
        prod.cantidad = 1
        carrito.push(prod);
    } else {
        let prodFind = carrito.find((productoFind) => productoFind.id === prod.id)
        prodFind.cantidad++;
        // prod.cantidad++
    }
    // carrito.push(prod);
    console.log(carrito)
    renderizarCarrito()
}

function renderizarCarrito() {
    carritoDiv.innerHTML = ``
    carrito.forEach(prod => {
        carritoDiv.innerHTML += `<div class= "d-inline-block m-2 bg-warning  p-4 border-dark">
        <h4>${prod.nombre}</h4>
        <p>$${prod.precio}</p>
        <p>cantidad = ${prod.cantidad}</p>
        <p> total = $${(prod.cantidad*prod.precio)}</p>
        <button class= "btnCarrito" id="btn-menos${prod.id}"> - </button>
        <button class= "btnCarrito" id="btn-borrar${prod.id}">borrar</button>
        </div>
        `
    })
    localStorage.setItem("carrito", JSON.stringify(carrito))
    borrarProducto()
    borrarUnidad()
}

function borrarProducto() {
    carrito.forEach(prod => {
        document
            .querySelector(`#btn-borrar${prod.id}`)
            .addEventListener("click", () => {
                carrito = carrito.filter(
                    (productoFilter) => productoFilter.id !== prod.id
                );
                renderizarCarrito();
            });
    });
}

function borrarUnidad() {
    carrito.forEach(prod => {
        document.querySelector(`#btn-menos${prod.id}`).addEventListener("click", () => {
            let producto = carrito.find((productoEliminar) => productoEliminar.id === prod.id)
            producto.cantidad--;
            if (producto.cantidad < 1) {
                carrito = carrito.filter(
                    (productoFilter) => productoFilter.id !== prod.id);
            }
            renderizarCarrito()
        })
    })
}



crearCards();
renderizarCarrito();