# Visor inmersivo del Museo BASA

Recorrido tridimensional de la exposición Paisajes en Transformación, El Valle de
Cochabamba Más Allá de los Inkas, montada en el Museo BASA de Bonn. El visor está
pensado para insertarse dentro de un relato de ArcGIS StoryMaps mediante un bloque
Embed en modo interactivo, y funciona igual en escritorio y en teléfono móvil.

## Publicación

Este repositorio publica el sitio ya construido desde la raíz de la rama principal
mediante GitHub Pages, de modo que todos los archivos que aquí aparecen son los que
el navegador descarga, sin ningún paso intermedio de compilación. El archivo
`index.html` carga la hoja de estilos `styles.css`, el guion `app.js`, el componente
`model-viewer.min.js` y el modelo `modelo.glb`, mientras que el decodificador Draco
queda disponible en los tres archivos `draco_decoder.js`, `draco_decoder.wasm` y
`draco_wasm_wrapper.js`, todos ellos servidos desde este mismo repositorio para que
el visor no dependa de ningún dominio externo.

## Qué contiene el recorrido

El visor tiene catorce estaciones, desde la vista general hasta el Impressum, y se
recorre deslizando el trackpad hacia arriba o hacia abajo, con la posibilidad
adicional de saltar a cualquiera de ellas desde la barra lateral. En cada estación
la cámara queda acotada a un punto de vista humano, con un margen lateral y vertical
limitado y un intervalo de acercamiento restringido, de modo que el visitante mira
alrededor sin poder volar por el modelo. El lienzo del documental permanece
transparente en todas las estaciones salvo en la suya, de manera que no oculta los
paneles que quedan detrás.

## Inserción en StoryMaps

Dentro del relato se añade un bloque Embed, se pega la dirección pública de este
sitio, se elige el modo interactivo y se fija una altura de setecientos píxeles o
más, para que la barra de estaciones y la escena convivan con holgura en la pantalla.
