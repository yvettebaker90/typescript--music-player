//Se så att koden kopplas till html och syns i konsolen
// console.log("🎧 Music Player started");
// const song: string = "Bohemian Rhapsody";
// const artist: string = "Queen";
// console.log(`Now playing: ${song} by ${artist}`);

//  INTERFACER / TYPER
interface Song {
    id: number;
    title: string;
    artist: string;
    durationInSeconds: number; // duration in seconds
    album: Album;
}

interface Album {
    title: string;
    year: number;
    coverUrl?: string; // optional property
}

type PlayerStatus = "playing" | "paused" | "stopped";

// MOCKDATA (data jag själv skapat för att testa koden)
const playlist: Song[] = [
    {
        id: 1,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        durationInSeconds: 354,
        album: {
            title: "A Night at the Opera",
            year: 1975,
            coverUrl: "https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png",
        }
    },
    {
        id: 2,
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        durationInSeconds: 482,
        album: {
            title: "Led Zeppelin IV",
            year: 1971,
            coverUrl: "https://i1.sndcdn.com/artworks-000188953758-0d2twr-t1080x1080.jpg",
        }
    },
    {
        id: 3,
        title: "Hotel California",
        artist: "Eagles",
        durationInSeconds: 391,
        album: {
            title: "Hotel California",
            year: 1976,
            coverUrl: "https://pure-music.co.uk/wp-content/uploads/2019/04/Hotel-California-Album-Cover.png",
        }
    },
    {
        id: 4,
        title: "Imagine",
        artist: "John Lennon",
        durationInSeconds: 183,
        album: {
            title: "Imagine",
            year: 1971,
            coverUrl: "https://i1.sndcdn.com/artworks-000081989828-qzlmpu-t1080x1080.jpg",
        }
    },
    {
        id: 5,
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        durationInSeconds: 301,
        album: {
            title: "Nevermind",
            year: 1991,
            coverUrl: "https://upload.wikimedia.org/wikipedia/en/3/3c/Smells_Like_Teen_Spirit.jpg",
        }
    },
    {
        id: 6,
        title: "Billie Jean", 
        artist: "Michael Jackson",
        durationInSeconds: 294,
        album: {
            title: "Thriller",
            year: 1982,
            coverUrl: "https://www.wow-vinyl.com/media/pic/176-Acvr-700.jpg",
        }
    }
];

//VARIABLAR för DOM-element
const songListContainer = document.querySelector<HTMLDivElement>("#song-list-container");
const songTitleElement = document.getElementById("song-title");
const songArtistElement = document.getElementById("song-artist");
const coverImageElement = document.getElementById("cover-img") as HTMLImageElement;
const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement | null;
const playBtn = document.getElementById("play-btn") as HTMLButtonElement | null;
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement | null;

// State
let currentIndex = -1; // ingen vald låt från start
let status: PlayerStatus = "stopped";

// Render song list (createElement + textContent + classList + append)
function renderSongList() {
  if (!songListContainer) return;

  songListContainer.textContent = ""; // rensa container

  playlist.forEach((song, index) => {
    const card = document.createElement("article");
    card.classList.add("song-card");
    card.dataset.index = String(index);

    const title = document.createElement("h3");
    title.classList.add("song-card__title");
    title.textContent = song.title;

    const artist = document.createElement("span");
    artist.classList.add("song-card__artist");
    artist.textContent = song.artist;

    card.append(title, artist);

    // highlight om vald
    if (index === currentIndex) {
      card.classList.add("is-active");
    }

    // Interaktion (addEventListener)
    card.addEventListener("click", () => {
      setCurrentSong(index);
      setStatus("playing");
    });

    songListContainer.append(card);
  });
}


// Update player UI 
function setCurrentSong(index: number) {
  const song = playlist[index];
  if (!song) return;

  currentIndex = index;

  if (songTitleElement) songTitleElement.textContent = song.title;
  if (songArtistElement) songArtistElement.textContent = song.artist;

  if (coverImageElement) {
    coverImageElement.src = song.album.coverUrl ?? "";
    coverImageElement.alt = song.album.coverUrl ? `${song.title} cover` : "";
  }

  renderSongList(); // uppdatera active state
}

function setStatus(newStatus: PlayerStatus) {
  status = newStatus;

  if (!playBtn) return;

  // ändra knappens symbol beroende på status
  if (status === "playing") playBtn.textContent = "⏸";
  if (status === "paused") playBtn.textContent = "▶";
  if (status === "stopped") playBtn.textContent = "▶";
}

// Controls
function nextSong() {
  if (playlist.length === 0) return;

  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % playlist.length;
  setCurrentSong(nextIndex);
  setStatus("playing");
}

function prevSong() {
  if (playlist.length === 0) return;

  const prevIndex =
    currentIndex === -1
      ? 0
      : (currentIndex - 1 + playlist.length) % playlist.length;

  setCurrentSong(prevIndex);
  setStatus("playing");
}

function togglePlayPause() {
  // om ingen låt är vald, börja med första
  if (currentIndex === -1) {
    setCurrentSong(0);
    setStatus("playing");
    return;
  }

  if (status === "playing") setStatus("paused");
  else setStatus("playing");
}

// Koppla knappar
prevBtn?.addEventListener("click", prevSong);
nextBtn?.addEventListener("click", nextSong);
playBtn?.addEventListener("click", togglePlayPause);

// Init
renderSongList();
setStatus("stopped");

//querySelector är mer modern och kan göra mer saker än getElementById då den kollar genom id, classer, taggar osv vilket inte getElementById kan

// KOD FRÅN IGÅR SOM JAG INTE BEHÖVER JUST NU

// const currentSong = playlist[0];
// if (!currentSong) {
//   console.warn("No songs in playlist"); //La till detta för jag fick en röd varning annars av VSC om att currentSong kan vara undefined
// } else {
//   if (songTitleElement) {
//     songTitleElement.textContent = currentSong.title;
//   }

//   if (songArtistElement) {
//     songArtistElement.textContent = currentSong.artist;
//   }

//   if (coverImageElement && currentSong.album.coverUrl) {
//     coverImageElement.src = currentSong.album.coverUrl;
//   }
// }