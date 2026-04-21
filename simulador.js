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

// ── VALIDACIONES ──

function crearMensajeError(inputId) {
    var idMensaje = inputId + "_error";
    var existing = document.getElementById(idMensaje);
    if (existing) return existing;

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

function validarInput(inputId) {
    var input = document.getElementById(inputId);
    var valor = input.value.trim();
    var mensaje = crearMensajeError(inputId);

    // Vacío
    if (valor === "") {
        mensaje.textContent = "Este campo no puede estar vacío.";
        return false;
    }

    // Solo números (permite decimales)
    if (!/^\d+(\.\d+)?$/.test(valor)) {
        mensaje.textContent = "Solo se permiten números.";
        return false;
    }

    // Máximo 5 dígitos en la parte entera
    var parteEntera = valor.split(".")[0];
    if (parteEntera.length > 5) {
        mensaje.textContent = "Máximo 5 dígitos permitidos.";
        return false;
    }

    // Sin errores
    mensaje.textContent = "";
    return true;
}

// Aplicar onblur a cada input con su id existente
var inputsAValidar = [
    "txtIngresos",
    "txtArriendo",
    "txtAlimentacion",
    "txtVarios",
    "txtMonto",
    "txtPlazo",
    "txtTasaInteres"
];

inputsAValidar.forEach(function(id) {
    document.getElementById(id).addEventListener("blur", function() {
        validarInput(id);
    });
});