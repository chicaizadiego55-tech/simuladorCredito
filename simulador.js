//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML

function calcular() {

    // 1. Leer ingresos
    var ingresos = parseFloat(document.getElementById("txtIngresos").value) || 0;

    // 2. Leer los tres egresos y sumarlos
    var arriendo     = parseFloat(document.getElementById("txtArriendo").value)     || 0;
    var alimentacion = parseFloat(document.getElementById("txtAlimentacion").value) || 0;
    var varios       = parseFloat(document.getElementById("txtVarios").value)       || 0;
    var egresos      = arriendo + alimentacion + varios;

    // 3. Mostrar total egresos
    document.getElementById("spnTotalEgresos").textContent = "USD " + egresos.toFixed(2);

    // 4. Calcular disponible
    var disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    // 5. Calcular capacidad de pago
    var capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidadPago.toFixed(2);

    // 6. Leer datos del crédito
    var monto = parseFloat(document.getElementById("txtMonto").value) || 0;
    var plazo = parseInt(document.getElementById("txtPlazo").value)   || 0;
    var tasa  = parseFloat(document.getElementById("txtTasaInteres").value) || 0;

    // 7. Calcular interés
    var interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent = "USD " + interes.toFixed(2);

    // 8. Calcular total a pagar
    var total = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = "USD " + total.toFixed(2);

    // 9. Calcular cuota mensual
    var cuota = calcularCuotaMensual(total, plazo);
    document.getElementById("spnCuotaMensual").textContent = "USD " + cuota.toFixed(2);

    // 10. Aprobar o rechazar crédito
    var aprobado = aprobarCredito(capacidadPago, cuota);
    var badge = document.getElementById("spnEstadoCredito");

    if (aprobado) {
        badge.textContent = "CRÉDITO APROBADO";
        badge.className = "estado-badge aprobado";
    } else {
        badge.textContent = "CRÉDITO RECHAZADO";
        badge.className = "estado-badge rechazado";
    }
}

function reiniciar() {
    // Limpiar todos los inputs
    document.getElementById("txtIngresos").value     = "";
    document.getElementById("txtArriendo").value     = "";
    document.getElementById("txtAlimentacion").value = "";
    document.getElementById("txtVarios").value       = "";
    document.getElementById("txtMonto").value        = "";
    document.getElementById("txtPlazo").value        = "";
    document.getElementById("txtTasaInteres").value  = "";

    // Limpiar resultados
    document.getElementById("spnTotalEgresos").textContent  = "USD 0.00";
    document.getElementById("spnDisponible").textContent    = "USD 0.00";
    document.getElementById("spnCapacidadPago").textContent = "USD 0.00";
    document.getElementById("spnInteresPagar").textContent  = "USD 0.00";
    document.getElementById("spnTotalPrestamo").textContent = "USD 0.00";
    document.getElementById("spnCuotaMensual").textContent  = "USD 0.00";

    var badge = document.getElementById("spnEstadoCredito");
    badge.textContent = "ANALIZANDO...";
    badge.className   = "estado-badge";
}

// Conectar botones
document.getElementById("btnCalcularCredito").addEventListener("click", calcular);
document.getElementById("btnReiniciar").addEventListener("click", reiniciar);

// ── VALIDACIONES COMPLETAS ──

function crearMensajeError(inputId) {
    var idMensaje = inputId + "_error";
    var existente = document.getElementById(idMensaje);
    if (existente) return existente;

    var span = document.createElement("span");
    span.id = idMensaje;
    span.style.color = "red";
    span.style.fontStyle = "italic";
    span.style.fontSize = "0.8rem";
    span.style.display = "block";
    span.style.marginTop = "4px";

    var input = document.getElementById(inputId);
    input.parentElement.parentElement.appendChild(span);
    return span;
}

function limpiarErrores() {
    var ids = ["txtIngresos","txtArriendo","txtAlimentacion",
               "txtVarios","txtMonto","txtPlazo","txtTasaInteres"];
    ids.forEach(function(id) {
        var msg = document.getElementById(id + "_error");
        if (msg) msg.textContent = "";
    });
}

function mostrarError(inputId, texto) {
    crearMensajeError(inputId).textContent = texto;
}

function esNumeroValido(valor) {
    return /^\d+(\.\d+)?$/.test(valor.trim());
}

