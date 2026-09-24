// ============================================
// OBJ 2: Eventos click — "Contador de likes"
// ============================================
//
// 🎯 Meta: un clic suma 1 al contador en pantalla.
//
// ============================================

console.log("=== OBJ 2: Contador de likes ===");

// 1. El contador empieza en 0
let contador = 0;

// 2. ✏️ TU TURNO: selecciona el párrafo #contador y el botón #btnLike
//    Pista: const contadorEl = document.querySelector("#contador");
const contadorEl = document.querySelector("#contador");
const boton = document.querySelector("#btnLike");


// 3. ✏️ TU TURNO: escucha el click del botón
//    Dentro de la función: contador = contador + 1;
//    y actualiza la pantalla: contadorEl.textContent = contador;
//    Pista: boton.addEventListener("click", () => { ... });
boton.addEventListener("click", () => {
    contador = contador + 1;
    contadorEl.textContent = contador;
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

const verificar = () => {
  resultados.length = 0;
  console.log("— Check —");
  check("cada clic suma 1 al contador", () => {
    contador = 0; // estado inicial, para poder re-verificar
    document.querySelector("#contador").textContent = "0";
    const antes = Number(document.querySelector("#contador").textContent);
    document.querySelector("#btnLike").click();
    document.querySelector("#btnLike").click();
    const despues = Number(document.querySelector("#contador").textContent);
    return despues === antes + 2;
  });
  const bien = resultados.filter(Boolean).length;
  const total = resultados.length;
  autocheck.textContent = `Resultado: ${bien}/${total} ✅ ${bien === total ? "¡Todo bien! 🎉" : "— ¡sigue intentando! 💪"}`;
  console.log(bien === total ? "🎉 ¡Todo bien!" : "💪 ¡Sigue intentando!");
};

btnCheck.addEventListener("click", verificar);