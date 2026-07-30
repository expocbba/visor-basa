const visor = document.querySelector("#museo");
const escena = document.querySelector(".escena");
const relato = document.querySelector("#relato");
const avance = document.querySelector("#avance");
const botones = [...document.querySelectorAll("[data-estacion]")];
const pantalla = document.querySelector("#pantalla");
const anterior = document.querySelector("#anterior");
const siguiente = document.querySelector("#siguiente");
const aviso = document.querySelector("#aviso");

/* Coordenadas tomadas de los nodos reales del archivo modelo.glb.
   El acimut se calcula desde la normal de cada muro o vitrina, de modo que
   la cámara siempre observe la pieza desde el interior de la sala. La
   propiedad tope fija la distancia máxima admisible cuando el encuadre debe
   ampliarse en pantallas estrechas, allí donde un mueble se interpone. */
const contenidos = {
  general: {
    numero: "00",
    tipo: "Recorrido completo",
    titulo: "Un museo dentro del valle",
    texto:
      "La sala del Museo BASA mide 16,2 por 13,5 metros y abre su fachada de vidrio sobre la Oxfordstraße, de manera que el visitante ingresa a nivel de calle y encuentra la exposición desplegada en un circuito continuo que va desde los documentos coloniales hasta los santuarios contemporáneos del valle de Cochabamba.",
    objetivo: { x: 0.0, y: 0.9, z: 0.4 },
    acimut: 32,
    polar: 62,
    distancia: 15,
    campo: 42,
  },
  introduccion: {
    numero: "01",
    tipo: "Umbral de la exposición",
    titulo: "Introducción a la muestra",
    texto:
      "El panel introductorio ocupa la cara posterior del primer tabique y recibe al visitante con el marco conceptual de la exposición, que propone leer el valle de Cochabamba como un paisaje transformado por sucesivas ocupaciones y no como un territorio inmóvil anterior a la llegada inka.",
    objetivo: { x: -3.77, y: 1.01, z: 2.1 },
    acimut: 320,
    polar: 86,
    distancia: 2.4,
    campo: 45,
    tope: 2.55,
  },
  repartimiento: {
    numero: "02",
    tipo: "Documentos coloniales",
    titulo: "El Repartimiento",
    texto:
      "Las fuentes coloniales del repartimiento permiten reconstruir la organización de las chacras estatales, la distribución de los suyus y la memoria territorial del valle, y muestran cómo la administración española reutilizó categorías espaciales previas para ordenar la población y el tributo.",
    objetivo: { x: -3.16, y: 1.0, z: 2.37 },
    acimut: 140,
    polar: 84,
    distancia: 4.0,
  },
  documentos: {
    numero: "03",
    tipo: "Archivo y escritura",
    titulo: "Documentos coloniales",
    texto:
      "El segundo registro del mismo tabique reúne reproducciones documentales que evidencian el trabajo de archivo sobre el cual se sostiene la investigación, con probanzas, visitas y padrones que informan sobre la mano de obra desplazada hacia las tierras estatales del valle.",
    objetivo: { x: -4.14, y: 0.95, z: 1.56 },
    acimut: 140,
    polar: 84,
    distancia: 3.2,
  },
  camino: {
    numero: "04",
    tipo: "Infraestructura inka",
    titulo: "El camino inka y los cuatro suyus",
    texto:
      "La cartografía del camino inka articula el valle con el conjunto del Tawantinsuyu y explica la posición estratégica de Cochabamba dentro de una red de circulación que conectaba centros administrativos, depósitos y territorios agrícolas de altura, de modo que la partición del espacio en suyus que se despliega en la proyección contigua no constituye un asunto separado sino la forma misma en que ese camino ordenaba las chacras estatales, las tierras de cultivo y la obligación laboral de las poblaciones trasladadas al valle.",
    objetivo: { x: -4.9, y: 0.86, z: 0.05 },
    acimut: 92,
    polar: 82,
    distancia: 3.1,
    tope: 3.6,
  },
  soras: {
    numero: "05",
    tipo: "Poblaciones trasladadas",
    titulo: "Los soras y el mapa de Alexis",
    texto:
      "La cara posterior del muro de proyección presenta el mapa elaborado en el marco de la investigación junto al texto dedicado a los soras, grupo trasladado al valle dentro de las políticas estatales de reasentamiento que redefinieron la composición social de Cochabamba.",
    objetivo: { x: -3.6, y: 1.03, z: -2.43 },
    acimut: 213,
    polar: 82,
    distancia: 4.2,
  },
  documental: {
    numero: "06",
    tipo: "Audiovisual",
    titulo: "Documental proyectado",
    texto:
      "Un proyector suspendido del cielo raso ilumina un lienzo colgante de más de dos metros de ancho donde se exhibe el documental de la exposición, dispositivo que introduce la voz de las comunidades del valle dentro del discurso arqueológico de la muestra.",
    objetivo: { x: -2.72, y: 1.73, z: 0.26 },
    acimut: 0,
    polar: 86,
    distancia: 1.5,
    campo: 54,
    tope: 1.62,
  },
  aribalos: {
    numero: "07",
    tipo: "Cerámica estatal",
    titulo: "Vitrina central de aríbalos",
    texto:
      "La vitrina central de cuatro paredes de vidrio resguarda un conjunto de aríbalos dispuestos sobre una repisa, forma cerámica asociada al almacenamiento y al traslado de chicha que condensa la relación entre producción agrícola, redistribución estatal y celebración ritual.",
    objetivo: { x: 0.42, y: 1.05, z: 0.55 },
    acimut: 337,
    polar: 86,
    distancia: 2.1,
    campo: 52,
    tope: 2.75,
  },
  materialidad: {
    numero: "08",
    tipo: "Objetos y soportes",
    titulo: "Materialidad real",
    texto:
      "Dos vitrinas altas iluminadas desde la cubierta ordenan las piezas en tres niveles y acompañan a la lámina sobre materialidad, que discute cómo el registro arqueológico se convierte en objeto museográfico mediante procesos de selección, montaje e interpretación.",
    objetivo: { x: 2.47, y: 1.0, z: -0.54 },
    acimut: 222,
    polar: 82,
    distancia: 2.82,
    campo: 42,
    tope: 3.05,
  },
  qollqas: {
    numero: "09",
    tipo: "Estación interactiva",
    titulo: "Qollqas, LiDAR y recorrido virtual",
    texto:
      "La mesa interactiva reúne el levantamiento LiDAR de las qollqas con una pantalla táctil y un recorrido virtual, de manera que el visitante puede explorar la arquitectura de almacenamiento estatal a partir de los mismos datos tridimensionales que utiliza la investigación.",
    objetivo: { x: 2.6, y: 0.92, z: -2.36 },
    acimut: 288,
    polar: 70,
    distancia: 3.5,
    campo: 38,
    tope: 3.5,
  },
  maiz: {
    numero: "10",
    tipo: "Producción y consumo",
    titulo: "Maíz, keros y chicha",
    texto:
      "La vitrina rectangular junto a la fachada expone mazorcas de maíz y keros bajo una cubierta de vidrio, acompañados por una pantalla que documenta el proceso de elaboración de la chicha y por paneles interpretativos que vinculan el cultivo del valle con la economía política del estado inka.",
    objetivo: { x: 0.0, y: 0.5, z: -4.0 },
    acimut: 355,
    polar: 62,
    distancia: 3.4,
  },
  laminas: {
    numero: "11",
    tipo: "Dispositivo gráfico",
    titulo: "Láminas del tabique",
    texto:
      "Cuatro láminas impresas se ordenan en dos registros sobre el tabique que conduce al área de los santuarios y sostienen la transición entre la sección arqueológica de la muestra y su sección contemporánea.",
    objetivo: { x: 2.64, y: 1.05, z: 2.62 },
    acimut: 270,
    polar: 84,
    distancia: 4.2,
  },
  santuarios: {
    numero: "12",
    tipo: "Religiosidad contemporánea",
    titulo: "Santuarios del valle",
    texto:
      "Tras el muro de vidrio se despliegan tres altares dedicados a la Virgen de Urkupiña, al Tata Santiago y al santuario de Shirley, iluminados con focos individuales sobre un fondo continuo que sitúa la devoción actual como una capa más del paisaje en transformación.",
    objetivo: { x: 0.4, y: 0.2, z: 5.05 },
    acimut: 180,
    polar: 66,
    distancia: 4.6,
  },
  creditos: {
    numero: "13",
    tipo: "Cierre",
    titulo: "Impressum",
    texto:
      "La lámina final reúne los créditos institucionales y la autoría de la exposición, cerrando el circuito en el mismo muro donde se inicia la lectura cartográfica del camino inka.",
    objetivo: { x: -5.07, y: 1.01, z: 0.19 },
    acimut: 272,
    polar: 84,
    distancia: 2.7,
    tope: 3.0,
  },
};

