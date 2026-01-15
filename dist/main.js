//Se så att koden kopplas till html och syns i konsolen
// console.log("🎧 Music Player started");
//Mockdata (data jag själv skapat för att testa koden)
const playlist = [
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
const songTitleElement = document.getElementById("song-title");
const songArtistElement = document.getElementById("song-artist");
const coverImageElement = document.getElementById("cover-img");
// const playButton = document.getElementById("prev-btn");
// const pauseButton = document.getElementById("play-pause-btn");
// const stopButton = document.getElementById("stop-btn");
const currentSong = playlist[0];
if (!currentSong) {
    console.warn("No songs in playlist");
}
else {
    if (songTitleElement) {
        songTitleElement.textContent = currentSong.title;
    }
    if (songArtistElement) {
        songArtistElement.textContent = currentSong.artist;
    }
    if (coverImageElement && currentSong.album.coverUrl) {
        coverImageElement.src = currentSong.album.coverUrl;
    }
}
export {};
//# sourceMappingURL=main.js.map