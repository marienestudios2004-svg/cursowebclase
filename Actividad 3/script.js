// ============================================
// OBJ 5: Mi primera asincronía — "Pedido de pizza"
// ============================================
//
// 🎯 Meta: crear una promesa con setTimeout y
//    consumirla con .then().
//
// 📖 Estados de una promesa:
//    pendiente → cumplida (resuelta) o rechazada
//
// ============================================

console.log("=== OBJ 5: Pedido de pizza ===");

// 1. ✏️ TU TURNO: selecciona el botón (#btnPedir) y el estado (#estado)
//    Pista: const boton = document.querySelector("#btnPedir");
const boton = document.querySelector("#btnPedir");
// ↑ Buscamos el botón que tiene id="btnPedir"
//   y lo guardamos en la variable "boton".

const estado = document.querySelector("#estado");
// ↑ Buscamos el elemento que tiene id="estado"
//   y lo guardamos en la variable "estado".

// 2. ✏️ TU TURNO: escucha el click del botón
//    Dentro de la función:
//     a. estado.textContent = "⏳ Preparando…";
//     b. crea la promesa:
//        const pedido = new Promise((cumplida) => {
//          setTimeout(() => cumplida("🍕 ¡Pizza lista!"), 2000);
//        });
//     c. consúmela con .then:
//        pedido.then((mensaje) => {
//          document.querySelector("#resultado").textContent = mensaje;
//        });
//    Pista: boton.addEventListener("click", () => { ... });

boton.addEventListener("click", () => {
    // ↑ Cuando el usuario haga click en el botón,
    //   ejecutamos todo lo que está dentro de estas llaves.


    // a. Mostramos que la pizza se está preparando

    estado.textContent = "⏳ Preparando...";
    // ↑ Cambiamos el texto del elemento #estado
    //   para mostrar que estamos preparando la pizza.


    // b. Creamos la promesa

    const pedido = new Promise((cumplida) => {
        // ↑ Creamos una Promise llamada "pedido".
        //   Representa algo que todavía no ha terminado.
        //
        //   "cumplida" es la función que utilizamos
        //   para avisar cuando la promesa ya terminó.


        setTimeout(() => {
            // ↑ Esperamos 2000 milisegundos = 2 segundos.
            //   Después de ese tiempo se ejecuta esta función.

            cumplida("🍕 ¡Pizza lista!");
            // ↑ Avisamos que la Promise se cumplió
            //   y entregamos como resultado este mensaje.

        }, 2000);
    });


    // c. Consumimos la promesa con .then()

    pedido.then((mensaje) => {
        // ↑ "Cuando el pedido esté listo,
        //   recibe el resultado en la variable mensaje
        //   y ejecuta esta función."

        document.querySelector("#resultado").textContent = mensaje;
        // ↑ Buscamos el elemento #resultado
        //   y ponemos ahí el mensaje recibido.
        estado.textContent = "";
    });

});


// ===== CHECK (no borres esta sección) =====
const btnCheck = document.querySelector("#btnCheck");
const autocheck = document.querySelector("#autocheck");

const resultados = [];
const check = (nombre, fn) => {
  try {
    const ok = fn();
    resultados.push(ok);
    console.log(ok ? `  ✅ ${nombre}` : `  ❌ ${nombre}`);
  } catch (e) {
    resultados.push(false);
    console.log(`  ❌ ${nombre} — falta completar (${e.name})`);
  }
};

const verificar = async () => {
  resultados.length = 0;
  console.log("— Check —");
  document.querySelector("#resultado").textContent = ""; // estado inicial
  check("al pedir muestra 'preparando' de inmediato", () => {
    document.querySelector("#btnPedir").click();
    const texto = document.querySelector("#estado").textContent;
    return texto.includes("⏳") || texto.includes("Preparando");
  });
  console.log("   (esperando tu promesa de 2 segundos… ⏳)");
  await new Promise((r) => setTimeout(r, 2300));
  check("la promesa entrega la pizza tras la espera", () => {
    return document.querySelector("#resultado").textContent.includes("Pizza");
  });
  const bien = resultados.filter(Boolean).length;
  const total = resultados.length;
  autocheck.textContent = `Resultado: ${bien}/${total} ✅ ${bien === total ? "¡Todo bien! 🎉" : "— ¡sigue intentando! 💪"}`;
  console.log(bien === total ? "🎉 ¡Todo bien!" : "💪 ¡Sigue intentando!");
};

btnCheck.addEventListener("click", verificar);