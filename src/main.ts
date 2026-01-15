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
            coverUrl: "https://example.com/queen.jpg",
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
            coverUrl: "https://example.com/ledzeppelin.jpg",
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
            coverUrl: "https://example.com/eagles.jpg",
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
            coverUrl: "https://example.com/johnlennon.jpg",
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
            coverUrl: "https://example.com/nirvana.jpg",
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
            coverUrl: "https://example.com/michaeljackson.jpg",
        }
    }
];

//VARIABLAR för DOM-element
const songTitleElement = document.getElementById("song-title");
const songArtistElement = document.getElementById("song-artist");
const coverImageElement = document.getElementById("cover-img") as HTMLImageElement;
// const playButton = document.getElementById("prev-btn");
// const pauseButton = document.getElementById("play-pause-btn");
// const stopButton = document.getElementById("stop-btn");

//querySelector är mer modern och kan göra mer saker än getElementById då den kollar genom id, classer, taggar osv vilket inte getElementById kan
const songListContainer = document.querySelector("#song-list-container");

// LOGIC
playlist.forEach((song) => {
    const card = document.createElement("article");
    card.classList.add("song-card");

    const title = document.createElement("h3");
    title.textContent = song.title;
    
    const artist = document.createElement("span");
    artist.textContent = song.artist;

    card.append(title, artist);

    if (songListContainer) {
        card.addEventListener("click", () => {
            playSong(song);
        });
        songListContainer.append(card);
    }
});

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

// FUNCTIONS
function playSong(song: Song) {
    if (songTitleElement) {
        songTitleElement.textContent = song.title;
    }

    if (songArtistElement) {
        songArtistElement.textContent = song.artist;
    }

    if (coverImageElement) {
        if (song.album.coverUrl) {
            coverImageElement.src = song.album.coverUrl;
        }
    }
}
