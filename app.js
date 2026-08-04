const visor = document.querySelector("#museo");
const relato = document.querySelector("#relato");
const avance = document.querySelector("#avance");
const botones = [...document.querySelectorAll("[data-estacion]")];
const pantalla = document.querySelector("#pantalla");
const anterior = document.querySelector("#anterior");
const siguiente = document.querySelector("#siguiente");
const aviso = document.querySelector("#aviso");
const portada = document.querySelector("#portada");
const entrar = document.querySelector("#entrar");
const estadoPortada = document.querySelector("#portada-estado");

let iniciado = false;

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
    titulo: "Mapa de los Soras",
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
    titulo: "Vitrina central",
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
    titulo: "Materialidad",
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
    titulo: "Qollqas",
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
    titulo: "Los Soras e Inkarracay",
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

const piezas = {
  aribalos: {
    rotulo: "Ver la jarra de doble asa en 3D",
    clase: "Pieza digitalizada · vitrina central",
    lista: [
      {
        nombre: "Jarra de doble asa",
        detalle: "Double-handled pitcher",
        uid: "7ccc653873df4e15af7e1b4725dcd41b",
        enlace:
          "https://sketchfab.com/3d-models/jarra-de-doble-asa-double-handled-pitcher-7ccc653873df4e15af7e1b4725dcd41b",
      },
    ],
  },
  materialidad: {
    rotulo: "Ver las seis piezas en 3D",
    clase: "Piezas digitalizadas · vitrinas de materialidad",
    lista: [
      {
        nombre: "QU-239-84 (bolsa 404)",
        detalle: "Fotogrametría de pieza cerámica",
        uid: "b62c9354775f4ecda5490e1577202d3b",
        enlace: "https://sketchfab.com/3d-models/qu-239-84-bolsa-404-b62c9354775f4ecda5490e1577202d3b",
      },
      {
        nombre: "QU-239-E1A (bolsa 512)",
        detalle: "Fotogrametría de pieza cerámica",
        uid: "ef6eac882c3246278f20e06475a6bb1b",
        enlace: "https://sketchfab.com/3d-models/qu-239-e1a-bolsa-512-ef6eac882c3246278f20e06475a6bb1b",
      },
      {
        nombre: "QU-239-E4-10 (bolsa 469)",
        detalle: "Fotogrametría de pieza cerámica",
        uid: "97f4dc3d644f447ab71856ad5145afaa",
        enlace:
          "https://sketchfab.com/3d-models/qu-239-e4-10-bolsa-469-97f4dc3d644f447ab71856ad5145afaa",
      },
      {
        nombre: "QU-245-1 (Lari Kasa, Vasija Alberto)",
        detalle: "Fotogrametría de pieza cerámica",
        uid: "3a66ace0e7114fb2b6c94838c06e7ee0",
        enlace:
          "https://sketchfab.com/3d-models/qu-245-1-lari-kasa-vasija-alberto-3a66ace0e7114fb2b6c94838c06e7ee0",
      },
      {
        nombre: "QU-245-2 (Lari Kasa, vasija Alberto 2)",
        detalle: "Fotogrametría de pieza cerámica",
        uid: "acd125a07c014efb9b423c50c5b0b590",
        enlace:
          "https://sketchfab.com/3d-models/qu-245-2-lari-kasa-vasija-alberto-2-acd125a07c014efb9b423c50c5b0b590",
      },
      {
        nombre: "Vasija Alberto 2",
        detalle: "Fotogrametría de pieza cerámica",
        uid: "faa52379f9e5465d973ddc1eabdb8462",
        enlace: "https://sketchfab.com/3d-models/vasija-alberto-2-faa52379f9e5465d973ddc1eabdb8462",
      },
    ],
  },
};

const orden = Object.keys(contenidos);
let actual = "general";
let cargado = false;
let telon = [];

function anunciar(mensaje) {
  if (aviso) aviso.textContent = mensaje;
  if (estadoPortada && !iniciado) estadoPortada.textContent = mensaje;
}