const orden = Object.keys(contenidos);
let actual = "general";
let cargado = false;
let telon = [];

function anunciar(mensaje) {
  if (aviso) aviso.textContent = mensaje;
}

/* Encuadre adaptado a la proporción disponible. El campo de visión declarado
   por model-viewer es vertical, de manera que una ventana estrecha y alta,
   como la de un teléfono o la de un bloque incrustado en StoryMaps, recorta el
   ancho de los paneles. Se compensa ampliando moderadamente el campo, alejando
   la cámara dentro del límite que permite el mobiliario y ensanchando el giro
   lateral admitido, para que la mirada complete lo que la pantalla no abarca. */
function ajuste() {
  const ancho = visor.clientWidth || window.innerWidth || 1;
  const alto = visor.clientHeight || window.innerHeight || 1;
  const razon = ancho / alto;
  if (razon >= 1.35) return { escala: 1, extra: 0, giro: 30 };
  if (razon >= 0.95) return { escala: 1.14, extra: 7, giro: 38 };
  return { escala: 1.3, extra: 13, giro: 46 };
}

/* El lienzo del documental comparte material con los soportes traseros del
   mapa de Alexis y del texto sobre los soras. El paso de compilación
   parche-telon.mjs le asigna un material propio llamado BASA_Documentary_Screen
   y sólo ese material, junto al de la fotografía que lo acompaña, se vuelve
   translúcido. Si el archivo no trae el material separado, no se altera nada,
   de modo que ningún panel pierda su opacidad por error. */
