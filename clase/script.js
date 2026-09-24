// ============================================
// OBJ 6: Fetch básico y JSON — "Cargar usuario"
// ============================================
//
// 🎯 Meta: consumir una API con fetch y mostrar
//    un dato en la pantalla.
//
// 📖 fetch(url) → promesa que se resuelve con la
//    respuesta. response.json() → los datos.
//
// ============================================

console.log("=== OBJ 6: Cargar usuario ===");

// 1. La URL de la API (no la cambies)
const URL = "https://jsonplaceholder.typicode.com/users";

// 2. ✏️ TU TURNO: crea la función async cargarUsuario()
//    Pista:
//    const cargarUsuario = async () => {
//      const response = await fetch(URL);
//      if (!response.ok) throw new Error("HTTP " + response.status);
//      const datos = await response.json();
//      ...
//    };
const cargarUsuario = async () => {
    const response = await fetch(URL);

    if (!response.ok) throw new Error("HTTP " + response.status);

    const datos = await response.json();

    // 3. Mostrar el primer usuario
    document.querySelector("#resultado").textContent =
        `${datos[0].name} - ${datos[0].email}, City: ${datos[0].address.city}`;

    // 4. Mostrar JSON en consola
    console.log(JSON.stringify(datos[0], null, 2));
};


// 5. Escuchar el click del botón
document.querySelector("#btnCargar").addEventListener("click", cargarUsuario);


// 3. ✏️ TU TURNO: muestra el primer usuario
//    Pista:
//    document.querySelector("#resultado").textContent =
//      `${datos[0].name} — ${datos[0].email}`;
//
// 4. 📦 JSON: agrega en la función:
//    console.log(JSON.stringify(datos[0], null, 2));


// 5. ✏️ TU TURNO: escucha el click del botón (#btnCargar)
//    y llama a cargarUsuario()
//    Pista: document.querySelector("#btnCargar").addEventListener("click", cargarUsuario);



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
  check("cargarUsuario es una función async", () => typeof cargarUsuario === "function");

  document.querySelector("#resultado").textContent = ""; // estado inicial

  // Simula la API para que el check no dependa de internet
  const fetchOriginal = window.fetch;
  window.fetch = () => Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ name: "Ana Mock", email: "ana@mock.com" }]),
  });

  document.querySelector("#btnCargar").click();
  await new Promise((r) => setTimeout(r, 0));

  check("muestra el usuario que trae la API", () => {
    const texto = document.querySelector("#resultado").textContent;
    return texto.includes("Ana Mock") && texto.includes("@");
  });

  window.fetch = fetchOriginal; // restaura la API real
  document.querySelector("#resultado").textContent = ""; // limpia para tu prueba

  const bien = resultados.filter(Boolean).length;
  const total = resultados.length;
  autocheck.textContent = `Resultado: ${bien}/${total} ✅ ${bien === total ? "¡Todo bien! 🎉" : "— ¡sigue intentando! 💪"}`;
  console.log(bien === total ? "🎉 ¡Todo bien!" : "💪 ¡Sigue intentando!");
};

btnCheck.addEventListener("click", verificar);