function ajuste() {
  const ancho = visor.clientWidth || window.innerWidth || 1;
  const alto = visor.clientHeight || window.innerHeight || 1;
  const razon = ancho / alto;
  if (razon >= 1.35) return { escala: 1, extra: 0, giro: 30 };
  if (razon >= 0.95) return { escala: 1.14, extra: 7, giro: 38 };
  return { escala: 1.3, extra: 13, giro: 46 };
}

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
      telon.push({
        material,
        base: [previo[0], previo[1], previo[2]],
        lienzo: material.name === "BASA_Documentary_Screen",
      });
    } catch (error) {
      /* */
    }
  });
}

window.addEventListener("unhandledrejection", (evento) => {
  const causa = evento.reason;
  const clase = causa && causa.name;
  if (clase === "AbortError" || clase === "NotAllowedError") evento.preventDefault();
});

const rutasDocumental = ["./documental.mp4", "./documental.webm"];
let rutaDocumental = "";
let cinta = null;
let telonVivo = false;
let cineAbierto = false;

function girarCinta(encendido) {
  if (!cinta) return;
  if (encendido && !cineAbierto) {
    const intento = cinta.play();
    if (intento && intento.catch) intento.catch(() => {});
  } else {
    cinta.pause();
  }
}

function enderezar(textura) {
  const muestra = textura?.sampler;
  if (!muestra) return;
  try {
    muestra.setWrapS(10497);
    muestra.setWrapT(10497);
  } catch (error) {
    /* */
  }
  try {
    muestra.setScale({ u: 1, v: -1 });
    muestra.setOffset({ u: 0, v: 1 });
  } catch (error) {
    try {
      muestra.setScale([1, -1]);
      muestra.setOffset([0, 1]);
    } catch (otro) {
      /* */
    }
  }
}

async function encenderTelon() {
  if (telonVivo || !telon.length) return;
  for (const ruta of rutasDocumental) {
    try {
      const sonda = await fetch(ruta, { method: "HEAD" });
      if (sonda.ok) {
        rutaDocumental = ruta;
        break;
      }
    } catch (error) {
      /* */
    }
  }
  if (!rutaDocumental) return;
  let textura = null;
  try {
    textura = await visor.createVideoTexture(rutaDocumental);
  } catch (error) {
    return;
  }
  if (!textura) return;
  cinta = textura.source?.element ?? null;
  if (cinta) {
    cinta.loop = true;
    cinta.muted = true;
    cinta.playsInline = true;
    cinta.setAttribute("playsinline", "");
    const acomodar = () => girarCinta(actual === "documental");
    if (!cinta.paused && cinta.readyState >= 3) acomodar();
    else cinta.addEventListener("playing", acomodar, { once: true });
    const arranque = cinta.play();
    if (arranque && arranque.catch) arranque.catch(() => {});
  }
  telon.forEach(({ material, lienzo }) => {
    if (!lienzo) return;
    try {
      material.pbrMetallicRoughness.baseColorTexture.setTexture(textura);
      enderezar(material.pbrMetallicRoughness.baseColorTexture.texture);
    } catch (error) {
      /* */
    }
    try {
      material.setEmissiveFactor([1, 1, 1]);
      material.emissiveTexture.setTexture(textura);
      enderezar(material.emissiveTexture.texture);
    } catch (error) {
      /* */
    }
  });
  telonVivo = true;
  document.body.classList.add("con-documental");
  velarTelon(actual);
}

function velarTelon(nombre) {
  const alfa = nombre === "documental" ? 1 : 0;
  telon.forEach(({ material, base, lienzo }) => {
    const tinte = telonVivo && lienzo ? [0.14, 0.14, 0.14] : base;
    try {
      material.pbrMetallicRoughness.setBaseColorFactor([tinte[0], tinte[1], tinte[2], alfa]);
    } catch (error) {
      /* */
    }
  });
  girarCinta(alfa === 1);
}

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
      const barra = boton.parentElement;
      if (barra && barra.scrollWidth > barra.clientWidth) {
        barra.scrollTo({
          left: boton.offsetLeft - barra.clientWidth / 2 + boton.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  });

  document.querySelectorAll(".punto").forEach((punto) => {
    punto.classList.toggle("punto-activo", punto.dataset.destino === nombre);
  });
}

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

    const grupo = piezas[nombre];
    if (grupo) {
      const llamada = document.createElement("button");
      llamada.type = "button";
      llamada.className = "abrir-piezas";
      llamada.textContent = grupo.rotulo;
      llamada.addEventListener("click", () => abrirPiezas(nombre, llamada));
      bloque.append(llamada);
    }

    if (nombre === "documental") {
      const cine = document.createElement("button");
      cine.type = "button";
      cine.className = "abrir-piezas abrir-cine";
      cine.textContent = "Ver el documental completo";
      cine.addEventListener("click", () => abrirCine(cine));
      bloque.append(cine);
    }

    ficha.append(cifra, bloque);
    seccion.append(ficha);
    relato.append(seccion);
  });
}