const nombresTelon = ["BASA_Documentary_Screen", "BASA_Documentary_Thumbnail_Material"];

function prepararTelon() {
  telon = [];
  const materiales = visor.model?.materials ?? [];
  materiales.forEach((material) => {
    if (!nombresTelon.includes(material.name)) return;
    try {
      const previo = material.pbrMetallicRoughness.baseColorFactor ?? [1, 1, 1, 1];
      material.setAlphaMode("BLEND");
      material.setDoubleSided?.(true);
      telon.push({ material, base: [previo[0], previo[1], previo[2]] });
    } catch (error) {
      console.warn("No se pudo preparar el telón", material.name, error);
    }
  });
  if (!telon.length) {
    console.warn("El modelo no trae el material BASA_Documentary_Screen. Ejecuta parche-telon.mjs.");
  }
}

function velarTelon(nombre) {
  const alfa = nombre === "documental" ? 1 : 0;
  telon.forEach(({ material, base }) => {
    try {
      material.pbrMetallicRoughness.setBaseColorFactor([base[0], base[1], base[2], alfa]);
    } catch (error) {
      console.warn("No se pudo velar el telón", error);
    }
  });
}

/* Alcanzada la estación, la navegación se restringe al radio de acción de un
   visitante detenido frente a la pieza. Conserva el giro lateral y la
   inclinación de la mirada, pierde el desplazamiento libre por la sala. */
