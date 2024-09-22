// Obtener el parámetro 'para' de la URL
const urlParams = new URLSearchParams(window.location.search);
const paraName = urlParams.get('para') || 'Amigo';

// Elementos del DOM
const audio = document.querySelector("audio");
const lyrics = document.querySelector("#lyrics");
const startMessage = document.createElement("div");
startMessage.id = "start-message";
document.body.appendChild(startMessage);

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
const lyricsData = [
  { text: "Él la estaba esperando con una flor amarilla", time: 18, duration: 4 },
  { text: "Ella lo estaba soñando con la luz en su pupila", time: 24, duration: 6 },
  { text: "Y el amarillo del Sol iluminaba la esquina , la esquina ", time: 33, duration: 7 },
  { text: "Lo sentía tan cercano, lo sentía desde niñaaaaaaa", time: 41, duration: 4 },
  { text: "Ella sabía que él sabía", time: 47, duration: 3 },
  { text: "Que algún día pasaría", time: 50, duration: 2 },
  { text: "Que vendría a buscarla", time: 52, duration: 2 },
  { text: "Con sus flores amarillas", time: 54, duration: 4 },
  { text: "No te apures, no detengas", time: 60, duration: 2 },
  { text: "El instante del encuentro", time: 63, duration: 1 },
  { text: "Está dicho que es un hecho", time: 64, duration: 1 },
  { text: "No la pierdas, no hay derecho", time: 65, duration: 3 },
  { text: "No te olvides que la vida", time: 68, duration: 3 },
  { text: "Casi nunca está dormida", time: 71, duration: 5 },
  { text: "", time: 76, duration: 18 },
  { text: "En ese bar tan desierto nos esperaba el encuentro, encuentro", time: 94, duration: 6 },
  { text: "Ella llegó en limusina amarilla por supuesto", time: 102, duration: 6 },
  { text: "Él se acercó de repente la miro tan de frente", time: 110, duration: 6 },
  { text: "Toda una vida soñada y no pudo decir nada", time: 118, duration: 4 },
  { text: "Ella sabía que él sabía", time: 124, duration: 1 },
  { text: "Que algún día pasaría", time: 125, duration: 4 },
  { text: "Que vendría a buscarla", time: 129, duration: 2 },
  { text: "Con sus flores amarillas", time: 131, duration: 4 },
  { text: "No te apures, no detengas", time: 137, duration: 2 },
  { text: "El instante del encuentro", time: 139, duration: 2 },
  { text: "Está dicho que es un hecho", time: 141, duration: 2 },
  { text: "No la pierdas, no hay derecho", time: 143, duration: 2 },
  { text: "No te olvides que la vida", time: 145, duration: 4 },
  { text: "Casi nunca está dormida", time: 149, duration: 12 },
  { text: "Flores amarillas", time: 161, duration: 4 },
  { text: "", time: 165, duration: 4 },
  { text: "Ella sabía que él sabía", time: 169, duration: 3 },
  { text: "Que algún día pasaría", time: 172, duration: 2 },
  { text: "Que vendría a buscarla", time: 174, duration: 2 },
  { text: "Con sus flores amarillas", time: 176, duration: 6 },
  { text: "No te apures, no detengas", time: 182, duration: 3 },
  { text: "El instante del encuentro", time: 185, duration: 1 },
  { text: "Está dicho que es un hecho", time: 186, duration: 2 },
  { text: "No la pierdas, no hay derecho", time: 188, duration: 2 },
  { text: "No te olvides que la vida", time: 190, duration: 4 },
  { text: "Casi nunca está dormida", time: 194, duration: 5 },
  { text: "Ella sabía que él sabía", time: 199, duration: 2 },
  { text: "Él sabía, ella sabía", time: 201, duration: 2 },
  { text: "Que él sabía, ella sabía", time: 203, duration: 2 },
  { text: "Y se olvidaron de sus flores amarillas", time: 205, duration: 5 }
];

// Función para dividir el texto en palabras
function splitIntoWords(text) {
  return text.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
}

