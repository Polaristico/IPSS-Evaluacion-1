const boton = document.getElementById("boton");

boton.addEventListener("click", function() {
    alert("¡Hola! Has presionado el botón.");
});

function mostrarMensaje(nombreProducto) {
    const elemento = document.getElementById('mensaje-juegos');
    elemento.textContent = 'Agregaste "' + nombreProducto + '" a tu carrito de compras.';
    elemento.style.display = 'block';
}