function limitar(nombre, estacion, distancia, campo, giro) {
  visor.minCameraOrbit = "-2000deg 0deg 0.2m";
  visor.maxFieldOfView = "58deg";

  if (nombre === "general") {
    visor.maxCameraOrbit = "2000deg 86deg 30m";
    visor.minFieldOfView = "24deg";
    visor.minCameraOrbit = "-2000deg 20deg 6m";
    return;
  }

  const abajo = Math.max(32, estacion.polar - 16);
  const arriba = Math.min(103, estacion.polar + 24);
  visor.maxCameraOrbit = `${estacion.acimut + giro}deg ${arriba}deg ${(distancia * 1.06).toFixed(2)}m`;
  visor.minCameraOrbit = `${estacion.acimut - giro}deg ${abajo}deg ${(distancia * 0.78).toFixed(2)}m`;
  visor.minFieldOfView = `${campo}deg`;
  visor.maxFieldOfView = `${Math.min(58, campo + 6)}deg`;
}

function enfocar(nombre) {
  const estacion = contenidos[nombre];
  if (!estacion) return;
  actual = nombre;

  const { escala, extra, giro } = ajuste();
  const base = estacion.distancia ?? 12;
  const distancia = Math.min(base * escala, estacion.tope ?? Number.POSITIVE_INFINITY);
  const campo = Math.min(58, (estacion.campo ?? 34) + extra);
  const objetivo = estacion.objetivo;

  limitar(nombre, estacion, distancia, campo, giro);
  visor.cameraTarget = `${objetivo.x}m ${objetivo.y}m ${objetivo.z}m`;
  visor.cameraOrbit = `${estacion.acimut}deg ${estacion.polar}deg ${distancia.toFixed(2)}m`;
  visor.fieldOfView = `${campo}deg`;
  velarTelon(nombre);

  document.body.classList.toggle("en-estacion", nombre !== "general");

  botones.forEach((boton) => {
    const activa = boton.dataset.estacion === nombre;
    boton.classList.toggle("activa", activa);
    boton.setAttribute("aria-current", activa ? "true" : "false");
    if (activa) {
      boton.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  });

  document.querySelectorAll(".punto").forEach((punto) => {
    punto.classList.toggle("punto-activo", punto.dataset.destino === nombre);
  });
}

/* El relato se compone en secciones de una pantalla de alto. El desplazamiento
   vertical, venga de la rueda, del trackpad o del dedo, es el único motor del
   recorrido, de manera que la lectura avance con la lógica de cualquier página
   y no con un gesto que haya que aprender. */
function construirRelato() {
  orden.forEach((nombre) => {
    const estacion = contenidos[nombre];
    const seccion = document.createElement("section");
    seccion.className = "paso";
    seccion.id = `paso-${nombre}`;
    seccion.dataset.paso = nombre;

    const ficha = document.createElement("article");
    ficha.className = "ficha";

    const cifra = document.createElement("span");
    cifra.className = "cifra";
    cifra.textContent = estacion.numero;

    const bloque = document.createElement("div");
    const clase = document.createElement("p");
    clase.className = "clase";
    clase.textContent = estacion.tipo;
    const rotulo = document.createElement("h2");
    rotulo.textContent = estacion.titulo;
    const cuerpo = document.createElement("p");
    cuerpo.className = "cuerpo";
    cuerpo.textContent = estacion.texto;

    bloque.append(clase, rotulo, cuerpo);
    ficha.append(cifra, bloque);
    seccion.append(ficha);
    relato.append(seccion);
  });
}

function irA(nombre) {
  const seccion = document.querySelector(`#paso-${nombre}`);
  if (seccion) seccion.scrollIntoView({ behavior: "smooth", block: "start" });
}

function desplazar(paso) {
  const indice = orden.indexOf(actual);
  const destino = Math.min(orden.length - 1, Math.max(0, indice + paso));
  irA(orden[destino]);
}

function crearPuntos() {
  orden.forEach((nombre) => {
    const estacion = contenidos[nombre];
    if (!estacion.objetivo || nombre === "general") return;
    const punto = document.createElement("button");
    punto.className = "punto";
    punto.slot = `hotspot-${nombre}`;
    punto.dataset.destino = nombre;
    punto.dataset.position = `${estacion.objetivo.x}m ${estacion.objetivo.y}m ${estacion.objetivo.z}m`;
    punto.dataset.visibilityAttribute = "visible";
    punto.setAttribute("aria-label", `Estación ${estacion.numero}, ${estacion.titulo}`);
    punto.textContent = estacion.numero;
    punto.addEventListener("click", () => irA(nombre));
    visor.append(punto);
  });
}

construirRelato();

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      entrada.target.classList.toggle("visible", entrada.isIntersecting);
      if (!entrada.isIntersecting) return;
      const nombre = entrada.target.dataset.paso;
      if (nombre !== actual) enfocar(nombre);
    });
  },
  { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
);