let indiceDestino = 0;
let enMovimiento = false;
let cuadro = 0;
let finTraslado;

function deslizarHasta(destinoY, duracion = 520) {
  window.cancelAnimationFrame(cuadro);
  window.clearTimeout(finTraslado);
  const inicioY = window.scrollY;
  const tope = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const meta = Math.max(0, Math.min(tope, destinoY));
  const tramo = meta - inicioY;
  if (Math.abs(tramo) < 1.5) {
    enMovimiento = false;
    return;
  }
  enMovimiento = true;
  finTraslado = window.setTimeout(() => {
    window.cancelAnimationFrame(cuadro);
    window.scrollTo(0, meta);
    enMovimiento = false;
  }, duracion + 300);
  const partida = performance.now();
  const suavizar = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const avanzar = (ahora) => {
    const t = Math.min(1, (ahora - partida) / duracion);
    window.scrollTo(0, inicioY + tramo * suavizar(t));
    if (t < 1) {
      cuadro = window.requestAnimationFrame(avanzar);
      return;
    }
    window.clearTimeout(finTraslado);
    finTraslado = window.setTimeout(() => {
      enMovimiento = false;
    }, 60);
  };
  cuadro = window.requestAnimationFrame(avanzar);
}

function irAIndice(indice, duracion) {
  indiceDestino = Math.min(orden.length - 1, Math.max(0, indice));
  const seccion = document.querySelector(`#paso-${orden[indiceDestino]}`);
  if (!seccion) return;
  deslizarHasta(Math.round(seccion.getBoundingClientRect().top + window.scrollY), duracion);
}

function irA(nombre) {
  const indice = orden.indexOf(nombre);
  if (indice < 0) return;
  const distancia = Math.abs(indice - indiceDestino);
  irAIndice(indice, distancia > 1 ? 760 : 520);
}

