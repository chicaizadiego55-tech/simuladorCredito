//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO

// Calcula el valor disponible (ingresos - egresos, mínimo 0)
function calcularDisponible(ingresos, egresos) {
    var resultado = ingresos - egresos;
    if (resultado < 0) {
        return 0;
    }
    return resultado;
}

// Calcula la capacidad de pago (50% del disponible)
function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.5;
}

// Calcula el interés simple (plazoAnios * monto * tasa / 100)
function calcularInteresSimple(monto, tasa, plazoAnios) {
    return plazoAnios * monto * (tasa / 100);
}

// Calcula el total a pagar (monto + interés + 100 de impuestos)
function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;
}

// Calcula la cuota mensual (total / meses)
function calcularCuotaMensual(total, plazoAnios) {
    var meses = plazoAnios * 12;
    return total / meses;
}

// Aprueba o rechaza el crédito
function aprobarCredito(capacidadPago, cuotaMensual) {
    if (capacidadPago > cuotaMensual) {
        return true;
    }
    return false;
}