function validarTodo() {
    limpiarErrores();
    var hayError = false;

    // ── INGRESOS ──
    var ingresos = document.getElementById("txtIngresos").value.trim();
    if (ingresos === "") {
        mostrarError("txtIngresos", "Los ingresos son obligatorios.");
        hayError = true;
    } else if (!esNumeroValido(ingresos)) {
        mostrarError("txtIngresos", "Solo se permiten números positivos.");
        hayError = true;
    } else if (parseFloat(ingresos) < 100) {
        mostrarError("txtIngresos", "Los ingresos mínimos son USD 100.");
        hayError = true;
    } else if (parseFloat(ingresos) > 99999) {
        mostrarError("txtIngresos", "Los ingresos no pueden superar USD 99.999.");
        hayError = true;
    }

    // ── ARRIENDO ──
    var arriendo = document.getElementById("txtArriendo").value.trim();
    if (arriendo === "") {
        mostrarError("txtArriendo", "El arriendo es obligatorio. Ingrese 0 si no aplica.");
        hayError = true;
    } else if (!esNumeroValido(arriendo)) {
        mostrarError("txtArriendo", "Solo se permiten números positivos.");
        hayError = true;
    } else if (parseFloat(arriendo) > 9999) {
        mostrarError("txtArriendo", "El arriendo no puede superar USD 9.999.");
        hayError = true;
    }

    // ── ALIMENTACIÓN ──
    var alimentacion = document.getElementById("txtAlimentacion").value.trim();
    if (alimentacion === "") {
        mostrarError("txtAlimentacion", "La alimentación es obligatoria. Ingrese 0 si no aplica.");
        hayError = true;
    } else if (!esNumeroValido(alimentacion)) {
        mostrarError("txtAlimentacion", "Solo se permiten números positivos.");
        hayError = true;
    } else if (parseFloat(alimentacion) > 9999) {
        mostrarError("txtAlimentacion", "La alimentación no puede superar USD 9.999.");
        hayError = true;
    }

    // ── VARIOS ──
    var varios = document.getElementById("txtVarios").value.trim();
    if (varios === "") {
        mostrarError("txtVarios", "El campo Varios es obligatorio. Ingrese 0 si no aplica.");
        hayError = true;
    } else if (!esNumeroValido(varios)) {
        mostrarError("txtVarios", "Solo se permiten números positivos.");
        hayError = true;
    } else if (parseFloat(varios) > 9999) {
        mostrarError("txtVarios", "Los gastos varios no pueden superar USD 9.999.");
        hayError = true;
    }

    // ── EGRESOS TOTALES vs INGRESOS ──
    if (!hayError) {
        var totalEgresos = parseFloat(arriendo) + parseFloat(alimentacion) + parseFloat(varios);
        if (totalEgresos >= parseFloat(ingresos)) {
            mostrarError("txtVarios", "El total de egresos no puede ser igual o mayor a los ingresos.");
            hayError = true;
        }
    }

    // ── MONTO ──
    var monto = document.getElementById("txtMonto").value.trim();
    if (monto === "") {
        mostrarError("txtMonto", "El monto solicitado es obligatorio.");
        hayError = true;
    } else if (!esNumeroValido(monto)) {
        mostrarError("txtMonto", "Solo se permiten números positivos.");
        hayError = true;
    } else if (parseFloat(monto) < 500) {
        mostrarError("txtMonto", "El monto mínimo de crédito es USD 500.");
        hayError = true;
    } else if (parseFloat(monto) > 50000) {
        mostrarError("txtMonto", "El monto máximo de crédito es USD 50.000.");
        hayError = true;
    }

    // ── PLAZO ──
    var plazo = document.getElementById("txtPlazo").value.trim();
    if (plazo === "") {
        mostrarError("txtPlazo", "El plazo es obligatorio.");
        hayError = true;
    } else if (!/^\d+$/.test(plazo)) {
        mostrarError("txtPlazo", "El plazo debe ser un número entero de años.");
        hayError = true;
    } else if (parseInt(plazo) < 1) {
        mostrarError("txtPlazo", "El plazo mínimo es 1 año.");
        hayError = true;
    } else if (parseInt(plazo) > 20) {
        mostrarError("txtPlazo", "El plazo máximo es 20 años.");
        hayError = true;
    }

    // ── TASA ──
    var tasa = document.getElementById("txtTasaInteres").value.trim();
    if (tasa === "") {
        mostrarError("txtTasaInteres", "La tasa de interés es obligatoria.");
        hayError = true;
    } else if (!esNumeroValido(tasa)) {
        mostrarError("txtTasaInteres", "Solo se permiten números positivos.");
        hayError = true;
    } else if (parseFloat(tasa) < 1) {
        mostrarError("txtTasaInteres", "La tasa mínima es 1%.");
        hayError = true;
    } else if (parseFloat(tasa) > 30) {
        mostrarError("txtTasaInteres", "La tasa máxima permitida es 30%.");
        hayError = true;
    }

    return !hayError;
}

// Reemplazar el listener del botón para validar antes de calcular
document.getElementById("btnCalcularCredito").removeEventListener("click", calcular);
document.getElementById("btnCalcularCredito").addEventListener("click", function() {
    if (validarTodo()) {
        calcular();
    }
});