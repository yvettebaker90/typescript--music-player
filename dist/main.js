//Se så att koden kopplas till html och syns i konsolen
// console.log("🎧 Music Player started");
// const song: string = "Bohemian Rhapsody";
// const artist: string = "Queen";
// console.log(`Now playing: ${song} by ${artist}`);
// Placeholder-bild som används när en låt saknar coverUrl
// för att slippa "broken image" i UI
// Fungerar ej i nuläget... 
const PLACEHOLDER_COVER = "https://via.placeholder.com/200x200.png?text=No+cover";
// MOCKDATA (data jag själv skapat för att testa koden)
// En array av låtar som vi använder för att kunna bygga UI från data (datadrivet).
const playlist = [
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
// Vi hämtar "behållare" i HTML som vi ska fylla med dynamiskt innehåll.
// Detta är första steget i arbetsflödet: hitta platsen där innehållet ska bo.
const songListContainer = document.querySelector("#song-list-container");
const songTitleElement = document.querySelector("#song-title");
const songArtistElement = document.querySelector("#song-artist");
const coverImageElement = document.querySelector("#cover-img");
const prevBtn = document.querySelector("#prev-btn");
const playBtn = document.querySelector("#play-btn");
const nextBtn = document.querySelector("#next-btn");
// State
// currentIndex håller koll på vilken låt som är vald i playlisten.
let currentIndex = -1; // ingen vald låt från start
let status = "stopped";
//VISA ETT STÄLLE DÄR DU MANIPULERAR SIDAN
// I funktionen renderSongList() skapar jag alla kort dynamiskt med
// createElement och append istället för att använda innerHTML (en funktion jag inte riktigt förstå själv än).
// Det gör att jag har bättre kontroll över elementen och hur de uppdateras.
// Listan renderas första gången när sidan laddas,
// och sedan renderas den om varje gång renderSongList() anropas.
// Själva renderingen sker när jag appendar korten till containern. (lägger in kortet som ett barn-element i containern så att det syns på sidan)
// songListContainer.append(card); 
// ↑ Det är här elementet faktiskt hamnar i DOM:en och blir synligt.
// Här renderas hela listan om varje gång state ändras.
// Eftersom listan är liten fungerar detta bra och gör koden enklare.
// I ett större projekt hade man istället uppdaterat bara det kort
// som påverkas, men hur man gör det vet jag inte än
//START
// Render song list (createElement + textContent + classList + append)
function renderSongList() {
    // Guard clause: om containern inte finns, gör inget.
    if (!songListContainer)
        return;
    // DOM-manipulation: vi tömmer containern innan vi skapar nya kort
    // (så vi inte får dubletter när vi renderar om)
    songListContainer.textContent = ""; // rensa container
    // Vi bygger UI baserat på vår data-array (playlist)
    playlist.forEach((song, index) => {
        // 1) Skapa element i minnet
        const card = document.createElement("article"); // skapar ett nytt <article>-element i minnet som inte syns på sidan än
        // 2) Styla via klass (kopplas till CSS)
        card.classList.add("song-card"); // lägger till en CSS-klass för styling
        // Lagrar index som data-attribut (bra för debugging och ev. framtida logik)
        card.dataset.index = String(index);
        // 3) Skapa och fyller coverbild
        const img = document.createElement("img");
        img.classList.add("song-card__cover");
        img.src = song.album.coverUrl ?? PLACEHOLDER_COVER;
        img.alt = song.album.coverUrl ? `${song.title} cover` : "No cover available";
        // 4) Skapa och fyll titel och artist
        const title = document.createElement("h3");
        title.classList.add("song-card__title");
        title.textContent = song.title; // stoppar jag in text från min data i elementet (sångtitel)
        const artist = document.createElement("span");
        artist.classList.add("song-card__artist");
        artist.textContent = song.artist; // stoppar jag in text från min data i elementet (artistnamn)
        // 5) Montera: lägg in elementen i kortet i rätt ordning
        // (Det här är själva "render"-steget där det syns i UI)
        card.append(img, title, artist); // först när jag gör en append hamnar kortet i DOM:en och syns på sidan
        // 6) State -> UI: markera valt kort
        // Om currentIndex matchar kortets index, lägger vi till en klass som CSS kan styla.
        if (index === currentIndex) {
            card.classList.add("is-active");
        }
        // 7) Interaktion: klick på ett kort
        // När man klickar ska "spelaren" uppdateras med rätt låt + status.
        card.addEventListener("click", () => {
            setCurrentSong(index);
            setStatus("playing");
        });
        // 8) Montera: lägg kortet i listcontainern så det hamnar på sidan
        songListContainer.append(card);
    });
}
//SLUT
// Uppdatera spelaren (DOM-manipulation)
// textContent + uppdatera img src/alt
function setCurrentSong(index) {
    // Hämtar låten från playlisten via index
    const song = playlist[index];
    // Säkerhetskoll: om index är fel eller arrayen tom, avbryt
    if (!song)
        return;
    // Uppdatera state: vilken låt som är vald
    currentIndex = index;
    // DOM-manipulation: uppdatera text i footern/spelaren
    if (songTitleElement)
        songTitleElement.textContent = song.title;
    if (songArtistElement)
        songArtistElement.textContent = song.artist;
    // DOM-manipulation: uppdatera coverbild i footern/spelaren
    if (coverImageElement) {
        coverImageElement.src = song.album.coverUrl ?? "";
        coverImageElement.alt = song.album.coverUrl ? `${song.title} cover` : "";
    }
    // Rendera om listan så att "active state" uppdateras visuellt
    renderSongList();
}
// STATUS (spelar/pausar/stoppad)
// textContent på play-knappen för att byta ikon
function setStatus(newStatus) {
    status = newStatus;
    // Om playBtn inte finns i HTML, avbryt
    if (!playBtn)
        return;
    // DOM-manipulation: ändrar play/paus-knappens symbol beroende på status
    if (status === "playing")
        playBtn.textContent = "⏸";
    if (status === "paused")
        playBtn.textContent = "▶";
    if (status === "stopped")
        playBtn.textContent = "▶";
}
// CONTROLS (next/prev/play-pause)
function nextSong() {
    if (playlist.length === 0)
        return;
    // Om ingen låt är vald startar vi på första, annars går vi vidare och loopar med modulo
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % playlist.length;
    setCurrentSong(nextIndex);
    setStatus("playing");
}
function prevSong() {
    if (playlist.length === 0)
        return;
    // + playlist.length gör att det aldrig blir negativt, sedan modulo för att loopa
    const prevIndex = currentIndex === -1
        ? 0
        : (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentSong(prevIndex);
    setStatus("playing");
}
function togglePlayPause() {
    // Om ingen låt är vald, välj första låten och börja spela
    if (currentIndex === -1) {
        setCurrentSong(0);
        setStatus("playing");
        return;
    }
    // Toggle: om vi spelar -> pausa, annars -> spela
    if (status === "playing")
        setStatus("paused");
    else
        setStatus("playing");
}
// EVENT LISTENERS (interaktion) - koppla knappar till funktioner
// ?. betyder "om knappen finns, koppla eventet" (förhindrar error om den är null)
prevBtn?.addEventListener("click", prevSong);
nextBtn?.addEventListener("click", nextSong);
playBtn?.addEventListener("click", togglePlayPause);
// Init (startläge)
// När sidan laddas skapar vi hela listan.
// Status sätts till "stopped" så play-knappen börjar som ▶.
renderSongList();
setStatus("stopped");
export {};
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
//# sourceMappingURL=main.js.map