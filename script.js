function mostrarFormulario() {
    const tipoMatriz = document.getElementById("tipoMatriz").value;
    const formulario2x2 = document.getElementById("formulario2x2");
    const formulario3x3 = document.getElementById("formulario3x3");
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = ""; // Limpiar resultado
    formulario2x2.style.display = (tipoMatriz === "2x2") ? "block" : "none";
    formulario3x3.style.display = (tipoMatriz === "3x3") ? "block" : "none";
}

// Función para validar entradas
function validarEntradas(...valores) {
    return valores.every(valor => !isNaN(valor));
}

// Función para calcular determinante
function calcularDeterminante2x2(a11, a12, a21, a22) {
    return (a11 * a22) - (a12 * a21);
}

// Función para resolver y mostrar resultados paso a paso para sistema 2x2
function mostrarResultados2x2(x, y, a11, a12, a21, a22, c1, c2, delta, deltaX, deltaY) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <h2>Resolución paso a paso (Sistema 2x2)</h2>

        <h3>Paso 1: Planteamos el sistema de ecuaciones</h3>
        <p>Ecuaciones:</p>
        <p>${a11}x + ${a12}y = ${c1}<br>
        ${a21}x + ${a22}y = ${c2}</p>

        <h3>Paso 2: Calculamos el determinante principal (Δ)</h3>
        <p>Fórmula: Δ = (a11 * a22) - (a12 * a21)</p>
        <p>Δ = <br>
        |${a11} ${a12}|<br>
        |${a21} ${a22}|</p>
        <p>Δ = (${a11} × ${a22}) - (${a12} × ${a21}) = ${delta}</p>

        <h3>Paso 3: Calculamos Δx reemplazando la columna de x por los términos independientes</h3>
        <p>Fórmula: Δx = (c1 * a22) - (a12 * c2)</p>
        <p>Δx = <br>
        |${c1} ${a12}|<br>
        |${c2} ${a22}|</p>
        <p>Δx = (${c1} × ${a22}) - (${a12} × ${c2}) = ${deltaX}</p>

        <h3>Paso 4: Calculamos Δy reemplazando la columna de y por los términos independientes</h3>
        <p>Fórmula: Δy = (a11 * c2) - (c1 * a21)</p>
        <p>Δy = <br>
        |${a11} ${c1}|<br>
        |${a21} ${c2}|</p>
        <p>Δy = (${a11} × ${c2}) - (${c1} × ${a21}) = ${deltaY}</p>

        <h3>Paso 5: Soluciones</h3>
        
        <p>x = Δx / Δ = ${deltaX} / ${delta} = ${x}</p>
        <p>y = Δy / Δ = ${deltaY} / ${delta} = ${y}</p>
    `;
    resultadoDiv.style.display = "block";
}



function resolverSistema2x2() {
    const a11 = parseFloat(document.getElementById("a1_2x2").value);
    const a12 = parseFloat(document.getElementById("a2_2x2").value);
    const a21 = parseFloat(document.getElementById("b1_2x2").value);
    const a22 = parseFloat(document.getElementById("b2_2x2").value);
    const c1 = parseFloat(document.getElementById("c1_2x2").value);
    const c2 = parseFloat(document.getElementById("c2_2x2").value);

    if (!validarEntradas(a11, a12, a21, a22, c1, c2)) {
        alert("Por favor, ingrese todos los valores.");
        return;
    }

    const delta = calcularDeterminante2x2(a11, a12, a21, a22);
    if (delta === 0) {
        alert("El sistema no tiene solución única (Δ = 0).");
        return;
    }

    const deltaX = calcularDeterminante2x2(c1, a12, c2, a22);
    const deltaY = calcularDeterminante2x2(a11, c1, a21, c2);
    const x = deltaX / delta;
    const y = deltaY / delta;

    mostrarResultados2x2(x, y, a11, a12, a21, a22, c1, c2, delta, deltaX, deltaY);
}

function resolverSistema3x3() {
    const a11 = parseFloat(document.getElementById("a1_3x3").value);
    const a12 = parseFloat(document.getElementById("a2_3x3").value);
    const a13 = parseFloat(document.getElementById("a3_3x3").value);
    const a21 = parseFloat(document.getElementById("b1_3x3").value);
    const a22 = parseFloat(document.getElementById("b2_3x3").value);
    const a23 = parseFloat(document.getElementById("b3_3x3").value);
    const a31 = parseFloat(document.getElementById("d1_3x3").value);
    const a32 = parseFloat(document.getElementById("d2_3x3").value);
    const a33 = parseFloat(document.getElementById("d3_3x3").value);
    const c1 = parseFloat(document.getElementById("c1_3x3").value);
    const c2 = parseFloat(document.getElementById("c2_3x3").value);
    const c3 = parseFloat(document.getElementById("c3_3x3").value);

    if (!validarEntradas(a11, a12, a13, a21, a22, a23, a31, a32, a33, c1, c2, c3)) {
        alert("Por favor, ingrese todos los valores.");
        return;
    }

    // Calcular determinantes Δ, Δx, Δy, Δz para sistema 3x3
    const delta = a11 * (a22 * a33 - a23 * a32) - a12 * (a21 * a33 - a23 * a31) + a13 * (a21 * a32 - a22 * a31);
    if (delta === 0) {
        alert("El sistema no tiene solución única (Δ = 0).");
        return;
    }

    const deltaX = c1 * (a22 * a33 - a23 * a32) - a12 * (c2 * a33 - a23 * c3) + a13 * (c2 * a32 - a22 * c3);
    const deltaY = a11 * (c2 * a33 - a23 * c3) - c1 * (a21 * a33 - a23 * a31) + a13 * (a21 * c3 - c2 * a31);
    const deltaZ = a11 * (a22 * c3 - c2 * a32) - a12 * (a21 * c3 - c2 * a31) + c1 * (a21 * a32 - a22 * a31);
    const x = deltaX / delta;
    const y = deltaY / delta;
    const z = deltaZ / delta;

    const resultadoDiv = document.getElementById("resultado");
       resultadoDiv.innerHTML = `
        <h2>Resolución paso a paso (Sistema 3x3)</h2>

        <h3>Paso 1: Planteamos el sistema de ecuaciones</h3>
        <p>${a11}x + ${a12}y + ${a13}z = ${c1}<br>
        ${a21}x + ${a22}y + ${a23}z = ${c2}<br>
        ${a31}x + ${a32}y + ${a33}z = ${c3}</p>

        <h3>Paso 2: Calculamos el determinante principal (Δ)</h3>
        <p>Fórmula: Δ = a11[(a22 * a33) - (a23 * a32)] - a12[(a21 * a33) - (a23 * a31)] + a13[(a21 * a32) - (a22 * a31)]</p>
        <p>Δ = <br> 
        |${a11} ${a12} ${a13}|<br>
        |${a21} ${a22} ${a23}|<br>
        |${a31} ${a32} ${a33}|</p>
        <p>Δ = ${a11} [(${a22} × ${a33}) - (${a23} × ${a32})] - ${a12} [(${a21} × ${a33}) - (${a23} × ${a31})] + ${a13} [(${a21} × ${a32}) - (${a22} × ${a31})] = ${delta}</p>

        <h3>Paso 3: Calculamos Δx reemplazando la columna de x por los términos independientes</h3>
        <p>Fórmula: Δx = c1[(a22 * a33) - (a23 * a32)] - a12[(c2 * a33) - (a23 * c3)] + a13[(c2 * a32) - (a22 * c3)]</p>
        <p>Δx = <br>
        |${c1} ${a12} ${a13}|<br>
        |${c2} ${a22} ${a23}|<br>
        |${c3} ${a32} ${a33}|</p>
        <p>Δx = ${c1} [(${a22} × ${a33}) - (${a23} × ${a32})] - ${a12} [(${c2} × ${a33}) - (${a23} × ${c3})] + ${a13} [(${c2} × ${a32}) - (${a22} × ${c3})] = ${deltaX}</p>

        <h3>Paso 4: Calculamos Δy reemplazando la columna de y por los términos independientes</h3>
        <p>Fórmula: Δy = a11[(c2 * a33) - (a23 * c3)] - c1[(a21 * a33) - (a23 * a31)] + a13[(a21 * c3) - (c2 * a31)]</p>
        <p>Δy =   <br>
       |${a11} ${c1} ${a13}|<br>
       |${a21} ${c2} ${a23}|<br>
       |${a31} ${c3} ${a33}|</p>
        <p>Δy = ${a11} [(${c2} × ${a33}) - (${a23} × ${c3})] - ${c1} [(${a21} × ${a33}) - (${a23} × ${a31})] + ${a13} [(${a21} × ${c3}) - (${c2} × ${a31})] = ${deltaY}</p>

        <h3>Paso 5: Calculamos Δz reemplazando la columna de z por los términos independientes</h3>
        <p>Fórmula: Δz = a11[(a22 * c3) - (c2 * a32)] - a12[(a21 * c3) - (c2 * a31)] + c1[(a21 * a32) - (a22 * a31)]</p>
        <p>Δz = 
        <br>
        |${a11} ${a12} ${c1}|<br>
        |${a21} ${a22} ${c2}|<br>
        |${a31} ${a32} ${c3}|</p>
        <p>Δz = ${a11} [(${a22} × ${c3}) - (${c2} × ${a32})] - ${a12} [(${a21} × ${c3}) - (${c2} × ${a31})] + ${c1} [(${a21} × ${a32}) - (${a22} × ${a31})] = ${deltaZ}</p>

        <h3>Paso 6: Soluciones</h3>
        <p>x = Δx / Δ = ${deltaX} / ${delta} = ${x}</p>
        <p>y = Δy / Δ = ${deltaY} / ${delta} = ${y}</p>
        <p>z = Δz / Δ = ${deltaZ} / ${delta} = ${z}</p>
    `;
    resultadoDiv.style.display = "block";
}