document.querySelectorAll(".paso").forEach((paso) => observador.observe(paso));

function medirAvance() {
  const recorrido = document.documentElement.scrollHeight - window.innerHeight;
  const razon = recorrido > 0 ? window.scrollY / recorrido : 0;
  avance.style.width = `${Math.max(0, Math.min(1, razon)) * 100}%`;
}

let pendiente = false;
window.addEventListener(
  "scroll",
  () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      medirAvance();
    });
  },
  { passive: true },
);
medirAvance();

/* La rueda sobre la maqueta se traduce en desplazamiento de la página. Cuando
   el recorrido llega a su primer o a su último tramo el evento se deja pasar,
   de manera que dentro de un bloque incrustado en StoryMaps la historia que lo
   contiene pueda seguir desplazándose y el visitante nunca quede atrapado. */
function normalizar(evento) {
  if (evento.deltaMode === 1) return evento.deltaY * 18;
  if (evento.deltaMode === 2) return evento.deltaY * window.innerHeight;
  return evento.deltaY;
}

window.addEventListener(
  "wheel",
  (evento) => {
    const destino = evento.target;
    if (!(destino instanceof Element) || !escena.contains(destino)) return;
    const salto = normalizar(evento);
    const recorrido = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    if (salto > 0 && y >= recorrido - 2) return;
    if (salto < 0 && y <= 2) return;
    evento.preventDefault();
    window.scrollBy(0, salto);
  },
  { capture: true, passive: false },
);

visor.addEventListener("progress", (evento) => {
  if (cargado) return;
  const porcentaje = Math.round((evento.detail?.totalProgress ?? 0) * 100);
  anunciar(
    porcentaje > 0 && porcentaje < 100 ? `Cargando museo 3D ${porcentaje}%` : "Cargando museo 3D",
  );
});

visor.addEventListener("load", () => {
  cargado = true;
  try {
    prepararTelon();
    crearPuntos();
    enfocar(actual);
  } catch (error) {
    console.warn("Encuadre inicial no disponible", error);
  } finally {
    visor.dismissPoster();
  }
});

visor.addEventListener("error", (evento) => {
  console.error("Fallo al cargar el modelo", evento.detail ?? evento);
  anunciar("No se pudo cargar modelo.glb. Verifica que el archivo esté junto a index.html.");
});

window.setTimeout(() => {
  if (!cargado) {
    anunciar("La carga tarda más de lo previsto. Revisa la conexión o la ruta de modelo.glb.");
  }
}, 30000);

let redimension;
window.addEventListener("resize", () => {
  window.clearTimeout(redimension);
  redimension = window.setTimeout(() => {
    medirAvance();
    if (cargado) enfocar(actual);
  }, 220);
});

botones.forEach((boton) => {
  boton.addEventListener("click", () => irA(boton.dataset.estacion));
});

anterior.addEventListener("click", () => desplazar(-1));
siguiente.addEventListener("click", () => desplazar(1));

pantalla.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch {
    pantalla.textContent = "No disponible aquí";
    window.setTimeout(() => (pantalla.textContent = "Pantalla completa"), 2200);
  }
});

document.addEventListener("fullscreenchange", () => {
  pantalla.textContent = document.fullscreenElement
    ? "Salir de pantalla completa"
    : "Pantalla completa";
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "ArrowRight" || evento.key === "PageDown") desplazar(1);
  if (evento.key === "ArrowLeft" || evento.key === "PageUp") desplazar(-1);
  if (evento.key === "Home" || evento.key === "Escape") irA("general");
});