// Función para resaltar las palabras cantadas
function highlightWords(currentLine, time) {
  const words = lyrics.querySelectorAll('.word');
  const lineProgress = (time - currentLine.time) / currentLine.duration;

  const totalLength = words.length;
  const highlightedWordCount = Math.floor(lineProgress * totalLength);

  words.forEach((word, index) => {
    if (index < highlightedWordCount) {
      word.classList.add('highlighted');
    } else {
      word.classList.remove('highlighted');
    }
  });
}

// Animar las letras
function updateLyrics() {
  const time = audio.currentTime;
  const currentLine = lyricsData.find((line, index) => {
    const nextLine = lyricsData[index + 1];
    return time >= line.time && (!nextLine || time < nextLine.time);
  });

  if (currentLine) {
    const fadeInDuration = 0.5;
    const fadeOutDuration = 0.5;

    const nextLineIndex = lyricsData.indexOf(currentLine) + 1;
    const nextLine = lyricsData[nextLineIndex];
    const timeUntilNextLine = nextLine ? nextLine.time - time : Infinity;

    let opacity;
    if (timeUntilNextLine > fadeOutDuration) {
      opacity = 1;
    } else if (timeUntilNextLine <= 0) {
      opacity = 0;
    } else {
      opacity = timeUntilNextLine / fadeOutDuration;
    }

    lyrics.style.opacity = opacity;
    lyrics.innerHTML = splitIntoWords(currentLine.text);

    highlightWords(currentLine, time);
  } else {
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

let updateInterval;

// Función para iniciar la canción
function startSong() {
  startMessage.style.display = 'none';
  updateInterval = setInterval(updateLyrics, 50);
}

// Función para mostrar el mensaje inicial y la cuenta regresiva
function showStartMessage() {
  audio.currentTime = 5;  // Establecer el tiempo de inicio en 5 segundos
  audio.play();

  setTimeout(() => {
    startMessage.innerHTML = `¿Estás lista, ${paraName}? A todo pulmón`;
    startMessage.style.display = 'block';

    setTimeout(() => {
      let count = 3;
      const countdownInterval = setInterval(() => {
        startMessage.innerHTML = count;
        count--;
        if (count < 0) {
          clearInterval(countdownInterval);
          startSong();
        }
      }, 1000);
    }, 3000);  // Mostrar la cuenta regresiva después de 3 segundos
  }, 5000);  // Mostrar mensaje 5 segundos después de iniciar el audio
}

// Función para ocultar el título
function ocultarTitulo() {
  const titulo = document.querySelector(".titulo");
  titulo.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(() => {
    titulo.style.display = "none";
  }, 3000);
}

// Iniciar todo el proceso
showStartMessage();

// Llama a la función después de 216 segundos
setTimeout(ocultarTitulo, 216000);

// Eventos del audio
audio.addEventListener('play', () => {
  if (!updateInterval) {
    updateInterval = setInterval(updateLyrics, 50);
  }
});

audio.addEventListener('pause', () => {
  clearInterval(updateInterval);
  updateInterval = null;
});

audio.addEventListener('seeking', updateLyrics);

audio.addEventListener('ended', () => {
  clearInterval(updateInterval);
  updateInterval = null;
  lyrics.style.opacity = 0;
  lyrics.innerHTML = "";

  // Mostrar mensaje final con opciones Sí y No
  startMessage.innerHTML = `
    ¿Quieres volver a escucharla, ${paraName}?<br>
    <button onclick="restartSong()">Sí</button>
    <button onclick="returnToIndex()">No</button>
  `;
  startMessage.style.display = 'block';
});

// Función para reiniciar la canción
function restartSong() {
  audio.currentTime = 0;
  showStartMessage();
}

// Función para volver a la página de inicio
function returnToIndex() {
  window.location.href = `http://localhost:8000/index.html?para=${encodeURIComponent(paraName)}`;
}
// Estilos CSS
const style = document.createElement('style');
style.textContent = `
  .word {
    transition: all 0.3s ease;
  }
  .highlighted {
    font-weight: bold;
    text-shadow: 0 0 5px #FFD700, 0 0 10px #FFD700; /* Duplicado y aumentado el shadow */
    color: #FFD700; /* Cambiado a dorado para mayor contraste */
  }
  #start-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2em;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 20px;
    border-radius: 10px;
    z-index: 1000;
  }
  #start-message button {
    font-size: 0.8em;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
  }
`;
document.head.appendChild(style);