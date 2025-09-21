document.addEventListener('DOMContentLoaded', function() {
  // Elementos del reproductor de música
  const audioPlayer = document.getElementById('audioPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const currentTimeEl = document.getElementById('currentTime');
  const totalTimeEl = document.getElementById('totalTime');
  const songInfo = document.querySelector('.song-info');

  // Estado inicial
  let isPlaying = false;

  // Función para formatear el tiempo
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Actualizar la barra de progreso y el tiempo
  audioPlayer.addEventListener('loadedmetadata', function() {
    totalTimeEl.textContent = formatTime(audioPlayer.duration);
  });

  audioPlayer.addEventListener('timeupdate', function() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progressPercent = (currentTime / duration) * 100;

    progressFill.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
  });

  // Click en la barra de progreso para buscar
  progressBar.addEventListener('click', function(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;

    audioPlayer.currentTime = (clickX / width) * duration;
  });

  // Botón de play/pause
  playPauseBtn.addEventListener('click', function() {
    if (isPlaying) {
      audioPlayer.pause();
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      songInfo.textContent = "Pausado ⏸️";
    } else {
      audioPlayer.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
      songInfo.textContent = "Reproduciendo Feliz 31 de septiembre ❤️";
    }
    isPlaying = !isPlaying;
  });

  // Efectos de partículas
  function createParticles() {
    const container = document.getElementById('particle-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 5 + 2;
      const posX = Math.random() * 100;
      const delay = Math.random() * 5;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}vw`;
      particle.style.animationDelay = `${delay}s`;

      container.appendChild(particle);
    }
  }

  // Flores cayendo
  function createFallingFlowers() {
    const container = document.getElementById('falling-flower-container');

    setInterval(() => {
      const flowerWrapper = document.createElement('div');
      flowerWrapper.classList.add('falling-flower-wrapper');

      const flower = document.createElement('div');
      flower.classList.add('falling-flower');

      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 5;
      const size = Math.random() * 20 + 10;
      const blur = Math.random() * 2;
      const opacity = Math.random() * 0.5 + 0.5;
      const swayDuration = Math.random() * 3 + 2;

      flowerWrapper.style.left = `${left}vw`;
      flowerWrapper.style.animationDuration = `${duration}s`;

      flower.style.width = `${size}px`;
      flower.style.height = `${size}px`;
      flower.style.animationDuration = `${swayDuration}s`;
      flower.style.filter = `blur(${blur}px)`;
      flower.style.opacity = opacity;

      flowerWrapper.appendChild(flower);
      container.appendChild(flowerWrapper);

      // Eliminar después de que termine la animación
      setTimeout(() => {
        flowerWrapper.remove();
      }, duration * 1000);

    }, 500);
  }

  // Inicializar efectos
  createParticles();
  createFallingFlowers();

  // Reproducir automáticamente al hacer clic en cualquier parte de la página
  document.body.addEventListener('click', function() {
    if (!isPlaying) {
      audioPlayer.play()
        .then(() => {
          isPlaying = true;
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'block';
          songInfo.textContent = "Reproduciendo Feliz 31 de septiembre ❤️";
        })
        .catch(error => {
          console.log('La reproducción automática falló:', error);
        });
    }
  }, { once: true }); // Solo una vez
});
