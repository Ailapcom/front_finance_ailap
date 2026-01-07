// Configuración de la API
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/movements'; // Cambia esto por tu URL real

// Función auxiliar para hacer peticiones
async function enviarDatos(endpoint, datos) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Si necesitas autenticación, añade el token aquí
                // 'Authorization': `Bearer ${tu_token}`
            },
            body: JSON.stringify(datos)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado;
    } catch (error) {
        console.error('Error al enviar datos:', error);
        alert('Hubo un error al guardar los datos. Por favor intenta de nuevo.');
        throw error;
    }
}

// Función modificada para registrar ingreso
async function registrarIngreso() {
    const id = Math.floor(Math.random() * 1000000) + 1; // Generar ID aleatorio
    const user_id = 'HMCRPLO94HDGDYFTGD12599';
    const monto = document.getElementById('ingresoMonto').value;
    const categoria = document.getElementById('ingresoCategoria').value;
    const descripcion = document.getElementById('ingresoDescripcion').value;
    const fecha = document.getElementById('ingresoFecha').value;
    const cuenta = document.getElementById('ingresoCuenta').value;
    const fecha_registro = new Date().toISOString();
    
    if (!monto || !categoria || categoria === 'Seleccionar categoría' || !cuenta || cuenta === 'Seleccionar cuenta') {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }
    
    const datos = {
        id: parseInt(id),
        user_id,
        monto: parseFloat(monto),
        categoria,
        descripcion,
        fecha,
        cuenta,
        tipo: 'INGRESO',
        fecha_registro
    };
    
    try {
        await enviarDatos('/ingreso-gasto', datos);
        alert(`Ingreso registrado exitosamente:\nMonto: ${monto}\nCategoría: ${categoria}\nFecha: ${fecha}`);
        bootstrap.Modal.getInstance(document.getElementById('ingresoModal')).hide();
        // Limpiar el formulario
        document.getElementById('ingresoMonto').value = '';
        document.getElementById('ingresoDescripcion').value = '';
    } catch (error) {
        // El error ya se maneja en enviarDatos
    }
}

// Función modificada para registrar gasto
async function registrarGasto() {
    const id = Math.floor(Math.random() * 1000000) + 1; // Generar ID aleatorio
    const user_id = 'HMCRPLO94HDGDYFTGD12599';
    const monto = document.getElementById('gastoMonto').value;
    const categoria = document.getElementById('gastoCategoria').value;
    const descripcion = document.getElementById('gastoDescripcion').value;
    const fecha = document.getElementById('gastoFecha').value;
    const cuenta = document.getElementById('gastoCuenta').value;
    const fecha_registro = new Date().toISOString();
    
    if (!monto || !categoria || categoria === 'Seleccionar categoría' || !cuenta || cuenta === 'Seleccionar cuenta') {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }
    
    const datos = {
        id : parseInt(id),
        user_id,
        monto: parseFloat(monto),
        categoria,
        descripcion,
        fecha,
        cuenta,
        tipo: 'EGRESO',
        fecha_registro
    };
    
    try {
        await enviarDatos('/ingreso-gasto', datos);
        alert(`Gasto registrado exitosamente:\nMonto: ${monto}\nCategoría: ${categoria}\nFecha: ${fecha}`);
        bootstrap.Modal.getInstance(document.getElementById('gastoModal')).hide();
        // Limpiar el formulario
        document.getElementById('gastoMonto').value = '';
        document.getElementById('gastoDescripcion').value = '';
    } catch (error) {
        // El error ya se maneja en enviarDatos
    }
}

// Función modificada para registrar pago pendiente
async function registrarPago() {
    const id = Math.floor(Math.random() * 1000000) + 1; // Generar ID aleatorio
    const user_id = 'HMCRPLO94HDGDYFTGD12599';
    const monto = document.getElementById('pagoMonto').value;
    const concepto = document.getElementById('pagoConcepto').value;
    const descripcion = document.getElementById('pagoDescripcion').value;
    const fechaVencimiento = document.getElementById('pagoFechaVencimiento').value;
    const prioridad = document.getElementById('pagoPrioridad').value;
    const recurrente = document.getElementById('pagoRecurrente').checked;
    const fecha_registro = new Date().toISOString();
    
    if (!monto || !concepto || !fechaVencimiento) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }
    
    const datos = {
        id: parseInt(id),
        user_id,
        monto: parseFloat(monto),
        concepto,
        descripcion,
        fecha_vencimiento: fechaVencimiento,
        prioridad,
        recurrente,
        estatus: 'pendiente',
        fecha_registro
    };
    
    try {
        await enviarDatos('/pendiente', datos);
        alert(`Pago pendiente registrado exitosamente:\nMonto: ${monto}\nConcepto: ${concepto}\nVencimiento: ${fechaVencimiento}`);
        bootstrap.Modal.getInstance(document.getElementById('pagoModal')).hide();
        // Limpiar el formulario
        document.getElementById('pagoMonto').value = '';
        document.getElementById('pagoConcepto').value = '';
    } catch (error) {
        // El error ya se maneja en enviarDatos
    }
}

// Función modificada para registrar transferencia
async function registrarTransferencia() {
    const id = Math.floor(Math.random() * 1000000) + 1; // Generar ID aleatorio
    const user_id = 'HMCRPLO94HDGDYFTGD12599';
    const monto = document.getElementById('transferenciaMonto').value;
    const origen = document.getElementById('transferenciaOrigen').value;
    const destino = document.getElementById('transferenciaDestino').value;
    const descripcion = document.getElementById('transferenciaDescripcion').value;
    const fecha = document.getElementById('transferenciaFecha').value;
    const fecha_registro = new Date().toISOString();

    if (!monto || !origen || origen === 'Seleccionar cuenta origen' || !destino || destino === 'Seleccionar cuenta destino') {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }
    
    if (origen === destino) {
        alert('La cuenta origen y destino no pueden ser la misma');
        return;
    }
    
    const datos = {
        id: parseInt(id),
        user_id,
        monto: parseFloat(monto),
        cuenta_origen: origen,
        cuenta_destino: destino,
        descripcion,
        fecha,
        fecha_registro
    };
    
    try {
        await enviarDatos('/transferencia', datos);
        alert(`Transferencia registrada exitosamente:\nMonto: ${monto}\nDe: ${origen}\nA: ${destino}`);
        bootstrap.Modal.getInstance(document.getElementById('transferenciaModal')).hide();
        // Limpiar el formulario
        document.getElementById('transferenciaMonto').value = '';
    } catch (error) {
        // El error ya se maneja en enviarDatos
    }
}