function desplazar(paso) {
  irAIndice(indiceDestino + paso, 520);
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

function urlPieza(uid) {
  const parametros = new URLSearchParams({
    autostart: "1",
    autospin: "0.2",
    preload: "0",
    transparent: "1",
    ui_theme: "dark",
    ui_infos: "0",
    ui_hint: "0",
    ui_ar: "0",
    ui_help: "0",
    ui_settings: "0",
    ui_inspector: "0",
    ui_vr: "0",
    dnt: "1",
  });
  return `https://sketchfab.com/models/${uid}/embed?${parametros.toString()}`;
}

const capa = document.createElement("div");
capa.className = "piezas";
capa.hidden = true;
capa.setAttribute("role", "dialog");
capa.setAttribute("aria-modal", "true");
capa.setAttribute("aria-label", "Piezas digitalizadas en tres dimensiones");
capa.innerHTML = `
  <div class="piezas-velo" data-cerrar></div>
  <div class="piezas-marco">
    <button class="piezas-cerrar" type="button" aria-label="Cerrar el visor de piezas">×</button>
    <header class="piezas-cabecera">
      <p class="clase piezas-clase"></p>
      <h3 class="piezas-nombre"></h3>
      <p class="piezas-detalle"></p>
    </header>
    <div class="piezas-lienzo">
      <p class="piezas-espera"><span class="pulso"></span>Cargando la pieza</p>
      <iframe
        class="piezas-marco-3d"
        title="Pieza digitalizada"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>
    <footer class="piezas-pie">
      <button class="piezas-flecha piezas-anterior" type="button" aria-label="Pieza anterior">‹</button>
      <div class="piezas-puntos"></div>
      <button class="piezas-flecha piezas-siguiente" type="button" aria-label="Pieza siguiente">›</button>
    </footer>
  </div>
`;
document.body.append(capa);

const marco3d = capa.querySelector(".piezas-marco-3d");
const lienzoPieza = capa.querySelector(".piezas-lienzo");
const rotuloClase = capa.querySelector(".piezas-clase");
const rotuloNombre = capa.querySelector(".piezas-nombre");
const rotuloDetalle = capa.querySelector(".piezas-detalle");
const puntosPieza = capa.querySelector(".piezas-puntos");
const flechaAnterior = capa.querySelector(".piezas-anterior");
const flechaSiguiente = capa.querySelector(".piezas-siguiente");

let coleccion = null;
let indicePieza = 0;
let piezasAbiertas = false;
let disparador = null;
let anclaPiezas = 0;

function pintarPuntos() {
  puntosPieza.textContent = "";
  if (!coleccion || coleccion.lista.length < 2) return;
  coleccion.lista.forEach((pieza, indice) => {
    const punto = document.createElement("button");
    punto.type = "button";
    punto.className = "piezas-punto";
    punto.setAttribute("aria-label", pieza.nombre);
    punto.classList.toggle("piezas-punto-activo", indice === indicePieza);
    punto.addEventListener("click", () => mostrarPieza(indice));
    puntosPieza.append(punto);
  });
}

function mostrarPieza(indice) {
  if (!coleccion) return;
  const total = coleccion.lista.length;
  indicePieza = (indice + total) % total;
  const pieza = coleccion.lista[indicePieza];
  rotuloClase.textContent =
    total > 1 ? `${coleccion.clase} · ${indicePieza + 1} de ${total}` : coleccion.clase;
  rotuloNombre.textContent = pieza.nombre;
  rotuloDetalle.textContent = pieza.detalle ?? "";
  marco3d.title = pieza.nombre;
  lienzoPieza.classList.remove("piezas-listo");
  marco3d.src = urlPieza(pieza.uid);
  const solitaria = total < 2;
  flechaAnterior.hidden = solitaria;
  flechaSiguiente.hidden = solitaria;
  pintarPuntos();
  anunciar(`Pieza ${indicePieza + 1} de ${total}, ${pieza.nombre}`);
}

function pasarPieza(paso) {
  if (!coleccion || coleccion.lista.length < 2) return;
  mostrarPieza(indicePieza + paso);
}

function abrirPiezas(clave, origen) {
  const grupo = piezas[clave];
  if (!grupo) return;
  coleccion = grupo;
  disparador = origen ?? null;
  piezasAbiertas = true;
  const asiento = document.querySelector(`#paso-${orden[indiceDestino]}`);
  if (asiento) {
    window.cancelAnimationFrame(cuadro);
    window.clearTimeout(finTraslado);
    enMovimiento = false;
    window.scrollTo(0, Math.round(asiento.getBoundingClientRect().top + window.scrollY));
  }
  anclaPiezas = window.scrollY;
  capa.hidden = false;
  document.documentElement.classList.add("con-piezas");
  document.body.classList.add("con-piezas");
  window.requestAnimationFrame(() => capa.classList.add("piezas-visible"));
  mostrarPieza(0);
  capa.querySelector(".piezas-cerrar").focus({ preventScroll: true });
}

function cerrarPiezas() {
  if (!piezasAbiertas) return;
  piezasAbiertas = false;
  capa.classList.remove("piezas-visible");
  document.documentElement.classList.remove("con-piezas");
  document.body.classList.remove("con-piezas");
  marco3d.removeAttribute("src");
  window.scrollTo(0, anclaPiezas);
  window.setTimeout(() => {
    if (!piezasAbiertas) capa.hidden = true;
  }, 260);
  if (disparador) disparador.focus({ preventScroll: true });
  disparador = null;
  coleccion = null;
}

marco3d.addEventListener("load", () => {
  if (marco3d.getAttribute("src")) lienzoPieza.classList.add("piezas-listo");
});

capa.querySelector(".piezas-cerrar").addEventListener("click", cerrarPiezas);
capa.querySelector("[data-cerrar]").addEventListener("click", cerrarPiezas);
flechaAnterior.addEventListener("click", () => pasarPieza(-1));
flechaSiguiente.addEventListener("click", () => pasarPieza(1));
capa.addEventListener("wheel", (evento) => evento.preventDefault(), { passive: false });

window.addEventListener(
  "scroll",
  () => {
    if (!piezasAbiertas) return;
    if (Math.abs(window.scrollY - anclaPiezas) < 1) return;
    window.scrollTo(0, anclaPiezas);
  },
  { passive: true },
);

const sala = document.createElement("div");
sala.className = "cine";
sala.hidden = true;
sala.setAttribute("role", "dialog");
sala.setAttribute("aria-modal", "true");
sala.setAttribute("aria-label", "Equilibrio entre el centro y lo local");
sala.innerHTML = `
  <div class="cine-velo" data-cerrar></div>
  <div class="cine-marco">
    <button class="cine-cerrar" type="button" aria-label="Cerrar el documental">&times;</button>
    <header class="cine-cabecera">
      <p class="clase">Documental</p>
      <h3 class="cine-nombre">Equilibrio entre el centro y lo local. Estrategias de movilización y producción del estado Inka colonial temprano en Cochabamba, Bolivia.</h3>
    </header>
    <div class="cine-lienzo">
      <video class="cine-video" controls playsinline preload="metadata"></video>
    </div>
    <footer class="cine-pie">
      <button class="cine-completa" type="button">Pantalla completa</button>
    </footer>
  </div>
`;
document.body.append(sala);

const lienzoCine = sala.querySelector(".cine-lienzo");
const videoCine = sala.querySelector(".cine-video");
let llamadaCine = null;
let anclaCine = 0;

function abrirCine(origen) {
  if (cineAbierto) return;
  cineAbierto = true;
  llamadaCine = origen ?? null;
  anclaCine = window.scrollY;
  const punto = cinta && Number.isFinite(cinta.currentTime) ? cinta.currentTime : 0;
  girarCinta(false);
  if (!videoCine.getAttribute("src")) videoCine.setAttribute("src", rutaDocumental);
  sala.hidden = false;
  document.documentElement.classList.add("con-piezas");
  document.body.classList.add("con-piezas");
  window.requestAnimationFrame(() => sala.classList.add("cine-visible"));
  const arrancar = () => {
    try {
      videoCine.currentTime = punto;
    } catch (error) {
      /* */
    }
    const intento = videoCine.play();
    if (intento && intento.catch) intento.catch(() => {});
  };
  if (videoCine.readyState >= 1) arrancar();
  else videoCine.addEventListener("loadedmetadata", arrancar, { once: true });
  sala.querySelector(".cine-cerrar").focus({ preventScroll: true });
}

function cerrarCine() {
  if (!cineAbierto) return;
  cineAbierto = false;
  const punto = videoCine.currentTime;
  videoCine.pause();
  if (document.fullscreenElement) document.exitFullscreen?.();
  sala.classList.remove("cine-visible");
  document.documentElement.classList.remove("con-piezas");
  document.body.classList.remove("con-piezas");
  window.scrollTo(0, anclaCine);
  window.setTimeout(() => {
    if (!cineAbierto) sala.hidden = true;
  }, 260);
  if (cinta && Number.isFinite(punto)) {
    try {
      cinta.currentTime = punto;
    } catch (error) {
      /* */
    }
  }
  girarCinta(actual === "documental");
  if (llamadaCine) llamadaCine.focus({ preventScroll: true });
  llamadaCine = null;
}

sala.querySelector(".cine-cerrar").addEventListener("click", cerrarCine);
sala.querySelector("[data-cerrar]").addEventListener("click", cerrarCine);
sala.querySelector(".cine-completa").addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen?.();
    return;
  }
  if (lienzoCine.requestFullscreen) lienzoCine.requestFullscreen();
  else if (videoCine.webkitEnterFullscreen) videoCine.webkitEnterFullscreen();
});
sala.addEventListener("wheel", (evento) => evento.preventDefault(), { passive: false });

