const trackData = {
  track1: {
    title: "imgettintmoney",
    artist: "legion",
    cover: "assets/img/track1.jpg",
    audio: "assets/audio/track1.mp3"
  },
  track2: {
    title: "ballout prod miso",
    artist: "pray4prae",
    cover: "assets/img/track2.jpg",
    audio: "assets/audio/track2.mp3"
  },
  track3: {
    title: "rip x im god",
    artist: "06LAW",
    cover: "assets/img/track3.jpg",
    audio: "assets/audio/track3.mp3"
  },
  track4: {
    title: "{[REVERSED]} (LUCI4 MIX) MANNA EATER (PROD. TRVSH) #S.KKKULT",
    artist: "Axtya",
    cover: "assets/img/track4.jpg",
    audio: "assets/audio/track4.mp3"
  },
  track5: {
    title: "Princess",
    artist: "Feng",
    cover: "assets/img/track5.jpg",
    audio: "assets/audio/track5.mp3"
  },
  track6: {
    title: "ugly god - i beat my meat (kltekk version)",
    artist: "4solu",
    cover: "assets/img/track6.jpg",
    audio: "assets/audio/track6.mp3"
  },
  track7: {
    title: "lucy (prod. michael harrison)",
    artist: "06LAW",
    cover: "assets/img/track7.jpg",
    audio: "assets/audio/track7.mp3"
  },
  track8: {
    title: "LUCKI ft Lil Yachty - greed x Im god",
    artist: "scattpaks",
    cover: "assets/img/track8.jpg",
    audio: "assets/audio/track8.mp3"
  },
  track9: {
    title: "jaydes & wifiskeleton - untilted263364",
    artist: "jaydes,wifiskeleton",
    cover: "assets/img/track9.jpg",
    audio: "assets/audio/track9.mp3"
  },
  track10: {
    title: "Only Love Can Break Your Heart (Masters At Work Dub)",
    artist: "St Etienne",
    cover: "assets/img/track10.jpg",
    audio: "assets/audio/track10.mp3"
  },
  track11: {
    title: "you will never change,",
    artist: "keepsecrets",
    cover: "assets/img/track11.jpg",
    audio: "assets/audio/track11.mp3"
  },
  track12: {
    title: "Yayo",
    artist: "Garcon Maigre",
    cover: "assets/img/track12.jpg",
    audio: "assets/audio/track12.mp3"
  },
  track13: {
    title: "D1RTYTRU3YJ3AN$ - MIFFYxSLOTH",
    artist: "DEMONCLIQUE",
    cover: "assets/img/track13.jpg",
    audio: "assets/audio/track13.mp3"
  },
  track14: {
    title: "Hello Juliet",
    artist: "Clarion",
    cover: "assets/img/track14.jpg",
    audio: "assets/audio/track14.mp3"
  },
  track15: {
    title: "GUILTY CONSCIENCE (prod.max.com)",
    artist: "braidedpiercing",
    cover: "assets/img/track15.jpg",
    audio: "assets/audio/track15.mp3"
  },
  track16: {
    title: "Doormat",
    artist: "suerjin",
    cover: "assets/img/track16.jpg",
    audio: "assets/audio/track16.mp3"
  },
  track17: {
    title: "what zit tooya 432Hz Audio",
    artist: "xaviersobased",
    cover: "assets/img/track17.jpg",
    audio: "assets/audio/track17.mp3"
  },
  track18: {
    title: "unallowed",
    artist: "jaydes",
    cover: "assets/img/track18.jpg",
    audio: "assets/audio/track18.mp3"
  },
  track19: {
    title: "All i need",
    artist: "Clams Casino",
    cover: "assets/img/track19.jpg",
    audio: "assets/audio/track19.mp3"
  },
  track20: {
    title: "YKT(RARI)",
    artist: "STUSSY",
    cover: "assets/img/track20.jpg",
    audio: "assets/audio/track20.mp3"
  },
  track21: {
    title: "MOUNTAIN DEW (Prod. by Hi-c)",
    artist: "Hi-C x DOMD",
    cover: "assets/img/track21.jpg",
    audio: "assets/audio/track21.mp3"
  },
  track22: {
    title: "fuxk everybody over",
    artist: "4jay",
    cover: "assets/img/track22.jpg",
    audio: "assets/audio/track22.mp3"
  },
  track23: {
    title: "im not alright prod heroine dreamnote",
    artist: "Awfultop",
    cover: "assets/img/track23.jpg",
    audio: "assets/audio/track23.mp3"
  },
  track24: {
    title: "frank woods",
    artist: "textkill",
    cover: "assets/img/track24.jpg",
    audio: "assets/audio/track24.mp3"
  },
};

