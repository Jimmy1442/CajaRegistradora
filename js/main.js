document.addEventListener('DOMContentLoaded', function() {
    const inputsCantidad = document.querySelectorAll('input[type="number"]');

    inputsCantidad.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.value == 0) {
                this.value = '';
            }
        });

        input.addEventListener('blur', function() {
            if (this.value == '') {
                this.value = 0;
            }
        });
    });
});

function buscarProducto() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('productTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) { // Comienza desde 1 para omitir el encabezado
        const td = tr[i].getElementsByTagName('td')[0]; // Solo verifica la columna del nombre del producto
        if (td) {
            const txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none"; // Muestra u oculta la fila
        }
    }
}

function calcularTotal() {
    let total = 0;
    let detalle = '';

    const productos = [
        { nombre: 'Manzanas', precio: 2000, cantidad: document.getElementById('manzanasQty').value, descuento: document.getElementById('manzanasBonus').value },
        { nombre: 'Pan', precio: 1500, cantidad: document.getElementById('panQty').value, descuento: document.getElementById('panBonus').value },
        { nombre: 'Leche', precio: 1000, cantidad: document.getElementById('lecheQty').value, descuento: document.getElementById('lecheBonus').value },
        { nombre: 'Carne', precio: 5000, cantidad: document.getElementById('carneQty').value, descuento: document.getElementById('carneBonus').value },
        { nombre: 'Huevos', precio: 3000, cantidad: document.getElementById('huevosQty').value, descuento: document.getElementById('huevosBonus').value },
        { nombre: 'Queso', precio: 4000, cantidad: document.getElementById('quesoQty').value, descuento: document.getElementById('quesoBonus').value },
        { nombre: 'Papas', precio: 1800, cantidad: document.getElementById('papasQty').value, descuento: document.getElementById('papasBonus').value },
        { nombre: 'Zanahorias', precio: 2500, cantidad: document.getElementById('zanahoriasQty').value, descuento: document.getElementById('zanahoriasBonus').value },
        { nombre: 'Tomates', precio: 2300, cantidad: document.getElementById('tomatesQty').value, descuento: document.getElementById('tomatesBonus').value },
        { nombre: 'Naranjas', precio: 1900, cantidad: document.getElementById('naranjasQty').value, descuento: document.getElementById('naranjasBonus').value },
    ];

    productos.forEach(producto => {
        const cantidad = parseInt(producto.cantidad) || 0; // Convertir a número
        const descuento = parseFloat(producto.descuento) || 0; // Convertir a número

        let subtotal = producto.precio * cantidad;
        subtotal -= subtotal * (descuento / 100); // Descuento en porcentaje

        if (cantidad > 0) {
            total += subtotal;
            detalle += `
                <div class="detalle-item">
                    <span>${producto.nombre} x ${cantidad}</span>
                    <span>$${Math.round(subtotal)} COP</span>
                </div>
            `;
        }
    });

    detalle += `<div class="detalle-total">Total de compras: $${Math.round(total)} COP</div>`;
    document.getElementById('detalleCompra').innerHTML = detalle;
}


function generarFactura() {
    const facturaContainer = document.getElementById('factura');
    const facturaDetalles = document.getElementById('facturaDetalles');
    const fechaFactura = document.getElementById('fechaFactura');
    const totalPagar = document.getElementById('facturaTotal');

    facturaDetalles.innerHTML = ''; // Limpiar detalles anteriores
    let total = 0;
    const productos = [
        { nombre: 'Manzanas', precio: 2000, cantidad: document.getElementById('manzanasQty').value, descuento: document.getElementById('manzanasBonus').value },
        { nombre: 'Pan', precio: 1500, cantidad: document.getElementById('panQty').value, descuento: document.getElementById('panBonus').value },
        { nombre: 'Leche', precio: 1000, cantidad: document.getElementById('lecheQty').value, descuento: document.getElementById('lecheBonus').value },
        { nombre: 'Carne', precio: 5000, cantidad: document.getElementById('carneQty').value, descuento: document.getElementById('carneBonus').value },
        { nombre: 'Huevos', precio: 3000, cantidad: document.getElementById('huevosQty').value, descuento: document.getElementById('huevosBonus').value },
        { nombre: 'Queso', precio: 4000, cantidad: document.getElementById('quesoQty').value, descuento: document.getElementById('quesoBonus').value },
        { nombre: 'Papas', precio: 1800, cantidad: document.getElementById('papasQty').value, descuento: document.getElementById('papasBonus').value },
        { nombre: 'Zanahorias', precio: 2500, cantidad: document.getElementById('zanahoriasQty').value, descuento: document.getElementById('zanahoriasBonus').value },
        { nombre: 'Tomates', precio: 2300, cantidad: document.getElementById('tomatesQty').value, descuento: document.getElementById('tomatesBonus').value },
        { nombre: 'Naranjas', precio: 1900, cantidad: document.getElementById('naranjasQty').value, descuento: document.getElementById('naranjasBonus').value },
    ];

    productos.forEach(producto => {
        const cantidad = parseInt(producto.cantidad) || 0; // Convertir a número
        const descuento = parseFloat(producto.descuento) || 0; // Convertir a número

        if (cantidad > 0) {
            let subtotal = producto.precio * cantidad;
            subtotal -= subtotal * (descuento); // Descuento como decimal

            total += subtotal;

            facturaDetalles.innerHTML += `
                <tr>
                    <td>${producto.nombre}</td>
                    <td>${cantidad}</td>
                    <td>$${producto.precio}</td>
                    <td>${(descuento * 100).toFixed(0)}%</td>
                    <td>$${Math.round(subtotal)} COP</td>
                </tr>
            `;
        }
    });

    // Actualiza la fecha de la factura
    const fecha = new Date().toLocaleString();
    fechaFactura.textContent = fecha;

    // Actualiza el total a pagar
    totalPagar.textContent = `$${Math.round(total)} COP`;

    // Muestra el contenedor de la factura
    facturaContainer.style.display = 'block';
}


function limpiarFormulario() {

    const facturaContainer = document.getElementById('factura');
    const facturaDetalles = document.getElementById('facturaDetalles');
    const fechaFactura = document.getElementById('fechaFactura');
    const totalPagar = document.getElementById('facturaTotal');

    // Limpiar detalles de la factura
    facturaDetalles.innerHTML = '';
    fechaFactura.textContent = '';
    totalPagar.textContent = '';

    // Ocultar la sección de la factura
    facturaContainer.style.display = 'none';
    
    const inputs = document.querySelectorAll('input[type="number"]');
    const selects = document.querySelectorAll('select');

    inputs.forEach(input => input.value = 0);
    selects.forEach(select => select.value = 0);

    document.getElementById('detalleCompra').innerHTML = '';
}

// Añade manejo de eventos para los botones de calcular y limpiar
document.getElementById('calcularBtn').addEventListener('click', calcularTotal);
document.getElementById('limpiarBtn').addEventListener('click', limpiarFormulario);


