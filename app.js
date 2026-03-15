let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

actualizarCarrito();

function agregarCarrito(nombre, soles, dolares) {

    carrito.push({ nombre, soles, dolares });

    guardar();

    mostrarToast(nombre + " agregado");

    actualizarCarrito();

}

function eliminar(index) {

    carrito.splice(index, 1);

    guardar();

    actualizarCarrito();

}

function guardar() {

    localStorage.setItem("carrito", JSON.stringify(carrito));

}

function actualizarCarrito() {

    let lista = document.getElementById("listaCarrito");
    let contador = document.getElementById("contador");
    let total = document.getElementById("total");

    if (!lista) return;

    lista.innerHTML = "";

    let totalSoles = 0;
    let totalDolares = 0;

    carrito.forEach((juego, i) => {

        let div = document.createElement("div");

        div.classList.add("item");

        totalSoles += juego.soles;
        totalDolares += juego.dolares;

        div.innerHTML = `
${juego.nombre} 
S/${juego.soles} | $${juego.dolares}
<button class="eliminar" onclick="eliminar(${i})">X</button>
`;

        lista.appendChild(div);

    });

    contador.innerText = carrito.length;

    total.innerHTML = `
Total Soles: S/. ${totalSoles} <br>
Total Dolares: $. ${totalDolares}
`;

}

function abrirCarrito() {

    document.getElementById("modal").style.display = "flex";

}

function cerrarCarrito() {

    document.getElementById("modal").style.display = "none";

}

function comprarWhatsApp() {

    let mensaje = "Hola quiero comprar:%0A";

    carrito.forEach(j => {

        mensaje += `- ${j.nombre} S/${j.soles} | $${j.dolares}%0A`;

    });

    window.open(`https://wa.me/51903558624?text=${mensaje}`);

}

function buscarJuego() {

    let input = document.getElementById("buscarJuego").value.toLowerCase();

    let juegos = document.querySelectorAll(".juego");

    juegos.forEach(j => {

        let nombre = j.querySelector("h3").textContent.toLowerCase();

        j.style.display = nombre.includes(input) ? "" : "none";

    });

}

function mostrarToast(texto) {

    let toast = document.getElementById("toast");

    toast.innerText = texto;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}