const miniKeys = Object.keys(trackData);
let miniWavesurfer;
let miniIsLooping = false;
let lastMiniVolume = 0.75;

let savedId = localStorage.getItem("currentTrack");
let miniCurrentIndex = savedId && miniKeys.includes(savedId) ?
  miniKeys.indexOf(savedId) :
  0;
let miniPlayerState = localStorage.getItem("miniPlayerState"); 


function loadMiniTrack(index, autoPlayAfterLoad = false) {
  const key = miniKeys[index];
  const track = trackData[key];
  if (!track) {
    console.error(`Трек с ключом ${key} не найден.`);
    return;
  }


  document.getElementById("mini-title").textContent = track.title;
  document.getElementById("mini-artist").textContent = track.artist;
  document.getElementById("mini-cover").src = track.cover;


  localStorage.setItem("currentTrack", key);


  if (miniWavesurfer) {
    miniWavesurfer.load(track.audio);
  } else {
    console.error("Wavesurfer не инициализирован для мини-плеера.");
    return;
  }


  if (autoPlayAfterLoad) {
    miniWavesurfer.once('ready', () => {
      miniWavesurfer.play()
        .then(() => {
          document.getElementById("mini-play").textContent = "⏸";
          localStorage.setItem("miniPlayerState", "playing");
        })
        .catch(error => {
          console.warn("Автоматическое воспроизведение заблокировано браузером. Пожалуйста, нажмите Play.", error);
          document.getElementById("mini-play").textContent = "▶️";
          localStorage.setItem("miniPlayerState", "paused");
        });
    });
  } else {
    if (miniWavesurfer.isPlaying()) {
      document.getElementById("mini-play").textContent = "⏸";
    } else {
      document.getElementById("mini-play").textContent = "▶️";
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded for script.js');


  const miniWaveformEl = document.getElementById("mini-waveform");
  if (miniWaveformEl) {
    miniWavesurfer = WaveSurfer.create({
      container: '#mini-waveform',
      waveColor: 'rgba(255, 255, 255, 0.2)', 
      progressColor: '#1db954',
      cursorColor: 'transparent',
      barWidth: 2,
      barGap: 1,
      barRadius: 1,
      barHeight: 0.8, 
      normalize: true,
      height: 30, 
      responsive: true,
      interact: true,
      hideScrollbar: true,
      dragToSeek: true,
    });
  } else {
    console.error("Элемент #mini-waveform не найден! Проверьте index.html");
  }


  const miniPlayBtn = document.getElementById("mini-play");
  const miniPrevBtn = document.getElementById("mini-prev");
  const miniNextBtn = document.getElementById("mini-next");
  const miniLoopBtn = document.getElementById("mini-loop");
  const miniVolumeToggle = document.getElementById("mini-volume-toggle");
  const miniVolumeSlider = document.getElementById("mini-volume-slider");
  const miniVolumeRange = document.getElementById("mini-volume");


  loadMiniTrack(miniCurrentIndex);


  if (miniPlayerState === 'playing') {
    miniWavesurfer.once('ready', () => { 
      miniWavesurfer.play()
        .then(() => {
          miniPlayBtn.textContent = "⏸";
          if (miniWavesurfer.getDuration() > 0 && miniWavesurfer.getCurrentTime() >= miniWavesurfer.getDuration()) {
            miniWavesurfer.seekTo(0); 
            miniPlayBtn.textContent = "▶️"; 
            localStorage.setItem("miniPlayerState", "paused");
          }
        })
        .catch(error => {
          console.warn("Автоматическое воспроизведение на главной странице заблокировано. Пожалуйста, нажмите Play.", error);
          miniPlayBtn.textContent = "▶️";
          localStorage.setItem("miniPlayerState", "paused");
        });
    });
  } else {
    miniPlayBtn.textContent = "▶️";
  }

  // повтор и там прочие крч
  if (miniLoopBtn) {
    miniLoopBtn.addEventListener("click", () => {
      miniIsLooping = !miniIsLooping;
      miniLoopBtn.classList.toggle("active", miniIsLooping);
    });
  }


  if (miniVolumeToggle && miniVolumeSlider) {
    miniVolumeToggle.addEventListener("click", () => {
      miniVolumeSlider.style.display = miniVolumeSlider.style.display === "none" ? "block" : "none";
    });
  }

  if (miniVolumeRange && miniWavesurfer) {
    miniVolumeRange.addEventListener("input", () => {
      miniWavesurfer.setVolume(miniVolumeRange.value);
    });
    miniWavesurfer.on('ready', () => {
      miniWavesurfer.setVolume(miniVolumeRange.value);
    });
  }

  if (miniPlayBtn) {
    miniPlayBtn.addEventListener("click", () => {
      if (miniWavesurfer.isPlaying()) {
        miniWavesurfer.pause();
        miniPlayBtn.textContent = "▶️";
        localStorage.setItem("miniPlayerState", "paused");
      } else {
        miniWavesurfer.play()
          .then(() => {
            miniPlayBtn.textContent = "⏸";
            localStorage.setItem("miniPlayerState", "playing");
          })
          .catch(error => {
            console.error("Ошибка при воспроизведении:", error);
          });
      }
    });
  }

  if (miniPrevBtn) {
    miniPrevBtn.addEventListener("click", () => {
      miniCurrentIndex = (miniCurrentIndex - 1 + miniKeys.length) % miniKeys.length;
      loadMiniTrack(miniCurrentIndex, true); 
    });
  }

  if (miniNextBtn) {
    miniNextBtn.addEventListener("click", () => {
      miniCurrentIndex = (miniCurrentIndex + 1) % miniKeys.length;
      loadMiniTrack(miniCurrentIndex, true); 
    });
  }

  
  miniWavesurfer.on('finish', () => {
    if (miniIsLooping) {
      miniWavesurfer.play();
    } else {
      miniCurrentIndex = (miniCurrentIndex + 1) % miniKeys.length;
      loadMiniTrack(miniCurrentIndex, true);
    }
  });


  
  const section = document.getElementById('mySection');
  const toggleButton = document.getElementById('toggleButton');

  if (section && toggleButton) {
    toggleButton.addEventListener('click', () => {
      if (section.style.display === 'none') {
        section.style.display = 'block';
        toggleButton.textContent = 'Ok';
      } else {
        section.style.display = 'none';
        toggleButton.textContent = 'show';
      }
    });
  } else {
    console.warn('Элементы #mySection или #toggleButton не найдены.');
  }

  // --- прослушиваемые к---
  const topTracksChart = document.querySelector('.top-tracks-chart');
  console.log('topTracksChart element:', topTracksChart);

  if (!topTracksChart) {
    console.error('Контейнер .top-tracks-chart не найден! Проверьте HTML и CSS.');
    return;
  }

  const storedPlayCounts = JSON.parse(localStorage.getItem('trackPlayCounts')) || {};
  console.log('Загружены данные о прослушиваниях из localStorage:', storedPlayCounts);

  const sortedTracks = Object.entries(storedPlayCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
  console.log('Отсортированные треки для гистограммы:', sortedTracks);

  if (sortedTracks.length === 0) {
    topTracksChart.innerHTML = '<p style="text-align: center; color: var(--accent-color-2);">Пока нет прослушанных треков. Начните слушать!</p>';
    topTracksChart.style.display = 'flex';
    topTracksChart.style.height = 'auto';
    topTracksChart.style.padding = '30px';
    topTracksChart.style.alignItems = 'center';
    topTracksChart.style.justifyContent = 'center';
    console.log('Нет прослушанных треков. Показано сообщение.');
    return;
  }

  topTracksChart.innerHTML = '';
  console.log('Контейнер гистограммы очищен перед отрисовкой.');

  const maxPopularity = sortedTracks[0] ? sortedTracks[0][1] : 1;
  console.log('Максимальная популярность:', maxPopularity);

  sortedTracks.forEach(([trackId, popularity]) => {
    const trackInfo = trackData[trackId];
    if (!trackInfo) {
      console.warn(`Данные о треке ${trackId} не найдены в trackData. Столбец не будет создан.`);
      return;
    }

    const bar = document.createElement('div');
    bar.classList.add('chart-bar');

    const normalizedHeight = (popularity / maxPopularity) * 80 + 20;
    bar.style.height = `${normalizedHeight}%`;

    const tooltip = document.createElement('span');
    tooltip.classList.add('bar-tooltip');
        // говнокод
    const titleArtistDiv = document.createElement('div');
    titleArtistDiv.classList.add('tooltip-title-artist');
    titleArtistDiv.textContent = `${trackInfo.artist} - ${trackInfo.title}`;
    
    const popularityDiv = document.createElement('div');
    popularityDiv.classList.add('tooltip-popularity');
    popularityDiv.textContent = `${popularity} прослушиваний`;
    
    tooltip.appendChild(titleArtistDiv);
    tooltip.appendChild(popularityDiv);
    
    bar.appendChild(tooltip);
    const coverImage = document.createElement('img');
    coverImage.classList.add('chart-bar-cover');
    coverImage.src = trackInfo.cover;
    coverImage.alt = trackInfo.title;
    bar.appendChild(coverImage);

    bar.addEventListener('click', () => {
      openTrack(trackId);
    });

    topTracksChart.appendChild(bar);
    console.log(`Создан столбец для "${trackInfo.title}" с популярностью ${popularity}.`);
  });
  console.log('Гистограмма успешно отрисована.');


  const showHotkeys = document.getElementById('show-hotkeys');
  const hotkeysModal = document.getElementById('hotkeys-modal');
  const closeHotkeys = document.getElementById('close-hotkeys');

  if (showHotkeys && hotkeysModal && closeHotkeys) {
    showHotkeys.addEventListener('click', (e) => {
      e.preventDefault();
      hotkeysModal.style.display = 'flex';
    });
    closeHotkeys.addEventListener('click', () => {
      hotkeysModal.style.display = 'none';
    });

    hotkeysModal.addEventListener('click', (e) => {
      if (e.target === hotkeysModal) {
        hotkeysModal.style.display = 'none';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hotkeysModal.style.display === 'flex') {
        hotkeysModal.style.display = 'none';
      }
    });
  }
});


document.addEventListener('keydown', function(e) {
  // чтоб не работал в нужных штуакх
  const tag = document.activeElement.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea') return;

  if (e.code === 'Space') {
    e.preventDefault();
    if (miniWavesurfer) {
      if (miniWavesurfer.isPlaying()) {
        miniWavesurfer.pause();
        document.getElementById('mini-play').textContent = '▶️';
        localStorage.setItem('miniPlayerState', 'paused');
      } else {
        miniWavesurfer.play();
        document.getElementById('mini-play').textContent = '⏸';
        localStorage.setItem('miniPlayerState', 'playing');
      }
    }
  }

  if (e.code === 'ArrowLeft') {
    e.preventDefault();
    miniCurrentIndex = (miniCurrentIndex - 1 + miniKeys.length) % miniKeys.length;
    loadMiniTrack(miniCurrentIndex, true);
  }

  if (e.code === 'ArrowRight') {
    e.preventDefault();
    miniCurrentIndex = (miniCurrentIndex + 1) % miniKeys.length;
    loadMiniTrack(miniCurrentIndex, true);
  }

  if (e.key.toLowerCase() === 'l' || e.key === 'д' || e.key === 'Д') {
    e.preventDefault();
    const miniLoopBtn = document.getElementById('mini-loop');
    if (miniLoopBtn) {
      miniIsLooping = !miniIsLooping;
      miniLoopBtn.classList.toggle('active', miniIsLooping);
    }
  }

  if (e.key.toLowerCase() === 'm' || e.key === 'ь' || e.key === 'Ь') {
    e.preventDefault();
    if (miniWavesurfer) {
      const currentVolume = miniWavesurfer.getVolume();
      if (currentVolume > 0) {
        lastMiniVolume = currentVolume;
        miniWavesurfer.setVolume(0);
        if (typeof miniVolumeRange !== 'undefined' && miniVolumeRange) miniVolumeRange.value = 0;
      } else {
        miniWavesurfer.setVolume(lastMiniVolume || 0.75);
        if (typeof miniVolumeRange !== 'undefined' && miniVolumeRange) miniVolumeRange.value = lastMiniVolume || 0.75;
      }
    }
  }
});


function openTrack(trackId) {
  localStorage.setItem("currentTrack", trackId);
  if (miniWavesurfer) {
    localStorage.setItem("miniPlayerState", miniWavesurfer.isPlaying() ? "playing" : "paused");
  } else {
    localStorage.setItem("miniPlayerState", "paused");
  }
  window.location.href = `track.html?track=${trackId}`;
}
