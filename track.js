const trackData = {
  track1: {
    title: "imgettintmoney",
    artist: "legion",
    cover: "assets/img/track1.jpg",
    audio: "assets/audio/track1.mp3"
  },
  track2: {
    title: "focus",
    artist: "Roxie",
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

const keys = Object.keys(trackData);
let currentIndex = keys.indexOf(new URLSearchParams(window.location.search).get("track"));
if (currentIndex === -1) {
    currentIndex = 0; 
}

let wavesurfer;

function incrementPlayCount(trackId) {
    let playCounts = JSON.parse(localStorage.getItem('trackPlayCounts')) || {};
    playCounts[trackId] = (playCounts[trackId] || 0) + 1;
    localStorage.setItem('trackPlayCounts', JSON.stringify(playCounts));
    console.log(`прослушиваний для ${trackId}: ${playCounts[trackId]}`)
}

function loadTrackByKey(key, autoPlay = false) {
    const track = trackData[key];
    if (!track) return;

    document.getElementById("track-title").textContent = track.title;
    document.getElementById("track-artist").textContent = track.artist;
    document.getElementById("track-cover").src = track.cover;
    wavesurfer.load(track.audio);

    if (autoPlay) {
        wavesurfer.once('ready', () => {
            wavesurfer.play();
            document.getElementById("play").textContent = "⏸";
            incrementPlayCount(key);
        });
    } else {
    }
}
let track = trackData[keys[currentIndex]];

if (!track) {
    document.getElementById("track-title").textContent = "Трек не найден";
} else {
    document.getElementById("track-title").textContent = track.title;
    document.getElementById("track-artist").textContent = track.artist;
    document.getElementById("track-cover").src = track.cover;

    const waveformEl = document.getElementById("waveform");

    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'rgba(255, 255, 255, 0.1)',
        progressColor: '#1db954',
        cursorColor: '#1db954',
        barWidth: 4,
        barGap: 1,
        barRadius: 2,
        barHeight: 1,
        normalize: true,
        height: 100,
        responsive: true,
        interact: true
    });
    wavesurfer.load(track.audio);

    const playBtn = document.getElementById("play");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const volumeSlider = document.getElementById("volume");
    const volumeToggle = document.getElementById("volume-toggle");
    const volumeBar = document.getElementById("volume-bar");
    const loopBtn = document.getElementById("loop");

    volumeToggle.addEventListener("click", () => {
        volumeBar.classList.toggle("show");
    });

    volumeSlider.addEventListener("input", () => {
        wavesurfer.setVolume(volumeSlider.value);
    });

    wavesurfer.on("ready", () => {
        wavesurfer.setVolume(volumeSlider.value);
    });

    let isPlaying = false;

    playBtn.addEventListener("click", () => {
        if (wavesurfer.isPlaying()) {
            wavesurfer.pause();
            playBtn.textContent = "▶️";
            isPlaying = false;
        } else {
            wavesurfer.play();
            playBtn.textContent = "⏸";
            isPlaying = true;
            incrementPlayCount(keys[currentIndex]);
        }
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + keys.length) % keys.length;
        wavesurfer.stop();
        loadTrackByKey(keys[currentIndex], true);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % keys.length;
        wavesurfer.stop();
        loadTrackByKey(keys[currentIndex], true);
    });

    let isLooping = false;

    loopBtn.addEventListener("click", () => {
        isLooping = !isLooping;
        loopBtn.classList.toggle("active", isLooping);
    });

    wavesurfer.on("finish", () => {
        if (isLooping) {
            wavesurfer.play();
        } else {
            currentIndex = (currentIndex + 1) % keys.length;
            loadTrackByKey(keys[currentIndex], true);
        }
    });
}

