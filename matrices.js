import rd from "readline";

const rl = rd.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let personas = [];

function iniciarSistema() {
  console.log("\nBienvenido al sistema de gestión de personas");
  console.log("1. Añadir persona");
  console.log("2. Listar personas");
  console.log("3. Salir");

  rl.question("Elija una opción: ", (opcion) => {
    switch (opcion) {
      case "1":
        agregarPersona();
        break;
      case "2":
        mostrarPersonas();
        break;
      case "3":
        rl.close();
        break;
      default:
        console.log("Opción inválida, intente nuevamente.");
        iniciarSistema();
    }
  });
}

function agregarPersona() {
  rl.question("\nIngrese nombre de la persona: ", (nombre) => {
    rl.question("Ingrese apellido de la persona: ", (apellido) => {
      rl.question("Ingrese DNI de la persona: ", (dni) => {
        const telefonos = [];
        const hijos = [];
        agregarTelefono(nombre, apellido, dni, telefonos, hijos);
      });
    });
  });
}

function agregarTelefono(nombre, apellido, dni, telefonos, hijos) {
  rl.question(
    `Teléfono ${telefonos.length + 1} (deje vacío para terminar): `,
    (telefono) => {
      if (telefono.trim() === "") {
        if (telefonos.length === 0) {
          console.log("Debe ingresar al menos un teléfono.");
          agregarTelefono(nombre, apellido, dni, telefonos, hijos);
        } else {
          agregarHijos(nombre, apellido, dni, telefonos, hijos);
        }
      } else {
        telefonos.push(telefono);
        agregarTelefono(nombre, apellido, dni, telefonos, hijos);
      }
    }
  );
}

function agregarHijos(nombre, apellido, dni, telefonos, hijos) {
  rl.question(
    `Hijo ${hijos.length + 1} (deje vacío para terminar): `,
    (hijo) => {
      if (hijo.trim() === "") {
        personas.push({ nombre, apellido, dni, telefonos, hijos });
        console.log("\nPersona agregada con éxito.");
        preguntarContinuar();
      } else {
        hijos.push(hijo);
        agregarHijos(nombre, apellido, dni, telefonos, hijos);
      }
    }
  );
}

function mostrarPersonas() {
  if (personas.length === 0) {
    console.log("\nNo hay personas registradas.");
  } else {
    console.log("\nLista de personas registradas:");
    personas.forEach((persona, index) => {
      console.log(`${index + 1}. ${persona.nombre} ${persona.apellido}`);
      console.log(`   DNI: ${persona.dni}`);
      console.log(`   Teléfonos: ${persona.telefonos.join(", ")}`);
      console.log(
        `   Hijos: ${
          persona.hijos.length > 0 ? persona.hijos.join(", ") : "Ninguno"
        }`
      );
    });
  }
  preguntarContinuar();
}

function preguntarContinuar() {
  rl.question("\n¿Desea realizar otra operación? (s/n): ", (respuesta) => {
    if (respuesta.toLowerCase() === "s") {
      iniciarSistema();
    } else {
      console.log("Saliendo del sistema...");
      rl.close();
    }
  });
}

iniciarSistema();