window.addEventListener("keydown", (evento) => {
  if (evento.key !== "Escape") return;
  if (cineAbierto && !document.fullscreenElement) cerrarCine();
});

window.addEventListener(
  "scroll",
  () => {
    if (!cineAbierto) return;
    if (Math.abs(window.scrollY - anclaCine) < 1) return;
    window.scrollTo(0, anclaCine);
  },
  { passive: true },
);

const secciones = [...document.querySelectorAll(".paso")];

function resolverEstacion() {
  if (!secciones.length) return;
  const centro = window.innerHeight / 2;
  let elegida = secciones[0];
  let menor = Number.POSITIVE_INFINITY;
  secciones.forEach((seccion) => {
    const caja = seccion.getBoundingClientRect();
    const distancia = Math.abs(caja.top + caja.height / 2 - centro);
    if (distancia < menor) {
      menor = distancia;
      elegida = seccion;
    }
  });
  secciones.forEach((seccion) => seccion.classList.toggle("visible", seccion === elegida));
  const nombre = elegida.dataset.paso;
  if (nombre !== actual) enfocar(nombre);
  if (!enMovimiento) indiceDestino = orden.indexOf(nombre);
}

resolverEstacion();

const testigo = document.createElement("div");
testigo.setAttribute("aria-hidden", "true");
testigo.style.cssText =
  "position:fixed;inset:0;pointer-events:none;visibility:hidden;z-index:-1";
