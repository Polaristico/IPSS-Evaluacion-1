const boton = document.getElementById("boton");
if (boton) {
    boton.addEventListener("click", function() {
        alert("¡Hola! Has presionado el botón.");
    });
}

const apiButton = document.getElementById("cargar-api");
if (apiButton) {
    apiButton.addEventListener("click", cargarProductosRecomendados);
}

async function cargarProductosRecomendados() {
    const contenedor = document.getElementById('api-result');
    contenedor.innerHTML = '<p class="text-secondary">Cargando resultados...</p>';

    try {
        const response = await fetch('https://fakestoreapi.com/products/category/electronics');
        const productos = await response.json();
        const productosComputo = productos.slice(0, 3);

        const formateadorCLP = new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            maximumFractionDigits: 0
        });
        const tipoCambio = 950;

        const obtenerDescripcionEsp = titulo => {
            const texto = titulo.toLowerCase();
            if (texto.includes('laptop') || texto.includes('acer') || texto.includes('mac') || texto.includes('chromebook')) {
                return 'Laptop potente para trabajo, estudio y multimedia.';
            }
            if (texto.includes('monitor') || texto.includes('display') || texto.includes('samsung 49-inch')) {
                return 'Monitor amplio y nítido ideal para multitarea.';
            }
            if (texto.includes('ssd') || texto.includes('hd') || texto.includes('disco') || texto.includes('sandisk') || texto.includes('wd')) {
                return 'Almacenamiento rápido y confiable para tus archivos.';
            }
            if (texto.includes('headphone') || texto.includes('audífono') || texto.includes('apple airpods') || texto.includes('beats')) {
                return 'Audio cómodo y de alta calidad para música y llamadas.';
            }
            return 'Artículo de tecnología diseñado para mayor rendimiento.';
        };

        contenedor.innerHTML = productosComputo.map(producto => {
            const precioCLP = Math.round(producto.price * tipoCambio);
            const precioFormateado = formateadorCLP.format(precioCLP);
            const descripcionEsp = obtenerDescripcionEsp(producto.title);

            return `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card border-0 shadow-sm h-100 p-3">
                    <img src="${producto.image}" alt="${producto.title}" class="img-fluid mb-3 api-card-image">
                    <h4 class="fw-bold text-primary" style="font-size: 1rem;">${producto.title}</h4>
                    <p class="text-secondary mb-2">${descripcionEsp}</p>
                    <p class="fw-bold">${precioFormateado}</p>
                </div>
            </div>
        `;
        }).join('');
    } catch (error) {
        contenedor.innerHTML = '<p class="text-danger">No se pudieron cargar los datos. Intenta de nuevo.</p>';
        console.error('Error cargando productos:', error);
    }
}

function mostrarMensaje(nombreProducto) {
    const elemento = document.getElementById('mensaje-juegos');
    elemento.textContent = 'Agregaste "' + nombreProducto + '" a tu carrito de compras.';
    elemento.style.display = 'block';
}