document.body.append(testigo);

const UMBRAL_MARCO = 0.86;
const SUELO_MARCO = 0.72;
const DESCANSO_MARCO = 520;

let visibilidad = 1;
let techoVisible = 1;
let enmarcado = true;
let esperaGesto = false;
let momentoMarco = 0;
let hojaBloqueada = false;
let anclaMarco = 0;

function aplicarBloqueo() {
  document.documentElement.style.overflow = hojaBloqueada || !iniciado ? "hidden" : "";
}

function bloquearHoja(activo) {
  if (activo === hojaBloqueada) return;
  if (activo) anclaMarco = window.scrollY;
  hojaBloqueada = activo;
  aplicarBloqueo();
  if (Math.abs(window.scrollY - anclaMarco) > 1) window.scrollTo(0, anclaMarco);
}

aplicarBloqueo();

function liston(base) {
  return Math.min(base, Math.max(0.45, techoVisible - (1 - base)));
}

const vigia = new IntersectionObserver(
  (entradas) => {
    const entrada = entradas[entradas.length - 1];
    if (!entrada) return;
    visibilidad = entrada.intersectionRatio;
    if (visibilidad > techoVisible) techoVisible = visibilidad;
    const antes = enmarcado;
    if (!enmarcado && visibilidad >= liston(UMBRAL_MARCO)) enmarcado = true;
    else if (enmarcado && visibilidad < liston(SUELO_MARCO)) enmarcado = false;
    if (enmarcado === antes) return;
    bloquearHoja(!enmarcado);
    if (!enmarcado) return;
    esperaGesto = true;
    momentoMarco = performance.now();
    window.clearTimeout(silencio);
    silencio = window.setTimeout(liberarGesto, DESCANSO_MARCO);
  },
  { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.72, 0.8, 0.86, 0.92, 0.97, 1] },
);
vigia.observe(testigo);

window.addEventListener("resize", () => {
  techoVisible = visibilidad;
});

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
      resolverEstacion();
    });
  },
  { passive: true },
);
medirAvance();

const UMBRAL_GESTO = 6;
const SILENCIO_GESTO = 190;
const ENFRIAMIENTO = 460;

let bloqueoGesto = false;
let acumulado = 0;
let silencio;
let ultimoSalto = 0;

function liberarGesto() {
  const resto = ENFRIAMIENTO - (performance.now() - ultimoSalto);
  if (resto > 0) {
    silencio = window.setTimeout(liberarGesto, resto);
    return;
  }
  const asiento = DESCANSO_MARCO - (performance.now() - momentoMarco);
  if (esperaGesto && asiento > 0) {
    silencio = window.setTimeout(liberarGesto, asiento);
    return;
  }
  esperaGesto = false;
  bloqueoGesto = false;
  acumulado = 0;
}

function normalizar(evento) {
  if (evento.deltaMode === 1) return evento.deltaY * 18;
  if (evento.deltaMode === 2) return evento.deltaY * window.innerHeight;
  return evento.deltaY;
}

window.addEventListener(
  "wheel",
  (evento) => {
    if (evento.ctrlKey) return;
    if (!iniciado) {
      evento.preventDefault();
      return;
    }
    if (piezasAbiertas) {
      evento.preventDefault();
      return;
    }
    const salto = normalizar(evento);
    if (Math.abs(salto) < 0.4) return;
    const sentido = salto > 0 ? 1 : -1;
    if (sentido > 0 && indiceDestino >= orden.length - 1) return;
    if (sentido < 0 && indiceDestino <= 0) return;
    if (!enmarcado) {
      acumulado = 0;
      return;
    }

    evento.preventDefault();
    if (esperaGesto) {
      window.clearTimeout(silencio);
      silencio = window.setTimeout(liberarGesto, Math.max(SILENCIO_GESTO, DESCANSO_MARCO));
      return;
    }
    window.clearTimeout(silencio);
    silencio = window.setTimeout(liberarGesto, SILENCIO_GESTO);

    if (bloqueoGesto) return;
    acumulado += salto;
    if (Math.abs(acumulado) < UMBRAL_GESTO) return;
    bloqueoGesto = true;
    acumulado = 0;
    ultimoSalto = performance.now();
    desplazar(sentido);
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
    encenderTelon();
    crearPuntos();
    enfocar(actual);
  } catch (error) {
    /* */
  } finally {
    visor.dismissPoster();
  }
  if (estadoPortada) estadoPortada.hidden = true;
});

visor.addEventListener("error", () => {
  anunciar("No se pudo cargar el recorrido.");
});

window.setTimeout(() => {
  if (!cargado) {
    anunciar("La carga tarda más de lo previsto.");
  }
}, 30000);

let redimension;
window.addEventListener("resize", () => {
  window.clearTimeout(redimension);
  redimension = window.setTimeout(() => {
    medirAvance();
    resolverEstacion();
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

const adelante = new Set(["ArrowRight", "ArrowDown", "PageDown", " ", "Spacebar"]);
const atras = new Set(["ArrowLeft", "ArrowUp", "PageUp"]);

document.addEventListener("keydown", (evento) => {
  if (evento.metaKey || evento.ctrlKey || evento.altKey) return;
  if (!iniciado) {
    if (evento.key === "Enter" || adelante.has(evento.key)) {
      evento.preventDefault();
      iniciarRecorrido();
    }
    return;
  }
  if (piezasAbiertas) {
    if (evento.key === "Escape") {
      evento.preventDefault();
      cerrarPiezas();
      return;
    }
    if (evento.key === "ArrowRight") {
      evento.preventDefault();
      pasarPieza(1);
      return;
    }
    if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      pasarPieza(-1);
      return;
    }
    if (adelante.has(evento.key) || atras.has(evento.key)) evento.preventDefault();
    return;
  }
  if (adelante.has(evento.key)) {
    evento.preventDefault();
    desplazar(1);
    return;
  }
  if (atras.has(evento.key)) {
    evento.preventDefault();
    desplazar(-1);
    return;
  }
  if (evento.key === "Home" || evento.key === "Escape") {
    evento.preventDefault();
    irA("general");
    return;
  }
  if (evento.key === "End") {
    evento.preventDefault();
    irA(orden[orden.length - 1]);
  }
});

let tactoY = null;
let tactoX = null;
let tactoUsado = false;

window.addEventListener(
  "touchstart",
  (evento) => {
    if (evento.touches.length !== 1) {
      tactoY = null;
      return;
    }
    tactoY = evento.touches[0].clientY;
    tactoX = evento.touches[0].clientX;
    tactoUsado = false;
    if (performance.now() - momentoMarco > DESCANSO_MARCO) esperaGesto = false;
  },
  { passive: true },
);

window.addEventListener(
  "touchmove",
  (evento) => {
    if (piezasAbiertas || !iniciado) return;
    if (tactoY === null || tactoUsado || evento.touches.length !== 1) return;
    if (esperaGesto || !enmarcado) return;
    const dy = tactoY - evento.touches[0].clientY;
    const dx = tactoX - evento.touches[0].clientX;
    if (Math.abs(dy) < 46 || Math.abs(dy) < Math.abs(dx) * 1.25) return;
    const sentido = dy > 0 ? 1 : -1;
    if (sentido > 0 && indiceDestino >= orden.length - 1) return;
    if (sentido < 0 && indiceDestino <= 0) return;
    tactoUsado = true;
    desplazar(sentido);
  },
  { passive: true },
);

window.addEventListener(
  "touchend",
  () => {
    tactoY = null;
    tactoX = null;
  },
  { passive: true },
);

function iniciarRecorrido() {
  if (iniciado) return;
  iniciado = true;
  document.body.classList.add("iniciado");
  aplicarBloqueo();
  window.setTimeout(() => {
    if (portada) portada.hidden = true;
  }, 700);
  try {
    visor.focus({ preventScroll: true });
  } catch {}
}

if (entrar) entrar.addEventListener("click", iniciarRecorrido);
if (portada) portada.addEventListener("click", iniciarRecorrido);
